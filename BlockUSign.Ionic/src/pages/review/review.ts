import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
import { BitcoinService } from '../../services/bitcoin.service';
declare let window: any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ReviewPage',
  segment: 'review/:guid',
  defaultHistory: ['SignPage', 'EmailPage','AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  hash = "";
  @ViewChild("blockSteps") blockSteps: BlockStepsComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public documentService: DocumentService,
    private bitcoinService: BitcoinService
  ) {

    // if ( this.navParams.get("guid") && !this.documentService.currentDoc ){
    //   let guid = this.navParams.get("guid");
    //   this.documentService.getDocumentsIndex(true).then((data) => {
    //     this.documentService.documentsList = data;
    //     this.documentService.setCurrentDoc(guid);
    //     //this.getFile();
    //     // @todo in side menu highlight selected doc
        
    //   });
    // }
    // else{
    //   //this.getFile();
    // }

  }


  ionViewDidLoad() {
    this.init();
  }

  async init() {
    
    // if you are a signer and the document is not in your document.index then add it!
    // @todo think about allowing a document to get signed by an anonymous person if they got it via email with the documentKey

    // test - http://localhost:8100/#/sign/a48b11c6-349b-697b-90f9-8356c29ccbf8/?docData=eyJndWlkIjoiYTQ4YjExYzYtMzQ5Yi02OTdiLTkwZjktODM1NmMyOWNjYmY4IiwiY3JlYXRlZEF0IjoxNTI3MTI3NTgxNDgyLCJ1cGRhdGVkQXQiOjE1MjcxMjc1ODE0ODIsImhhc0Fubm90YXRpb25zIjpmYWxzZSwic3RlcCI6IkFubm90YXRlIiwiaXNDb21wbGV0ZWQiOmZhbHNlLCJmaWxlTmFtZSI6Im5pY2sgMS5wZGYiLCJkb2N1bWVudEtleSI6IjVjYmY0NjVjLTU5ODktOTNlMy02OGUxLTdkNTE5NzEyYTZmNCIsInBhdGhBbm5vdGF0ZWREb2MiOiJodHRwczovL2dhaWEuYmxvY2tzdGFjay5vcmcvaHViLzE4a1Rza0JwVGgxbXpuc3lwdTFmaEoyN2R4YkMxU3dYRUsvIiwicGF0aHMiOlt7Im5hbWUiOiJuaWNrIHRlZSIsInVzZXJJZCI6Im5pY2t0ZWUuaWQiLCJwYXRoVG9TdG9yYWdlIjoiaHR0cHM6Ly9nYWlhLmJsb2Nrc3RhY2sub3JnL2h1Yi8xOGtUc2tCcFRoMW16bnN5cHUxZmhKMjdkeGJDMVN3WEVLLyJ9XSwic2lnbmVyIjpbImJsb2NrdXNpZ24uaWQiXX0=

   
    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then(async (data) => {
        this.documentService.documentsList = data;
        await this.documentService.setCurrentDoc(guid);
        await this.documentService.getAnnotations(guid);
        this.getHash();
      });
     
    }
    else{
      this.getHash();
    }
    

  }

 

  back(){
    // this.navCtrl.push("SignPage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route("SignPage");
  }

  getHash(){
    let toHash = '';
    if (this.documentService.currentDocAnnotations){
      toHash = this.documentService.currentDocAnnotations.annotations;
    }
    this.hash = this.documentService.genHashFromString(toHash);
  }

  saveBlockchain(){
    this.bitcoinService.sendTransaction(window.appsettings.to, window.appsettings.signer, window.appsettings.signerKey,  'sha256-' + this.hash);
  }

}
