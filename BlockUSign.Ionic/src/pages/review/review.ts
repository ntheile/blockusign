import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, BlockerDelegate } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
import { BitcoinService } from '../../services/bitcoin.service';
import { BlockStackService } from '../../services/blockstack.service';
import { Block } from 'bitcoinjs-lib';
import { VideoComponent } from '../../components/video/video';
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
  @ViewChild(VideoComponent) videoEL: VideoComponent;
  collaborators = [];
  showVideo = false;
  isSafari = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public documentService: DocumentService,
    private bitcoinService: BitcoinService,
    private blockstackService: BlockStackService,
    private nav: NavController, 
    private change: ChangeDetectorRef
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
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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
        this.getCollaborators();
    }
    catch(e){
      alert('Please make sure you signed and saved the document. Go back to the "e-sign" page');
    }

   
  }

  postBlockchain(){
    this.nav.push('BlockchainPage', {
      guid: this.documentService.currentDoc.guid
    });
  }

  async getCollaborators(){
    this.collaborators = await this.documentService.getCollaborators(this.documentService.currentDoc.guid);
  }

  showVideoRTC(){
    if (this.showVideo){
      this.showVideo = false;
    }
    else{
      this.showVideo = true;
      this.change.detectChanges();
      //this.videoEL.setVideoPaused();
    }
    
  }

  async getVideoR(path){
    console.log('git vid');
    this.showVideo = true;
    this.change.detectChanges();
    await this.videoEL.getVideo(path);
  }

  toggleVideoStoryHead(userId){

    let path = null;
    if (userId == blockstack.loadUserData().username){
     path =  this.documentService.docStorageMaps.storagePaths.find( u=> u == this.blockstackService.getStoragePath() );
    } else{
      path = this.documentService.docStorageMaps.storagePaths.find( u=> u != this.blockstackService.getStoragePath() );
    }
    
    this.getVideoR(path);
  
  }

  hideVideo(){
    this.showVideo = false;
  }



}
