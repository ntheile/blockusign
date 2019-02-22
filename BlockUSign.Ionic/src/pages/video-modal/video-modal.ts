import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VideoComponent } from '../../components/video/video';
import { DocumentService } from '../../services/document.service';
import { BlockStackService } from '../../services/blockstack.service';
declare let blockstack:any;

/**
 * Generated class for the VideoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video-modal',
  templateUrl: 'video-modal.html',
})
export class VideoModalPage {

  isSafari = false;
  @ViewChild(VideoComponent) videoEL: VideoComponent;
  hash = "";
  name = "";
  collaborators = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public documentService: DocumentService,
    private blockstackService: BlockStackService,
    ) {
  }

  ionViewDidLoad() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.init();
  }


  async init(){
    this.getHash();
    this.name = blockstack.loadUserData().username;
    let path = this.navParams.get('videoPath');
    await this.videoEL.getVideo(path);
  }

 
  dismiss() {
    
    this.viewCtrl.dismiss();
  }

  async getHash(){
    try{
        this.hash = await this.documentService.getMerkleHash();
        this.getCollaborators();
    }
    catch(e){
    }
  
  }

  async getCollaborators(){
    this.collaborators = await this.documentService.getCollaborators(this.documentService.currentDoc.guid);
  }


}
