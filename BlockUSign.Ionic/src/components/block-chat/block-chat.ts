import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DocumentService } from './../../services/document.service';
import { Document } from './../../models/models';
import { Events } from 'ionic-angular';
declare let $: any;

/**
 * https://codepen.io/mehmetmert/pen/zbKpv
 */
@Component({
  selector: 'block-chat',
  templateUrl: 'block-chat.html'
})
export class BlockChatComponent {

  text: string;
  //public fileName = "FILENAME";
  public doc: Document = new Document();

  constructor(public documentService: DocumentService, public events: Events) {
    console.log('Hello BlockChatComponent Component');
    this.events.subscribe('documentService:setCurrentDoc', (currentDoc) => {
      this.doc = currentDoc;
    });
  }


  minimize(){
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');
  }

}
