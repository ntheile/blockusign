import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Searchbar } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { EmailService } from './../../services/email.service';
import { BlockStackService } from './../../services/blockstack.service';
import { Observable } from 'rxjs';
import { delay, map, tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
declare let blockstack: any;
declare let $: any;

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
  loading;
  choice = 'link';
  userInput;
  userArray;
  selectedUsers = [];
  public documentLink = "";;

  @ViewChild("blockSteps") blockSteps: BlockStepsComponent;
  @ViewChild('searchbar') searchbar: Searchbar;
  @ViewChild('searchitems') searchitems: ElementRef;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    public emailService: EmailService,
    public blockStackService: BlockStackService,
    public chg: ChangeDetectorRef,
    public loadingCtrl: LoadingController
  ) {

    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      let guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentService.documentsList = data;
        this.documentService.setCurrentDoc(guid);
        //this.getFile();
        // @todo in side menu highlight selected doc
        this.genLink();
      });
    }
    else {
      //this.getFile();
      this.genLink();
    }

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad SignPage');
    //this.lookup();
    this.loadPeople3();
  }

  next() {
    // this.navCtrl.push("SignPage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route('SignPage');
  }

  back() {
    // this.navCtrl.push("AnnotatePage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route('AnnotatePage');
  }

  getUrl() {
    return window.location.href;
  }

  async lookup(user) {
    console.log(user);
    this.userArray = await this.blockStackService.searchUser(this.userInput); 
    $("#searchitems").css('height', '250px');
    $("#searchitems").css('overflow', 'auto');
  }

  async addUser(user){
    this.searchbar.clearInput(null);
    this.selectedUsers.push(user.fullyQualifiedName);
    this.onSearchClear(); 
   
  }

  onSearchClear(){
    setTimeout( ()=>{
      $("#searchitems").css('height', '0px');
    }, 200 );
    return;
  }

  async searchUser(user) {
    let resp = await this.blockStackService.searchUser(user);
  }

  async removeUser(user){
    this.selectedUsers.splice( this.selectedUsers.indexOf(user), 1 );
  }

  private loadPeople3() {
    this.people3Typeahead.pipe(
      tap( () => this.people3Loading = true),
      distinctUntilChanged(),
      debounceTime(375),
      switchMap(term => 
        this.blockStackService.searchUser(term)
      ),
    ).subscribe(x => {
      this.people3 = x;
      this.people3Loading = false;
      //this.chg.markForCheck();
      console.log("ppl loading false");
    }, () => {
      this.people3 = [];
      console.log("[]");
    });
  }

  async sendEmail(e){
    if (!this.email || !this.email.includes('@')){
      alert('Please enter a valid email address');
      return;
    }

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 12000
    });
    this.loading.present();

    // add as signer
    this.documentService.currentDoc.signer.push(this.email);    
    await this.documentService.updateDocument(this.documentService.currentDoc.guid, this.documentService.currentDoc)
    let me = blockstack.loadUserData().username;
    this.documentLink = this.genLink();
    let subject = me + " has sent you a document to sign - " + this.documentService.currentDoc.fileName;
    let content = me + " has requested you sign the following document. <br/><br/><a href='" + this.documentLink + "' >"+this.documentService.currentDoc.fileName;+"</a> <br/><br/>Thanks, <br/>Blockusign";
    await this.emailService.sendEmail(this.email, subject, content);

    this.loading.dismiss();

    alert('Email sent!');
  }

  genLink(){
    this.documentLink = window.location.origin + "/#/sign/" + this.documentService.currentDoc.guid + "/?docData=" + btoa(JSON.stringify(this.documentService.currentDoc));
    return this.documentLink;
  }

  clickedUser(){
    // @todo spoofed
    setTimeout( ()=>{
      alert('Email not found. Please enter below');
    }, 1000 );
  }



}
