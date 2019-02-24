import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BlockStackService } from '../../services/blockstack.service';
import { DocumentService } from '../../services/document.service';
import * as moment from 'moment';
declare let blockstack: any;

/**
 * Generated class for the FeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feed',
  templateUrl: 'feed.html'
})
export class FeedComponent {

  avatars = {};
  name;
  feed = [];
  itemsPerPage = 100;
  @Input() parent;
  moment = moment;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public blockstackService: BlockStackService,
    public documentService: DocumentService,
  ) {
    this.init();
  }

  async init(){
    this.name = blockstack.loadUserData().username;
    this.loadFeed();
  }

  async loadFeed(){
    let documents = await this.documentService.getDocumentsIndex(true);
    let lastItem = documents.length;
    this.feed = documents.slice(lastItem - this.itemsPerPage, lastItem).reverse();
    // TODO - this could inefficiant for large lists with lots of signers
    for (let item of this.feed) {
      for (let signer of item.paths){
        let name = signer.userId;
        this.blockstackService.getPicUrl(name).then( (avatar)=>{
          if (!this.avatars[name]){
            this.avatars[name] = avatar;
          }
        });
      }
    }
  }

  documentSelected(e, selectedDocument) {

    this.documentService.currentDoc = selectedDocument;
    this.navCtrl.setRoot("HomePage");

    let guid = this.documentService.currentDoc.guid;
    let page = "EmailPage";
    if (selectedDocument.isCompleted){
      page = "BlockchainPage";
    }
    this.navCtrl.push(page, {
      guid: guid
    });

  }


}
