import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
import { BitcoinService } from '../../services/bitcoin.service';
import { BlockStackService } from '../../services/blockstack.service';
import { Block } from 'bitcoinjs-lib';
declare let window: any;
declare let blockstack: any;

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
  collaborators = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public documentService: DocumentService,
    private bitcoinService: BitcoinService,
    private blockstackService: BlockStackService,
    private nav: NavController, 
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

  async getHash(){
    try{
      this.hash = await this.documentService.getMerkleHash();
    }
    catch(e){
      alert('Please make sure you signed and saved the document. Go back to the "e-sign" page');
    }

    this.getCollaborators();
   
  }

  postBlockchain(){
    this.nav.push('BlockchainPage', {
      guid: this.documentService.currentDoc.guid
    });
  }

  async getCollaborators(){
    this.collaborators = await this.documentService.getCollaborators(this.documentService.currentDoc.guid);
  }


}
