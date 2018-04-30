import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ReviewPage',
  segment: 'review/:guid',
  defaultHistory: ['SignPage', 'EmailPage','AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

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
  }

 

  back(){
    this.navCtrl.push("SignPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

}
