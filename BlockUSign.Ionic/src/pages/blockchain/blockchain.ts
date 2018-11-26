import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
import { BitcoinService } from '../../services/bitcoin.service';
import { BlockStackService } from '../../services/blockstack.service';
import { EmailService } from '../../services/email.service';
import { Block } from 'bitcoinjs-lib';
import { AlertController } from 'ionic-angular';
declare let window: any;
declare let blockstack: any;
declare let $:any;
declare let blast:any;
declare let parseZoneFile: any;

/**
 * Generated class for the SignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'BlockchainPage',
  segment: 'blockchain/:guid',
  defaultHistory: ['SignPage', 'EmailPage', 'AnnotatePage', 'HomePage']
})
@Component({
  selector: 'page-blockchain',
  templateUrl: 'blockchain.html',
})
export class BlockchainPage {

  hash = "";
  guid = "";
  guidPrefix = null;
  address = "";
  gaia = "";
  mySubDomainName;
  collaborators = [];
  
  zoneFiles = [];
  signature = ""; // ary
  profileUrl = ""; // ary
  zonefile; // ary
  zonefileJson; // ary
  isHashVerified = false; //ary
  
  verifiedSigners = []; // show after you loop zonefiles
  topDomain = '.blockusign1.id';
  showAdvancedInfo = false;
  showSig = false;
  isSaving = false;
  blockstack = blockstack;
  subdomainsStatus;
  isOnBlockchain = false; // for your user id / subdomain file
  statusMessage = "";
  onStep = "1"; // for your user id / subdomain file
  maxCollaborators = 3;
  isLoading = true;
  @ViewChild("blockSteps") blockSteps: BlockStepsComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    private bitcoinService: BitcoinService,
    private blockstackService: BlockStackService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private emailService: EmailService,
  ) { }


  ionViewDidLoad() {
    this.init();
  }

  async init() {
    this.guid = this.navParams.get("guid");
    this.documentService.getDocumentsIndex(true).then(async (data) => {
      this.documentService.documentsList = data;
      await this.documentService.setCurrentDoc(this.guid);
      await this.documentService.getAnnotations(this.guid);
      this.mySubDomainName = this.getSubdomainName();
      this.collaborators = await this.documentService.getCollaborators(this.guid);
      await this.getHash();
      await this.getSig();
      await this.checkIfOthersSigned();
      this.checkIfISigned();
      this.verifiedDisplay();
    });
  }

  async checkIfOthersSigned(){
    // check if others signed
    this.zoneFiles = await this.bitcoinService.getAllZoneFileSubdomainStatusByGuid(this.guid);
    this.zoneFiles = await this.bitcoinService.getAnchoredToBitcoinStatusByZoneFiles(this.zoneFiles);
    this.zoneFiles = await this.bitcoinService.getBlockstackAtlasP2PStatusByZoneFile(this.zoneFiles);
    let localGaiaHash = await this.documentService.getMerkleHash();
    this.zoneFiles = await this.bitcoinService.verifyAllZonfilesSignatures(this.zoneFiles, localGaiaHash);
    let didISignAlready = this.didISign();
    this.displayStatus();
  }

  async checkIfISigned(){
    // check if i signed
    await this.checkStatus();
  }

  // This is prefixed on the guid to keep the subdomains name unique for each documents GUID.
  // the guid prefix is appended to the guid in the case mutple people sign a document
  // the first signed has mnmo prefix, the second signers guid is 0 , the third the 1...up to 9 
  getguidPrefix(){
    let paths = this.documentService.currentDoc.paths;
    let myPath = paths.find(f=>f.userId == blockstack.loadUserData().username);
    let myIndex = paths.indexOf(myPath);
    return myIndex;
  }

  getSubdomainName(){
    let myIndex = this.getguidPrefix();
    if (myIndex == 0){
      return this.guid;
    }
    return ( (myIndex - 1).toString() + this.guid );
  }

 
  async displayStatus(){
    for (let zf of this.zoneFiles){
      //Step 2 Subdomains
      try{
        let status = zf.subdomainStatus.json().status;
        if (status == 'Subdomain propagated'){
          let lastTxId = await this.bitcoinService.getZoneFileLastTxIx();
          zf.subdomainsStatusText = `Subdomain propagated <a href="https://www.blockchain.com/btc/tx/` + lastTxId + `" target="_blank">` + lastTxId + `</a>`
          zf.onStep = "2";
        }
        else if (status.includes('queued')){
          zf.onStep = "1";
          zf.subdomainsStatusText = status;
        }
        else{
          let words = status.split(' ');
          let txIndex = words.indexOf("transaction") + 1;
          let tx = words[txIndex];
          words[txIndex] = `<a href="https://www.blockchain.com/btc/tx/` + tx + `" target="_blank">` + tx + `</a>`
          zf.subdomainsStatusText = words.join(' ');
          console.log(zf.subdomainsStatusText);
          zf.onStep = "2";
        }
      }
      catch(e){
        console.log('not in subdomains', e);
        zf.onStep = "0";
      }
      //Step 3
      try{        
        if ( zf.isOnBlockchain){
            zf.onStep = "3";
        }
      } catch(e){
        console.log('not replicated yet', e)
      }
    }
  }

  didISign(){
    let myzoneFile = this.zoneFiles.find(f=> f.owner == this.address);
    console.log("myzoneFile", myzoneFile);
    if (myzoneFile){
      this.onStep = "4"
      myzoneFile.onStep = "4"
      this.mySubDomainName = myzoneFile.subdomainName;
      console.log("mySubDomainName", this.mySubDomainName);
      return true;
    }
    else{
      // this.isOnBlockchain = false;
      // this.onStep = "0";
      // this.guidPrefix = this.getguidPrefix();
      // if (this.guidPrefix != null ){
      //   this.mySubDomainName = this.guidPrefix.toString() + this.guid;
      // }
      console.log("mySubDomainName", this.mySubDomainName);
      return false;
    } 
  }

 

  





  getSig(){
    this.address = this.bitcoinService.getAppBitcoinAddress().toString();
    let wif = this.bitcoinService.getWif();
    this.signature = this.bitcoinService.signMessage(this.hash, wif);
    this.profileUrl = this.blockstackService.getProfileJsonUrl();
  }

  postBlockchain() {
    this.isSaving = true;
    this.nyanCat();
    let wif = this.bitcoinService.getWif();

    // @todo check for 409 error
    let resp = this.bitcoinService.sendSudomainBatch(this.mySubDomainName, this.address, this.hash, this.signature, this.profileUrl);
    // saving to the blockchain
    this.onStep="1";
    this.showToastWithCloseButton(
      `Thank you! Your document has been queued. The digital signature will be saved to the 
      blockchain within the next 12 hours. We are in beta right now, but in production this will take around 10 minutes. Please check
      back in about 12 hours to see the status`);
  }

  async verifyHash() {

    // OLD - to manually save hash to bitcoin op_return using bitcore
    // this.bitcoinService.sendTransaction(window.appsettings.to, window.appsettings.signer, window.appsettings.signerKey,  'sha256-' + this.hash);
    // let appUrl = window.location.origin;

    let blockstackId = blockstack.loadUserData().username;
    let appBitcoinAddress = this.blockstackService.getAppBitcoinAddress();
    let appUrl = window.location.origin;
    let resp = this.bitcoinService.fetchProfileValidateAppAddress(blockstackId, appBitcoinAddress, appUrl);
    let verifiedSig = this.bitcoinService.verifyMessage(this.hash, this.address, this.signature);

    if (verifiedSig){
      console.log('local signature is verified');
      if (this.zonefile){
        this.zonefileJson = parseZoneFile(this.zonefile);
        let hash = this.zonefileJson.txt.find(n=>n.name === 'hash').txt;
        let signature = this.zonefileJson.txt.find(n=>n.name === 'signature').txt;
        let owner = this.zonefileJson.txt.find(n=>n.name === 'owner').txt;
        let verifiedZonefileSignature = this.bitcoinService.verifyMessage(hash, owner, signature);
        if (verifiedZonefileSignature){
          let whoamiProof = await this.associateAppPubKeyToBlockstackId();
          console.log(whoamiProof);
          this.verifiedSigners.push({
            name: whoamiProof.username,
            isVerified: true
          });
          try{
            let collab = this.collaborators.find(c=>c.userId == whoamiProof.username);
            collab.isVerified = true;
          }
          catch(e){}
          this.isHashVerified = true;
          this.onStep = "4";
          return true;
        }
      }
      else{
        console.error('zonefile signature failed.')
      }
    }
  }

  async associateAppPubKeyToBlockstackId(){
    let blockstackId = blockstack.loadUserData().username;
    let whoamiProof = await this.bitcoinService.fetchProfileValidateAppAddress(
      blockstackId,  
      this.address, 
      window.location.origin 
    );
    return whoamiProof;
  }

  async checkStatus(){
    //Step 2 Subdomains
    try{
      this.subdomainsStatus = await this.bitcoinService.getSubdomainsStatus(this.mySubDomainName);
      let status = this.subdomainsStatus.json().status;
      if (status == 'Subdomain propagated'){
        let lastTxId = await this.bitcoinService.getZoneFileLastTxIx();
        this.subdomainsStatus = `Subdomain propagated <a href="https://www.blockchain.com/btc/tx/` + lastTxId + `" target="_blank">` + lastTxId + `</a>`
        this.onStep = "2";
      }
      else if (status.includes('queued')){
        this.onStep = "1";
        this.subdomainsStatus = status;
      }
      else{
        let words = status.split(' ');
        let txIndex = words.indexOf("transaction") + 1;
        let tx = words[txIndex];
        words[txIndex] = `<a href="https://www.blockchain.com/btc/tx/` + tx + `" target="_blank">` + tx + `</a>`
        this.subdomainsStatus = words.join(' ');
        console.log(this.subdomainsStatus);
        this.onStep = "2";
      }

    }
    catch(e){
      console.log('not in subdomains', e);
      this.onStep = "0";
    }
    //Step 3
    try{
      let zoneFileStatusResp = await this.bitcoinService.getZoneFileStatus(this.mySubDomainName);
      if (zoneFileStatusResp){
        if (zoneFileStatusResp.json().zonefile){
          this.zonefile = zoneFileStatusResp.json().zonefile;
          this.isOnBlockchain = true;
          this.onStep = "3";
        }
      }
    }
    catch(e){
      console.log('not replicated yet', e)
    };
    // Step 4
    this.didISign();
    this.isLoading = false;
  }

  async getHash() {
    this.hash = await this.documentService.getMerkleHash();
    return this.hash;
  }

  genLink(){
    let documentLink = window.location.origin + "/#/blockchain/" + this.documentService.currentDoc.guid;
    return documentLink;
  }

  verifiedDisplay(){
    for(let collab of this.collaborators){
      try{
        let didSign = this.zoneFiles.find(v=>v.verified == collab.userId);
        if (didSign){
          collab.isVerified = true;
        }
      } catch(e) {
        console.error('error verifiedDisplay', e);
      }
      
      
    }
  }





  showToastWithCloseButton(message) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  nyanCat() {

    $(".rainbow > *")
      .blast({ delimited: "word" });

    setTimeout(function () {
      $(".nyancat")
        .addClass("fly");
    }, 2000);

  }

  back() {
    // this.navCtrl.push("SignPage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route("ReviewPage");
  }

  toggleAdvanced(){
    if (this.showAdvancedInfo == true){
      this.showAdvancedInfo = false;
    } 
    else{
      this.showAdvancedInfo = true;
    }
  }

  toggleSig(){
    if (this.showSig == true){
      this.showSig = false;
    } 
    else{
      this.showSig = true;
    }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Please confirm you are signing the correct document version',
      message: 'If you shared this document please confirm your collaborator is signing the same version of the document. They <b>MUST</b> have the same hash <br/><br/>' + this.hash 
        + '<br/><br/> *you can send a confirmation email in the next step',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: () => {
            this.presentEmail();
          }
        }
      ]
    });
    alert.present();
  }

  presentEmail() {
    let alert = this.alertCtrl.create({
      title: 'Email Signer?',
      message: 'Do you want to send an email to your signer and remind them to: <ul><li> check their document version/hash</li> <li> ask them to sign this document to the blockchain</li></ul>',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.presentSignToBlockChain();
          }
        },
        {
          text: 'Yes',
          handler:   data => {
          
            if (data.email){
              let link = this.genLink();
              let me = blockstack.loadUserData().username;
              let fileName = this.documentService.currentDoc.fileName;
              let subject = me + " has sent you a document to verify, review and sign to the blockchain - " + fileName;
              let content = "Please review/verify and sign this document to the blockchain. <br/><br/><a href='" + link + "' >"+fileName+"</a> ";
              content = content + "<p>The document version/hash must match this to prove you are signing the same verions as " +me + ".</p> <br/>" + this.hash;
              this.emailService.sendEmail(data.email, subject, content);
              this.presentSignToBlockChain();
            }
           
          }
        }
      ],
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
    });
    alert.present();
  }

  presentSignToBlockChain() {
    let alert = this.alertCtrl.create({
      title: 'Sign to the Blockchain!',
      message: 'Do you want to sign this version of the document and your digital signature to the blockchain?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.postBlockchain()
          }
        }
      ]
    });
    alert.present();
  }


}
