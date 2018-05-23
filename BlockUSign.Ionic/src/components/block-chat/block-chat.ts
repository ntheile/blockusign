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
  public message;
  public subscription;
  public chatSubscription;
 
  constructor(
    public documentService: DocumentService, 
    public events: Events,
    public blockstackService: BlockStackService
  ) {
  
  }

  ngOnInit(){
    
   
    this.doc = new Document();
    
    if (this.documentService.currentDoc){
      this.doc = this.documentService.currentDoc;
      this.getLogData();
    }
    else{
      this.subscription = this.events.subscribe('documentService:setCurrentDoc', async (currentDoc) => {
        this.doc = currentDoc;
        this.getLogData();
      });
    }

    this.chatSubscription = this.events.subscribe('documentService:addedChat', async (msg) => {

      setTimeout( () =>{ // hack?
        this.getLogData();
      }, 1000 );

      
    });
    

  }

  ngOnDestroy(){
    if (this.subscription){
      this.subscription.unsubscribe();
    }

    if (this.chatSubscription){
      this.chatSubscription.unsubscribe();
    }
  }

  async getLogData(){


    $(document).ready(async ()=>{
      let logData: Log = await this.documentService.getLog(this.doc.guid);

      $('.chat-head').html(this.doc.fileName);
     
      let template = "";
      for (let item of logData.messages ) {
  
        let d = item.updatedAt;
        let formatDate = moment(d).calendar(d);
  
        let uid = item.createdBy;
        try{
          uid = item.createdBy.replace('.id','');
        }
        catch(e){ console.log('user does not have .id') };
        
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


      //setTimeout( () =>{ // hack?
        $('.log-history').html(template);
        $('.chat-history').scrollTop($('.log-history').height());
     // }, 300 );

     
    });

    
  }

  minimize(){
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');
  }

  async addMessage(){
    await this.documentService.addMessage(this.doc.guid, this.message);
    this.events.publish('documentService:addedChat', this.message);
    this.message = null;

    // @todo optimize this with lazy load adding of new message
    //await this.getLogData();
    
  }

}
