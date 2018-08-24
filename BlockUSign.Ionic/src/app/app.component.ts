import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Toast } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AnnotatePage } from '../pages/annotate/annotate';
import { DocumentService } from '../services/document.service';
import { PopoverController, ToastController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { OptionsPopoverPage } from './options.popover.page';
import { MenuController } from 'ionic-angular';
import { BlockStackService } from './../services/blockstack.service';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
import { prototype } from 'long';
declare let blockstack: any;
declare let document: any;
declare var window: any;
const $ = document.querySelectorAll.bind(document);
import { AlertController } from 'ionic-angular';
declare let jQuery: any;


let { Keystore, Keygen } = require('eosjs-keygen')
let Eos = require('eosjs')




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
  avatar: string = "https://www.gravatar.com/avatar/?d=identicon";
  documentsList: any;
  email: string;
  loading;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public documentService: DocumentService,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,
    public blockStackService: BlockStackService,
    public toastCntrl: ToastController
  ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '1). Upload PDF', component: HomePage },
      { title: '2). Annotate PDF', component: AnnotatePage }
    ];

    // global vars
    if (window.location.host.includes("localhost")) {
      window.apiUrl = "http://localhost:5000";
    }
    else {
      window.apiUrl = "";
    }

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    //this.createEosTestAccount('dnciofrew');


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.loading.present();
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
    blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data', 'email'])
  }


  //Most applications should use this method for sign in unless they require more fine grained control over
  //  how the authentication request is generated. If your app falls into this category, 
  //  use generateAndStoreTransitKey, makeAuthRequest, and redirectToSignInWithAuthRequest to build your own sign in process.
  //  https://blockstack.org/auth?authRequest=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiJjYzhhNzg0ZC1jZjk2LTRhNDMtOWMzOC0zYjA1YjE1ZWFmMTMiLCJpYXQiOjE1MzAxMTQyMjQsImV4cCI6MTUzMDExNzgyNCwiaXNzIjoiZGlkOmJ0Yy1hZGRyOjE2azFmRFBGMzVHSjZlNmROeWtHdHg0dlk5WjJwdXl6bTEiLCJwdWJsaWNfa2V5cyI6WyIwMjViZjBjNmM3N2UyNDViNzZmMWZhNDczYWE1MDAxNjdmOWQ5ZjY3ZTI0ZWFjMzA4YTdhMjQ2MDg1OTdhMGNiYzkiXSwiZG9tYWluX25hbWUiOiJodHRwOi8vbG9jYWxob3N0OjgxMDAiLCJtYW5pZmVzdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjgxMDAvbWFuaWZlc3QuanNvbiIsInJlZGlyZWN0X3VyaSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODEwMCIsInZlcnNpb24iOiIxLjIuMCIsImRvX25vdF9pbmNsdWRlX3Byb2ZpbGUiOnRydWUsInN1cHBvcnRzX2h1Yl91cmwiOnRydWUsInNjb3BlcyI6WyJzdG9yZV93cml0ZSIsInB1Ymxpc2hfZGF0YSIsImVtYWlsIl19.nDIv-6RGft1gW8WK-Vuq5BDVmXDCEhBaZT-4kMTipZTWobasdokVIcMlU37jg5uT7JoubTOUR9srRW5xCxfXfQ
  loginAdvanced() {
    // TODO
    let transitKey = blockstack.generateAndStoreTransitKey();
    let authRequestJwt = blockstack.makeAuthRequest();

  }

  next() {


    this.menuCtrl.close();

    // if (this.nav.getActive().name == "AnnotatePage") {
    //  this.nav.pop();
    // }
    // else{
    //   jQuery('.block-pdf-page').empty();
    // }

    this.nav.setRoot("HomePage");

    let guid = this.documentService.currentDoc.guid;
    this.nav.push("AnnotatePage", {
      guid: guid
    });

    

  }

  home() {
    this.menuCtrl.close();
    this.nav.setRoot("HomePage");
    this.clearActive();
  }

  upload() {
    this.menuCtrl.close();
    this.nav.setRoot("HomePage");
    this.clearActive();
    setTimeout(()=>{
      try {
        document.getElementById('globalLoading').style.display = "";
        document.getElementById('file-upload').click();
      }
      catch(e) {}
    }, 300);

  }



  logout() {
    blockstack.signUserOut(window.location.origin);
  }

  async showProfile() {

    if (blockstack.isUserSignedIn()) {

      let profile = blockstack.loadUserData();
      this.name = profile.username;
      this.isLoggedIn = true;
      try {
        this.avatar = profile.profile.image[0].contentUrl;
      } catch (e) { console.log('no profile pic') }

      this.loginState = "[Logout]";
      this.documentService.getDocumentsIndex(true).then((data) => {
        this.documentsList = this.documentService.documentsListFiltered; //data;
      });

      //if (!profile.username) {

        let profileData = await this.blockStackService.getProfileData();

        if (!profileData) {
          this.profileModal(this.email);
        }
        else {
          let myProfile = JSON.parse(profileData);
          if (!myProfile.email){
            this.profileModal(this.email);
          }
          else {
            this.name = myProfile.email;
            this.loadCachedNewDocWhenLoggedIn();
          }
        }

      //}
        this.loading.dismiss();
    } else if (blockstack.isSignInPending()) {

      this.cacheNewDocIfNotLoggedIn();

      blockstack.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin
        this.documentsGetList();
        this.loading.dismiss();
      });
    }
    else {

      this.loading.dismiss();
      this.cacheNewDocIfNotLoggedIn();

      if (localStorage.getItem('signUp') !== 'true' && location.hostname !== "localhost" ) {
        window.location.href = "signup.html";
      }
      else {
        localStorage.setItem('signUp', 'true');
        this.login();
      }
    }

    // @todo Optimize this;
    this.blockStackService.saveAppPublicKey();

  }

  cacheNewDocIfNotLoggedIn() {
    // if contains sign and docData
    if (location.hash.includes("sign") &&  location.hash.includes("docData") ){
      localStorage.setItem('docCache', location.href);
    }
  }

  loadCachedNewDocWhenLoggedIn() {
    if (localStorage.getItem('docCache')){
      let l = localStorage.getItem('docCache');
      localStorage.removeItem('docCache');
      location.replace(l);
    }
  }

  public setupDiscordMenu() {
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

  documentSelected(e, selectedDocument) {

    this.documentService.currentDoc = selectedDocument;
    this.next();
  }


  documentsGetList() {

    this.loading.present();

    this.documentService.getDocumentsIndex(true).then((data) => {
      this.documentsList = this.documentService.documentsListFiltered; //data;
      this.loading.dismiss();
    });
  }


  presentPopover(myEvent, item) {
    let popover = this.popoverCtrl.create(OptionsPopoverPage, { selectedDoc: item });
    popover.present({
      ev: myEvent,

    });
  }

  clearActive() {

    $(".channel-text").forEach(el => {
      try {
        $(".channel-text.active")[0].classList.remove("active");
      }
      catch (e) { }
    });
  }

  profileModal(email) {

    let alert = this.alertCtrl.create({
      title: 'Please enter your email',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'email',
          placeholder: 'email',
          value: email
        }
      ],
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: data => {
        //     console.log('Cancel clicked');
        //   }
        // },
        {
          text: 'Ok',
          handler: data  => {

            if (data.email.indexOf("@") != -1) {
              // logged in!
              // save here
              this.blockStackService.setProfileData(data.email).then( () =>
              {
                //location.reload(true);
                this.showProfile();
                this.setupDiscordMenu();
              });
            } else {
              // invalid login
              this.showErrorToast('Invalid Email');
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  showErrorToast(data: any) {
    let toast = this.toastCntrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  filterDocumentList(signer, e){
    this.documentService.filterDocuments(signer);
    this.documentsList = this.documentService.documentsListFiltered;
   

    const activeServer = $(".server.active")[0];
    activeServer.classList.remove("active");
    activeServer.removeAttribute("aria-selected");

    e.currentTarget.classList.add("active");
    e.currentTarget.setAttribute("aria-selected", true);
    
  }

  copyBtc(){
    let el = document.getElementById('btc');

    el.select();
    document.execCommand("copy");

    let toast = this.toastCntrl.create({
      message: 'BTC Address copied ' + el.value,
      duration: 2000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  createEosTestAccount(accountName: string){
    

    let eosConfig = {
     chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // 32 byte (64 char) hex string
     keyProvider: '5J5iLjrs7ZcV....', // WIF string or array of keys..
     httpEndpoint: 'http://dev.cryptolions.io:38888',
     expireInSeconds: 60,
     broadcast: true,
     verbose: true, // API and transaction binary
     sign: true
   }

   let eos = Eos(eosConfig)
   
   eos.getInfo((error, result) => { console.log("EOS ====> ", error, result) })
   

   // let keyProvider =  '5HxyGPW66Cnj6n7m9uAH39hMDB9V7yaVK3XpF93nRPqHBn8HE7T';//'5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'; // local testnet 
   // let pubkey = 'EOS6G2h8AZQWXed9Rb2ShEuigz2e68xxY9EJXst2goi3xddLFckx6' ; // 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
   // accountName = 'user5';

   // let eos = Eos({keyProvider: keyProvider});

   let pubkey = "EOS51WQkH86ibNRdaWmYyFLijTPC2NptYFtqQ24YUNg1znxvdLRWE";
   accountName = "ghshdjeuyhfe";

   eos.transaction(tr => {
       
     tr.newaccount({
       creator: 'blockusign',
       name: accountName,
       owner: pubkey, //keys.publicKeys.owner,
       active: pubkey // keys.publicKeys.active
     });


     tr.buyrambytes({
       payer: 'blockusign',
       receiver: accountName,
       bytes: 5000
     });

     tr.delegatebw({
       from: 'blockusign',
       receiver: accountName,
       stake_net_quantity: '1.0000 EOS',
       stake_cpu_quantity: '1.0000 EOS',
       transfer: 0
     });

   }).then( (resp) =>{
     console.log("EOS resp ", resp);
   });
    

}

}



