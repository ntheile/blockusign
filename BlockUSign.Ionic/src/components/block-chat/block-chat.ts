import { Component, Input } from '@angular/core';
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
  templateUrl: 'block-chat.html',
})
export class BlockChatComponent {

  public doc: Document;
  public log: Array<any>;

  constructor(
    public documentService: DocumentService, 
    public events: Events
  ) {
  
  }

  ngOnInit(){

    if (!this.log){
      this.log =  [];
    }    
    if (!this.doc){
      this.doc = new Document();
    }
    this.doc = new Document();
    this.events.subscribe('documentService:setCurrentDoc', (currentDoc) => {
      this.doc = currentDoc;
      $('.chat-head').html(currentDoc.fileName);
      this.log =  [
        {id: 1, name:'Superman'},
        {id: 2, name:'Batman'},
        {id: 5, name:'BatGirl'},
        {id: 3, name:'Robin'},
        {id: 4, name:'Flash'}
      ];

      let template = "";
      for (let item of this.log) {
        template =  template + `  
        <div class="chat-message clearfix">
        <img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">
        <div class="chat-message-content clearfix">
          <span class="chat-time">13:37</span>
          <h5>${item.name}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>
        </div> 
        </div>
        `;
      }
      $('.log-history').html(template);

    });
  }

  minimize(){
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');
  }

}
