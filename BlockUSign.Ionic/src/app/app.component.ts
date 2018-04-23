import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {DocumentService} from '../services/document.service'
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
  pdfBuffer: Buffer;
  avatar: string;
  documentsList: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
      public loadingCtrl: LoadingController, private alertCtrl: AlertController, public documentService: DocumentService) {
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
      
      this.documentService.getDocumentsIndex(true).then( (data)=>{
        this.documentsList = data;
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.showProfile();
        this.setupDiscordMenu();

      });
      
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login() {
    const origin = window.location.origin
    blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  next() {
    this.nav.push(ListPage);
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
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin
      })
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


 


}
