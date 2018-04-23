import { Injectable } from '@angular/core';
import { Document } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
  public docBuffer: Buffer;
  public currentDoc: Document

  constructor() {
    console.log('Hello StorageServiceProvider Provider');
    this.documentsList = [];
    // @TODO - think about putting in checks here is documentsList is empty, 
    // or there could be a async race issue if they take too long to come back
    this.getDocumentsIndex(true).then( (data) =>{
      this.documentsList = data;
    });
  }

  async getDocumentsIndex(refresh: boolean){
    if (refresh){
      this.documentsList = JSON.parse ( await blockstack.getFile(this.indexFileName, { decrypt: true }) );
      if (this.documentsList == null){
        this.documentsList = JSON.parse ( await blockstack.putFile(this.indexFileName, "[]", { encrypt: true }) );
      }
    }
    return this.documentsList;
  }


  async addDocument(fileName: string, fileBuffer: Buffer){
    debugger;
    let newDocument = new Document();
    newDocument.fileName = fileName;
    this.documentsList.push( newDocument );

    await blockstack.putFile(this.indexFileName, JSON.stringify(this.documentsList), { encrypt: true });

    this.docBuffer = fileBuffer;
    this.currentDoc = newDocument;
    let response = await this.addDocumentBytes( newDocument.guid,  fileBuffer );

    return this.documentsList;
  }

  async addDocumentBytes(guid: string, doc: Buffer){
      return blockstack.putFile(guid + ".pdf", doc, { encrypt: true }).then((data) => {
            
      });
  }

}
