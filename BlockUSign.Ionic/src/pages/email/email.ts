import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { EmailService } from './../../services/email.service';
import { BlockStackService } from './../../services/blockstack.service';
import { Observable } from 'rxjs';
import { delay, map, tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
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
  defaultHistory: ['AnnotatePage', 'HomePage'],

})
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class EmailPage {

  email = "";
  lookupId: string;
  user: string;
  people3: any = [];
  people3Loading = false;
  selectedUser = [];
  people3Typeahead = new Subject<string>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    public emailService: EmailService,
    public blockStackService: BlockStackService,
    public chg: ChangeDetectorRef
  ) {

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

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
    this.lookup();
    this.loadPeople3();
  }

  next() {
    this.navCtrl.push("SignPage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  back() {
    this.navCtrl.push("AnnotatePage", {
      guid: this.documentService.currentDoc.guid
    });
  }

  getUrl() {
    return window.location.href;
  }

  lookup() {
    blockstack.lookupProfile("blockusign1.id")
      .then((profile) => {
        let data = profile;
      })
      .catch((error) => {
        console.log('could not resolve profile')
      })
  }

  async searchUser(user) {
    let resp = await this.blockStackService.searchUser(user);
  }

  private loadPeople3() {
    this.people3Typeahead.pipe(
      tap(() => this.people3Loading = true),
      distinctUntilChanged(),
      debounceTime(375),
      switchMap(term => this.blockStackService.searchUser(term)),
    ).subscribe(x => {
      this.people3 = x;
      this.people3Loading = false;
      this.chg.markForCheck();
    }, () => {
      this.people3 = [];
    });
  }




}
