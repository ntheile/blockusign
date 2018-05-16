import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DocumentService } from './../../services/document.service';
import { Document, Log, Message } from './../../models/models';
import { Events } from 'ionic-angular';
import { BlockStackService } from '../../services/blockstack.service';
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
 
  constructor(
    public documentService: DocumentService, 
    public events: Events,
    public blockstackService: BlockStackService
  ) {
  
  }

  ngOnInit(){

    
    if (!this.doc){
      this.doc = new Document();
    }
    this.doc = new Document();
    this.events.subscribe('documentService:setCurrentDoc', async (currentDoc) => {
      this.doc = currentDoc;

      let logData: Log = await this.documentService.getLog(this.doc.guid);

      $('.chat-head').html(currentDoc.fileName);
     
      let template = "";
      for (let item of logData.messages ) {


        let d = item.updatedAt;
        d = new Date(d);
        let formatDate = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");

        template =  template + `  
        <div class="chat-message clearfix">
        <img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">
        <div class="chat-message-content clearfix">
          <span class="chat-time">${formatDate}</span>
          <h5>${item.createdBy}</h5>
          <p>${item.message}</p>
        </div> 
        </div>
        <hr style='margin-top:5px' />
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
