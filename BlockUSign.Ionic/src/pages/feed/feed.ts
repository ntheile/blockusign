import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlockStackService  } from './../../services/blockstack.service';
import { DocumentService } from '../../services/document.service';
declare let blockstack: any;

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  avatar;
  name;
  feed = [];
  itemsPerPage = 10;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public blockstackService: BlockStackService,
    public documentService: DocumentService,
    ) {
  }

  async ionViewDidLoad() {
    this.name = blockstack.loadUserData().username;
    this.avatar = await this.blockstackService.getPicUrl(this.name);
    this.loadFeed();
  }

  async loadFeed(){
    let documents = await this.documentService.getDocumentsIndex(true);
    let lastItem = documents.length;
    this.feed = documents.slice(lastItem - this.itemsPerPage, lastItem).reverse();
  }

}
