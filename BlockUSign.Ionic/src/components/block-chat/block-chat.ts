import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DocumentService } from './../../services/document.service';
import { Document, Log, Message } from './../../models/models';
import { Events } from 'ionic-angular';
import { BlockStackService } from '../../services/blockstack.service';
import * as moment from 'moment';
declare let $: any;
declare let jslinq: any;

/**
 * https://codepen.io/mehmetmert/pen/zbKpv
 */
@Component({
  selector: 'block-chat',
  templateUrl: 'block-chat.html',
})
export class BlockChatComponent implements OnDestroy, OnInit{

  public doc: Document;
  public message;
  public subscription;
  public chatSubscription;
  public chatPolling;
  firstLoad = true;
  
  constructor(
    public documentService: DocumentService, 
    public events: Events,
    public blockstackService: BlockStackService
  ) {
  
  }

  ngOnInit(){
    
    this.firstLoad = true;
    this.doc = new Document();
    
    if (this.documentService.currentDoc){
      this.doc = this.documentService.currentDoc;
      this.initChatPolling();
    }
    else{
      this.subscription = this.events.subscribe('documentService:setCurrentDoc', async (currentDoc) => {
        this.doc = currentDoc;
        this.initChatPolling();
      });
    }

    this.chatSubscription = this.events.subscribe('documentService:addedChat', async (msg) => {
      
    });
    

  }


  initChatPolling(){
    this.chatPolling = setInterval( () =>{ 
      setTimeout( () =>{ // hack?
        this.getLogData(true);
      }, 1000 );
    }, 3000);

  }


  ngOnDestroy(){
    
    clearInterval(this.chatPolling);
    
    if (this.subscription){
      this.subscription.unsubscribe();
    }
    if (this.chatSubscription){
      this.chatSubscription.unsubscribe();
    }
    
  }

  async getLogData(isPoll){

    
    $(document).ready(async ()=>{


   
      let logData: Log = await this.documentService.getLog(this.doc.guid);

      $('.chat-head').html(this.doc.fileName);
     
      let template = "";

      if (!logData){
        $(".loadSpin").hide();
        return;
      }

      let orderedMessages = jslinq(logData.messages).orderBy( (el) => el.updatedAt ).toList();

      for (let item of orderedMessages ) {
  
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
          <h5>${item.email}</h5>
          <p>${item.message}</p>
        </div> 
        </div>
        <hr style='margin-top:5px' />
        `;
      }


      //setTimeout( () =>{ // hack?
        $('.log-history').html(template);
        //$('.chat-history').scrollTop($('.log-history').height());
     // }, 300 );

     if (this.firstLoad) {
      $('.chat-history').scrollTop($('.log-history').height()); 
      this.firstLoad = false;
      $(".loadSpin").hide();
     }


    });
  
    
  }

  minimize(){
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');
  }

  async addMessage(){
    $(".loadSpin").show();
    await this.documentService.addMessage(this.doc.guid, this.message);
    this.events.publish('documentService:addedChat', this.message);
    this.message = null;
    this.firstLoad = true;
    $(".loadSpin").hide();
    // @todo optimize this with lazy load adding of new message
    //await this.getLogData();
  }

}
