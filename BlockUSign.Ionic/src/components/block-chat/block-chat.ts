import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DocumentService } from './../../services/document.service';
import { Document, Log, Message } from './../../models/models';
import { Events } from 'ionic-angular';
import { BlockStackService } from '../../services/blockstack.service';
import * as moment from 'moment';
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
  message;
 
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
      this.getLogData();
    });
  }

  async getLogData(){
    let logData: Log = await this.documentService.getLog(this.doc.guid);

    $('.chat-head').html(this.doc.fileName);
   
    let template = "";
    for (let item of logData.messages ) {

      let d = item.updatedAt;
      //d = new Date(d);
      //let formatDate = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+' '+(d.getHours() >= 12 ? "PM" : "AM");
      let formatDate = moment(d).calendar(d);

      let uid = item.createdBy.replace('.id','');
      let uName = item.createdByName;
      let uidClass = 'block-pic-' + uid;

      this.blockstackService.getPicUrl(uName).then( (picUrl) =>{
        $('.' + uidClass).attr('src', picUrl);
      });

      template =  template + `  
      <div class="chat-message clearfix">
      <img class="${uidClass}" src="http://www.gravatar.com/avatar/?d=identicon" alt="" width="32" height="32">
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

    $('.chat-history').scrollTop($('.log-history').height());
  }

  minimize(){
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');
  }

  async addMessage(){
    await this.documentService.addMessage(this.doc.guid, this.message);
    this.message = null;
    // @todo optimize this with lazy load adding of new message
    this.getLogData();
  }

}
