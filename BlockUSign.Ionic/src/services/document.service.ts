import { Injectable } from '@angular/core';
import { Document, Log, Message } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AnonymousSubject } from 'rxjs/Subject';
import { Events } from 'ionic-angular';
import * as moment from 'moment';
import * as Automerge from 'automerge/dist/automerge.js';
declare let jslinq: any;
//const Automerge = require('automerge');
declare let blockstack: any;
declare let sjcl: any;
declare let $: any;

import { State } from './../models/state';
import { of } from 'rxjs/observable/of';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocumentService {

  private indexFileName = "blockusign/documents.index.json";
  public documentsList: Array<Document>;
  public docBuffer: any;
  public currentDoc: Document;
  public currentDocAnnotations;
  public logDoc: any;
  public log: Log;
  //public automerge = Automerge;

  constructor(public events: Events, private http: Http) {
    console.log('Hello StorageServiceProvider Provider');
    this.documentsList = [];

    // @TODO - think about putting in checks here is documentsList is empty, 
    // or there could be a async race issue if they take too long to come back
    this.getDocumentsIndex(true).then((data) => {
      this.documentsList = data;
    });
  }

  async getDocumentsIndex(refresh: boolean) {
    if (refresh) {
      let resp = await blockstack.getFile(this.indexFileName, { decrypt: true });
      if (resp) {
        this.documentsList = JSON.parse(resp);
      }
      if (this.documentsList == null || !resp) {
        this.documentsList = JSON.parse(await blockstack.putFile(this.indexFileName, "[]", { encrypt: true }));
      }
    }
    return this.documentsList;
  }


  async addDocument(fileName: string, fileBuffer: any) {
    let newDocument = new Document();
    newDocument.fileName = fileName;
    newDocument.documentKey = this.generateKey();
    newDocument.pathAnnotatedDoc = blockstack.loadUserData().profile.apps[window.location.origin];
    newDocument.paths = [{
      name: blockstack.loadUserData().profile.name, 
      userId: blockstack.loadUserData().username, 
      pathToStorage: blockstack.loadUserData().profile.apps[window.location.origin]
    }];
    newDocument.signer = ["blockusign.id"];
    this.documentsList.push(newDocument);
    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });
    this.docBuffer = fileBuffer;
    this.currentDoc = newDocument;
    let response = await this.addDocumentBytes(newDocument.guid, fileBuffer, newDocument.documentKey);
    return this.documentsList;
  }

 

  async removeDocument(document) {
    // remove item
    this.documentsList = (<any>this.documentsList).remove(document);
    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });
    await this.removeDocumentBytes(document.guid);
    // remove binary file
    return this.documentsList;
  }

  async addDocumentBytes(guid: string, doc: any, documentKey: string) {
    let encryptedDoc = this.ecryptDoc(doc, documentKey);
    // add blank annotations file
    await this.saveAnnotations(guid, "");
    // add blank log file
    await this.getLog(guid);
    return blockstack.putFile(guid + ".pdf", encryptedDoc, { encrypt: false }).then((data) => { });
  }

  async getDocument(fileName: string, documentKey: string) {
    let resp = await blockstack.getFile(fileName, { decrypt: false });
    if (resp) {
      let encryptedDoc = resp;
      return this.decryptDoc(encryptedDoc, documentKey);
    }
    else {
      return null;
    }
  }

  async getDocumentByPath(docPath: string, docKey: string) {
    let resp = await this.http.get(docPath).toPromise();
    if (resp) {
      let encryptedDoc = resp.text();
      return this.decryptDoc(encryptedDoc, docKey);
    }
    else {
      return of(null);
    }
  }

  async copyDocument(newDocument: Document, guid: string, fileBuffer: any) {
    console.log("file buffer", fileBuffer);
    console.log("guid", guid);
    console.log("doc", newDocument);

    newDocument.paths.push({
      name: blockstack.loadUserData().profile.name, 
      userId: blockstack.loadUserData().username, 
      pathToStorage: blockstack.loadUserData().profile.apps[window.location.origin]
    });

    this.documentsList.push(newDocument);
    console.log("new doc list", this.documentsList );
    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });
    let response = await this.addDocumentBytes(guid, fileBuffer, newDocument.documentKey);
    this.docBuffer = fileBuffer;
    this.currentDoc = newDocument;

    // @todo now copy annotations
    
    // @todo now copy chat log

    return this.documentsList;
  }

  documentExists(guid): boolean {
    let exists = false;
    let docs = jslinq(this.documentsList).where(  (el) => el.guid == guid ).toList();
    if (docs.length > 0){
      exists = true;
    }
    return exists;
  }

  async addSignerToCurrentDoc(nameOrId){

    
    
  }

  async removeDocumentBytes(guid: string) {
    await blockstack.putFile(guid + ".annotations.json", "", { encrypt: false });
    await blockstack.putFile(guid + ".log.json", "", { encrypt: false });
    return blockstack.putFile(guid + ".pdf", "", { encrypt: false }).then((data) => { });
  }

  async saveAnnotations(guid: string, annotation: string) {
    let json = {
      annotations: annotation
    }
    let encrypted = this.encryptString(JSON.stringify(json), this.currentDoc.documentKey);
    return await blockstack.putFile(guid + ".annotations.json", encrypted, { encrypt: false });
  }

  async getAnnotations(guid: string) {
    let resp = await blockstack.getFile(guid + ".annotations.json", { decrypt: false });
    if (resp) {
      let decrypted = this.decryptString(resp, this.currentDoc.documentKey)
      this.currentDocAnnotations = JSON.parse(decrypted);
    }
    if (!resp) {
      this.currentDocAnnotations = "";
    }
    return this.currentDocAnnotations;
  }

  async getAnnotationsByPath(docPath: string, docKey: string) {
    // @todo WIP
    let resp = await this.http.get(docPath).toPromise();
    if (resp) {
      let encryptedDoc = resp.text();
      let annotations = this.decryptString(encryptedDoc, docKey);
      this.currentDocAnnotations = annotations;
    }
    if (!resp) {
      this.currentDocAnnotations = "";
    }
    return this.currentDocAnnotations;
  }

  setCurrentDoc(guid: string) {
    //alert('set curr doc');
    this.currentDoc = this.documentsList.find(x => x.guid == guid);
    this.events.publish('documentService:setCurrentDoc', this.currentDoc);
    let span = "span:contains('" + this.currentDoc.fileName + "')";
    $(document).ready(function () {
      $(".channels-list-text li").removeClass('active');
      let s = $(span);
      s.parent().addClass('active');
    });
  }


  //#region Log (Chat)
  async getLog(guid: string) {
    let logFileName = guid + '.log.json';
    let resp;
    try {
      resp = await blockstack.getFile(logFileName, { decrypt: false }); 
      // existing doc
      if (resp) {
          this.logDoc = this.decryptString(resp, this.currentDoc.documentKey);
          this.logDoc = Automerge.load(resp);
          // now get their doc if there is already a signer
          if (this.currentDoc.signer[0]){
            this.log = this.logDoc.log;
            let theirUrl = this.currentDoc.paths.find( x=> x.userId == this.currentDoc.signer[0] || x.name == this.currentDoc.signer[0]  );
            if (theirUrl){
              let url = theirUrl[0] + logFileName;
              let theirResp = await this.http.get(url).toPromise(); 
              // now merge their doc into mine
              if (theirResp){
                let str = theirResp.text();
                str = this.decryptString(str, this.currentDoc.documentKey);
                let theirDoc = Automerge.load(str);
                let finalDoc = Automerge.merge(this.logDoc, theirDoc)
                this.logDoc = finalDoc;
              }
            }
          }
          this.log = this.logDoc.log;
      }
      // init new doc
      else {
        let newLog = new Log();
        newLog.messages = [];
        let msg = new Message();
        msg.createdBy = blockstack.loadUserData().username;
        msg.createdByName = blockstack.loadUserData().profile.name;
        msg.message = "Created Doc";
        newLog.messages.push(msg);
        this.logDoc = Automerge.init();
        this.logDoc = Automerge.change(this.logDoc, 'Initialize log - ' + this.getDate(), doc => {
          doc.log = newLog;
        });
        let logStr = Automerge.save(this.logDoc);
        logStr = this.encryptString(logStr, this.currentDoc.documentKey)
        logStr = await blockstack.putFile(logFileName, logStr, { encrypt: false });
        logStr = this.decryptString(logStr, this.currentDoc.documentKey);
        console.log('logstr', logStr);
        this.logDoc = Automerge.load(logStr);
        this.log = this.logDoc.log;
        //this.log = JSON.parse(await blockstack.putFile(logFileName, JSON.stringify(newLog), { encrypt: false }));
      }
      return this.log;
    }
    catch (e) {
      //throw e;
    }
  }

  async addMessage(guid: string, message: string) {
    let logFileName = guid + ".log.json"
    let log = await this.getLog(guid);
    if (log) {
      let msg = new Message();
      msg.message = message;
      msg.createdBy = blockstack.loadUserData().username;
      msg.createdByName = blockstack.loadUserData().profile.name;
      this.logDoc = Automerge.change(this.logDoc, msg.createdByName + " added message at " + this.getDate() ,  (doc) => {
        doc.log.messages.push(msg);
      });
      //log.messages.push(msg);
      let logStr = Automerge.save(this.logDoc);
      logStr = this.encryptString(logStr, this.currentDoc.documentKey);
      await blockstack.putFile(logFileName, logStr, { encrypt: false });
      this.log = this.logDoc.log;
      this.events.publish('documentService:addedChat', msg);
      return this.log;
      //return await blockstack.putFile(logFileName, JSON.stringify(log), { encrypt: false });
    }
    else {
      console.error("error getting log file: " + logFileName)
    }
  }
  //#endregion


  //#region Encryption
  //https://stackoverflow.com/questions/26734033/encrypting-files-with-sjcl-client-side
  ecryptDoc(doc: any, key: string) {
    let docBits = sjcl.codec.arrayBuffer.toBits(doc);
    let base64bits = sjcl.codec.base64.fromBits(docBits);
    let encryptedDoc = sjcl.encrypt(key, base64bits);
    return encryptedDoc;
  }
  decryptDoc(encryptedDoc, key: string) {
    let dec = sjcl.decrypt(key, encryptedDoc);
    let decryptedBase64 = sjcl.codec.base64.toBits(dec);
    let decryptedDocBits = sjcl.codec.arrayBuffer.fromBits(decryptedBase64);
    return decryptedDocBits;
  }
  encryptString(payload:string, key: string) {
    let encryptedDoc = sjcl.encrypt(key, payload);
    return encryptedDoc;
  }
  decryptString(payload: string, key: string) {
    let dec = sjcl.decrypt(key, payload);
    return dec;
  }
  generateKey() {
    return (<any>window).guid();
  }
  //#endregion



  // watchout
  async resetStorage() {
    await blockstack.putFile(this.indexFileName, "[]", { encrypt: true });
  }


  testAutoMerge() {

    // // fetch from server state for Nick
    // let doc1Nick = [{ 'who': 'nick' }];

    // // init doc
    // let doc1 = Automerge.init();
    // let commitMsg = 'Initialize doc from server for nick - ' + this.getDate();
    // doc1 = Automerge.change(doc1, commitMsg , doc => {
    //   doc = doc1Nick;
    // });

    // console.log(doc1);

    // // nick adds a row
    // commitMsg = 'Nick adds a row - ' + this.getDate;
    // doc1 = Automerge.change(doc1, 'Add card', doc => {
    //   doc.push({'who': 'nick2'});
    // });

    // console.log(doc1);


    // // Now let's simulate another device, whose application state is doc2. We
    // // initialise it separately, and merge doc1 into it. After merging, doc2 has
    // // a copy of all the cards in doc1.
    // // fetch from server state for Blockusign

    // let doc1Blockusign1 = [{ 'who': 'nick' }, {'who': 'Blocusign1'}];

  }

  getDate() {
    let d = Date();
    return d;
  }




  doc;
  docMine;
  docYours;
  state = new State();

  testInitDoc() {

    // 1) init or load Mine
    this.docMine = this.state.docInit();
   
    // 2) Save as string
    let docStr = this.state.docSave(this.docMine);
    
    // 3) Send to server
    // putFile

    return docStr;
    
  }

  testEditDoc(){
    // 1) load Mine
    //this.docMine;

    // 2) Edit Doc
    this.docMine = this.state.docEdit(this.docMine, "nick 1st add - " + this.getDate(), "messages", {'nick': '1'} );


    // 3) Save to server
    
  }

  testMerge(){

    // 1) load Mine
    let docMine = this.testInitDoc();
    
    // 2) get Their data data

    // 3) Merge

    // 4) Save
    

    // return doc


  }

  


  getMine(property, message){
     // init doc
     let docMine = Automerge.init();
     //let commitMsg = 'initDoc - ' + this.getDate();
     docMine = Automerge.change(docMine, message , doc => {
        
        doc[property] = [message];
     });
     return docMine;
  }

  // save2Mine(docMine, message){
  //   docMine = Automerge.change(docMine, message, doc => {
  //     doc.chat.push(message);
  //   });
  //   return docMine;
  // }

  // mergeYours(){
  //   this.docYours = Automerge.init()
  //   this.docYours = Automerge.merge(this.docYours, this.docMine);

  //   this.docYours = Automerge.change(this.docYours, 'save2Yours - ' + this.getDate() , doc => {

  //     let msg = new Message();
  //     msg.message = "yours 3";
  //     msg.createdBy = blockstack.loadUserData().username;
  //     msg.createdByName = blockstack.loadUserData().profile.name;
  //     doc.chat.push(msg);

  //   });

  //   console.log(this.docYours);
  //   return this.docYours;
  // }


  // save4Mine(){
  //   this.docMine = Automerge.change(this.docMine, 'save3Me - ' + this.getDate(), doc => {

  //     let msg = new Message();
  //     msg.message = "me 4";
  //     msg.createdBy = blockstack.loadUserData().username;
  //     msg.createdByName = blockstack.loadUserData().profile.name;
  //     doc.chat.push(msg);

  //   });
  //   return this.docMine;
  // }

  // sync(){
  //   this.doc = Automerge.merge(this.docMine, this.docYours);
  //   console.log(this.doc);

  //   // sort by date
  //   console.log(
  //     jslinq(this.doc.chat).orderBy( (el) => el.updatedAt ).toList()
  //   ); 

  //   return this.doc;
  // }

  // genMessage(content){
  //   let msg = new Message();
  //   msg.message = content;
  //   msg.createdBy = blockstack.loadUserData().username;
  //   msg.createdByName = blockstack.loadUserData().profile.name;
  //   return msg;
  // }



}

