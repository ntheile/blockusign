import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Segment, Events } from 'ionic-angular';
import { DocumentService } from '../../services/document.service';
import { BlockChatComponent } from './../../components/block-chat/block-chat';
import { BlockPdfComponent } from './../../components/block-pdf/block-pdf';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';

declare var $: any;
declare var window: any;
declare var blockstack: any;

/// https://www.sitepoint.com/custom-pdf-rendering/
@IonicPage({
  name: 'AnnotatePage',
  segment: 'annotate/:guid',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-annotate',
  templateUrl: 'annotate.html',
  styles: ['annotate.scss']
})
export class AnnotatePage {

  @ViewChild("blockChat") blockChat: BlockChatComponent;
  @ViewChild("blockPdf") blockPdf: BlockPdfComponent;
  @ViewChild("blockSteps") blockSteps: BlockStepsComponent;
  public instance: AnnotatePage;
  showText = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public documentService: DocumentService,
    public events: Events
  ) {
    this.instance = this;
  }

  
  ionViewDidEnter(){
    this.blockPdf.registerEmojiEvent();
    this.blockChat.registerEmojiEvent();
  }

  ionViewWillLeave() {
    this.blockChat.destroyEmojiEvents();
    this.blockChat.ngOnDestroy();
    this.blockPdf.destroyEmojiEvents();
    
    if (this.documentService.chatInterval){
      clearInterval(this.documentService.chatInterval);
    }

  }

  toggleText(){
    if (this.showText){
      this.showText = false;
    }
    else{
      this.showText = true;
    }
  }

  async next (){
    if (this.documentService.currentDoc.isCompleted == false){
      await this.blockPdf.saveSvg();
    }
    this.blockSteps.route('EmailPage');
  }

  async back (){
    if (this.documentService.currentDoc.isCompleted == false){
      await this.blockPdf.saveSvg();
    }
    this.blockSteps.route('HomePage');
  }

}
