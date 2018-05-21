import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
declare let blockstack: any;
declare let getQueryParam: any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SignPage',
  segment: 'sign/:guid',
  defaultHistory: ['EmailPage', 'AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html',
})
export class SignPage {

  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService
  ) {

  }

  ionViewDidLoad() {

    // if you are a signer and the document is not in your document.index then add it!
    // @todo think about allowing a document to get signed by an anonymous person if they got it via email with the documentKey

    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        //this.getFile();
        // @todo in side menu highlight selected doc
      });
    }
    else {
      //this.getFile();
    }

    let docKey = getQueryParam('documentKey');
    if (docKey) {
      alert(docKey);
    }

    if (this.navParams.get("documentKey")) {
      alert(this.navParams.get("documentKey"));
    }

    console.log('ionViewDidLoad SignPage');
    this.name = blockstack.loadUserData().profile.name;
  }

  next() {
    this.navCtrl.push("ReviewPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  back() {
    this.navCtrl.push("EmailPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

}
