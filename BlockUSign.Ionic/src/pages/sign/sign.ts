import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockPdfComponent } from '../../components/block-pdf/block-pdf';
declare let blockstack: any;
declare let getQueryParam: any;
declare let jslinq: any;

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
  @ViewChild(BlockPdfComponent) blockPdf: BlockPdfComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService
  ) {

  }

  ionViewDidLoad() {
    this.init();
  }

  async init() {
    
    // if you are a signer and the document is not in your document.index then add it!
    // @todo think about allowing a document to get signed by an anonymous person if they got it via email with the documentKey

    // test - http://localhost:8100/#/sign/a48b11c6-349b-697b-90f9-8356c29ccbf8/?docData=eyJndWlkIjoiYTQ4YjExYzYtMzQ5Yi02OTdiLTkwZjktODM1NmMyOWNjYmY4IiwiY3JlYXRlZEF0IjoxNTI3MTI3NTgxNDgyLCJ1cGRhdGVkQXQiOjE1MjcxMjc1ODE0ODIsImhhc0Fubm90YXRpb25zIjpmYWxzZSwic3RlcCI6IkFubm90YXRlIiwiaXNDb21wbGV0ZWQiOmZhbHNlLCJmaWxlTmFtZSI6Im5pY2sgMS5wZGYiLCJkb2N1bWVudEtleSI6IjVjYmY0NjVjLTU5ODktOTNlMy02OGUxLTdkNTE5NzEyYTZmNCIsInBhdGhBbm5vdGF0ZWREb2MiOiJodHRwczovL2dhaWEuYmxvY2tzdGFjay5vcmcvaHViLzE4a1Rza0JwVGgxbXpuc3lwdTFmaEoyN2R4YkMxU3dYRUsvIiwicGF0aHMiOlt7Im5hbWUiOiJuaWNrIHRlZSIsInVzZXJJZCI6Im5pY2t0ZWUuaWQiLCJwYXRoVG9TdG9yYWdlIjoiaHR0cHM6Ly9nYWlhLmJsb2Nrc3RhY2sub3JnL2h1Yi8xOGtUc2tCcFRoMW16bnN5cHUxZmhKMjdkeGJDMVN3WEVLLyJ9XSwic2lnbmVyIjpbImJsb2NrdXNpZ24uaWQiXX0=

    let docData = getQueryParam('docData');
   
    // my doc
    if (this.navParams.get("guid") && !this.documentService.currentDoc && !docData) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
      });
    }
    // their doc
    else if (this.navParams.get("guid") && !this.documentService.currentDoc && docData) {
      let jsonDoc = atob(docData);
      let doc = JSON.parse(jsonDoc);
      let resp = await this.documentService.getDocumentsIndex(true);
      this.documentService.documentsList = resp;
      let guid = this.navParams.get("guid");
   
      if (this.documentService.documentExists(guid)) {
        this.documentService.setCurrentDoc(guid);
      }
      else {
        //get the file buffer
        let path = doc.pathAnnotatedDoc + this.navParams.get("guid") + ".pdf";
        console.log(path);
        let fileBuffer = await this.documentService.getDocumentByPath(path, doc.documentKey);
        await this.documentService.copyDocument(doc, guid, fileBuffer);
        this.blockPdf.ngOnInit();
      }
    }
    else{
      console.log('Error, must pass in guid')
    }

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
