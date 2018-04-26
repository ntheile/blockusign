import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {DocumentService} from '../services/document.service';
import { PopoverController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { OptionsPopoverPage } from './options.popover.page';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { prototype } from 'long';
declare let blockstack: any;
declare let document: any;
declare var window: any;
const $ = document.querySelectorAll.bind(document);
import { AlertController } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  name: string;
  isLoggedIn = false;
  loginState = "Login";
  fileName = "blockusign/pdf1.pdf";
  profile: any;
  pdfBuffer: any;
  avatar: string;
  documentsList: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
      public loadingCtrl: LoadingController, private alertCtrl: AlertController, 
      public documentService: DocumentService, public popoverCtrl: PopoverController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '1). Upload PDF', component: HomePage },
      { title: '2). Annotate PDF', component: ListPage }
    ];

    // global vars
    if (window.location.host.includes("localhost")) {
      window.apiUrl = "http://localhost:5000";
    }
    else {
      window.apiUrl = "";
    }


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
     
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.showProfile();
        this.setupDiscordMenu();
     
      
    });
  }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }

  login() {
    const origin = window.location.origin
    blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  next() {

    if (this.nav.getActive().name == "ListPage"){
      this.nav.pop();  
    }

    this.nav.push("ListPage");
  }

  home() {
    this.nav.setRoot("HomePage");
    this.clearActive();
  }

  logout() {
    blockstack.signUserOut(window.location.origin);
  }

  showProfile() {
    
    if (blockstack.isUserSignedIn()) {
     
      let profile = blockstack.loadUserData();
      this.name = profile.username;
      this.isLoggedIn = true;
      this.avatar = profile.profile.image[0].contentUrl;
      this.loginState = "[Logout]";
      this.documentService.getDocumentsIndex(true).then( (data)=>{
        this.documentsList = data;
      });
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin
        this.documentsGetList();
      });
    }
    else {
      this.login();
    }
  }

  setupDiscordMenu() {
    $(".focusable, .button").forEach(el => {
      // blur only on mouse click
      // for accessibility, keep focus when keyboard focused
      el.addEventListener("mousedown", e => e.preventDefault());
      el.setAttribute("tabindex", "0");
    });

    $(".server").forEach(el => {
      el.addEventListener("click", () => {
        const activeServer = $(".server.active")[0];
        activeServer.classList.remove("active");
        activeServer.removeAttribute("aria-selected");

        el.classList.add("active");
        el.setAttribute("aria-selected", true);
      });
    })

    $(".channel-text").forEach(el => {
      el.addEventListener("click", () => {
        $(".channel-text.active")[0].classList.remove("active");
        el.classList.add("active");
      });
    })

    // focus/blur on channel header click
    $(".channels-header")[0].addEventListener("click", e => {
      e.preventDefault();

      const focused = document.activeElement === e.target;
      focused ? e.target.blur() : e.target.focus();
    });
  }

  documentSelected(e, selectedDocument){
    
    this.documentService.currentDoc = selectedDocument;
    this.next();
  }
 

  

  documentsGetList(){
    this.documentService.getDocumentsIndex(true).then( (data)=>{
      this.documentsList = data;
    });
  }


  presentPopover(myEvent, item) {
    let popover = this.popoverCtrl.create(OptionsPopoverPage, {selectedDoc: item });
    popover.present({
      ev: myEvent,
      
    });
  }

  clearActive(){
    $(".channel-text").forEach(el => {
        try{
          $(".channel-text.active")[0].classList.remove("active");
        }
        catch(e){}
    });
  }

}



