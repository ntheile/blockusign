import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
declare let blockstack: any;
declare let getQueryParam: any;
declare let jslinq:any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SignPage',
  segment: 'sign/:guid',
  defaultHistory: ['EmailPage', 'AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService
  ) {

  }

  async ionViewDidLoad() {

    // if you are a signer and the document is not in your document.index then add it!
    // @todo think about allowing a document to get signed by an anonymous person if they got it via email with the documentKey

    let docData = getQueryParam('docData');

    // test http://localhost:8100/#/sign/0fc4dd38-993a-ed72-187f-4a0d65e7f96c/?docData=eyJndWlkIjoiZDBkYmJjODktYWRkYS01YTgwLTllYTgtMDQxMmM1NjQ5ZDM3IiwiY3JlYXRlZEF0IjoxNTI3MTAwNTYwOTU3LCJ1cGRhdGVkQXQiOjE1MjcxMDA1NjA5NTcsImhhc0Fubm90YXRpb25zIjpmYWxzZSwic3RlcCI6IkFubm90YXRlIiwiaXNDb21wbGV0ZWQiOmZhbHNlLCJmaWxlTmFtZSI6ImIxLnBkZiIsImRvY3VtZW50S2V5IjoiMjQyMjNkNjUtN2E4My1hZTYwLWY5YzAtNjIzMTRiNDU1NWE2IiwicGF0aEFubm90YXRlZERvYyI6Imh0dHBzOi8vZ2FpYS5ibG9ja3N0YWNrLm9yZy9odWIvMThrVHNrQnBUaDFtem5zeXB1MWZoSjI3ZHhiQzFTd1hFSy8iLCJwYXRocyI6W3sibmFtZSI6Im5pY2sgdGVlIiwidXNlcklkIjoibmlja3RlZS5pZCIsInBhdGhUb1N0b3JhZ2UiOiJodHRwczovL2dhaWEuYmxvY2tzdGFjay5vcmcvaHViLzE4a1Rza0JwVGgxbXpuc3lwdTFmaEoyN2R4YkMxU3dYRUsvIn1dLCJzaWduZXIiOlsiYmxvY2t1c2lnbi5pZCJdfQ==

    
    // if (this.navParams.get("guid") && !this.documentService.currentDoc && !docData) {
    //   let guid = this.navParams.get("guid");
    //   this.documentService.getDocumentsIndex(true).then((data) => {
    //     this.documentService.documentsList = data;
    //     this.documentService.setCurrentDoc(guid);
    //   });
    // }
    // else {
      if (docData && this.navParams.get("guid") ) {
        let guid = this.navParams.get("guid");
        let doc = JSON.parse(atob(docData));
        // lookup to see if its in your storage, if not, get it and add it to your storage
        this.documentService.getDocumentsIndex(true).then( async (data) => {
          this.documentService.documentsList = data;
          
          // if (this.documentService.documentExists(guid)){
          //   this.documentService.setCurrentDoc(guid);
          // }
          // else{
            // get the file buffer
            let path = doc.pathAnnotatedDoc + this.navParams.get("guid") + ".pdf";
            console.log(path);
            let fileBuffer = await this.documentService.getDocumentByPath(path, doc.documentKey);
            // this.documentService.addDocumentBytes()
            // this.documentService.addDocument()
          //}
            let after4 = "b4";
        }); 
      }
    //}
    console.log('ionViewDidLoad SignPage');
    this.name = blockstack.loadUserData().profile.name;
  }

  next() {
    this.navCtrl.push("ReviewPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  back() {
    this.navCtrl.push("EmailPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

}
