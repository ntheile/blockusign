import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
declare let blockstack: any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'EmailPage',
  segment: 'email/:guid',
  defaultHistory: ['AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {


  lookupId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public documentService: DocumentService) {

    if ( this.navParams.get("guid") && !this.documentService.currentDoc ){
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        //this.getFile();
        // @todo in side menu highlight selected doc
      });
    }
    else{
      //this.getFile();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
    this.lookup();
  }

  next(){
    this.navCtrl.push("SignPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  back(){
    this.navCtrl.push("AnnotatePage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  getUrl(){
    return window.location.href;
  }

  lookup(){
    blockstack.lookupProfile("blockusign1.id")
    .then((profile) => {
      let data = profile;
    })
    .catch((error) => {
      console.log('could not resolve profile')
    })
  }

}
