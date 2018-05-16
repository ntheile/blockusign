import { Injectable } from '@angular/core';
import { Document, Log, Message } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AnonymousSubject } from 'rxjs/Subject';
import { Events } from 'ionic-angular';
declare let blockstack: any;

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
  public log: Log;

  constructor(public events: Events) {
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
      this.documentsList = JSON.parse(await blockstack.getFile(this.indexFileName, { decrypt: true }));
      if (this.documentsList == null) {
        this.documentsList = JSON.parse(await blockstack.putFile(this.indexFileName, "[]", { encrypt: true }));
      }
    }
    return this.documentsList;
  }


  async addDocument(fileName: string, fileBuffer: any) {

    let newDocument = new Document();
    newDocument.fileName = fileName;
    this.documentsList.push(newDocument);

    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });

    this.docBuffer = fileBuffer;
    this.currentDoc = newDocument;
    let response = await this.addDocumentBytes(newDocument.guid, fileBuffer);
    return this.documentsList;
  }

  async removeDocument(document) {

    // remove item
    this.documentsList = (<any>this.documentsList).remove(document);
    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });
    this.removeDocumentBytes(document.guid);
    // remove binary file
    return this.documentsList;
  }

  async addDocumentBytes(guid: string, doc: any) {
    return blockstack.putFile(guid + ".pdf", doc, { encrypt: true }).then((data) => { });
  }

  async removeDocumentBytes(guid: string) {
    return blockstack.putFile(guid + ".pdf", "", { encrypt: true }).then((data) => { });
  }

  async saveAnnotations(guid: string, annotation: string) {

    let json = {
      annotations: annotation
    }
    return await blockstack.putFile(guid + ".annotations.json", JSON.stringify(json), { encrypt: true });

  }

  async getAnnotations(guid: string) {

    this.currentDocAnnotations = JSON.parse(await blockstack.getFile(guid + ".annotations.json", { decrypt: true }));
    return this.currentDocAnnotations;

  }

  setCurrentDoc(guid: string) {
    //alert('set curr doc');
    this.currentDoc = this.documentsList.find(x => x.guid == guid);
    this.events.publish('documentService:setCurrentDoc', this.currentDoc);
  }

  async getLog(guid: string) {
    let logFileName = guid + '.log.json';
    this.log = JSON.parse(await blockstack.getFile(logFileName, { decrypt: true }));
    if (this.log === null || this.log === undefined ) {
      let newLog = new Log();
      newLog.messages = [];
      this.log = JSON.parse(await blockstack.putFile(logFileName, JSON.stringify(newLog), { encrypt: true }));
    }
    return this.log;
  }

  async addMessage(guid: string, message: string) {
    let logFileName = guid + ".log.json"
    let log = await this.getLog(guid);
    if (log){
      let msg = new Message();
      msg.message = message;
      msg.createdBy = blockstack.loadUserData().username;
      msg.createdByName = blockstack.loadUserData().profile.name;
      log.messages.push(msg);
      return await blockstack.putFile(logFileName, JSON.stringify(log), { encrypt: true });
    }
    else{
      console.error("error getting log file: " + logFileName)
    }
    
  }


}
