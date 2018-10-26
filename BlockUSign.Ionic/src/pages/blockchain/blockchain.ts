import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentService } from './../../services/document.service';
import { BlockStepsComponent } from '../../components/block-steps/block-steps';
import { BitcoinService } from '../../services/bitcoin.service';
import { BlockStackService } from '../../services/blockstack.service';
import { Block } from 'bitcoinjs-lib';
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
  address= "";
  signature = "";
  profileUrl = "";
  showAdvancedInfo = false;
  showSig = false;
  isSaving = false;
  subdomainsStatus;
  isOnBlockchain = false;
  statusMessage = "";
  onStep = "1";
  blockstack = blockstack;
  zonefile;
  zonefileJson;
  isHashVerified = false;
  verifiedSigners = [];
  @ViewChild("blockSteps") blockSteps: BlockStepsComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public documentService: DocumentService,
    private bitcoinService: BitcoinService,
    private blockstackService: BlockStackService,
  ) {

    // if ( this.navParams.get("guid") && !this.documentService.currentDoc ){
    //   let guid = this.navParams.get("guid");
    //   this.documentService.getDocumentsIndex(true).then((data) => {
    //     this.documentService.documentsList = data;
    //     this.documentService.setCurrentDoc(guid);
    //     //this.getFile();
    //     // @todo in side menu highlight selected doc

    //   });
    // }
    // else{
    //   //this.getFile();
    // }

  }


  ionViewDidLoad() {
    this.init();
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

  async init() {
    this.guid = this.navParams.get("guid");
    this.documentService.getDocumentsIndex(true).then(async (data) => {
      this.documentService.documentsList = data;
      await this.documentService.setCurrentDoc(this.guid);
      await this.documentService.getAnnotations(this.guid);
      await this.getHash();
      await this.getSig();
      await this.checkStatus();
      await this.verifyHash();
    });
   
  }

  back() {
    // this.navCtrl.push("SignPage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route("ReviewPage");
  }

  async getHash() {
    this.hash = await this.documentService.getMerkleHash();
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
    let resp = this.bitcoinService.sendSudomainBatch(this.documentService.currentDoc.guid, this.address, this.hash, this.signature, this.profileUrl);
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
    let whoamiProof = await this.bitcoinService.fetchProfileValidateAppAddress(
      blockstack.loadUserData().username,  
      this.address, 
      window.location.origin 
    );
    return whoamiProof;
  }


  nyanCat() {

    $(".rainbow > *")
      .blast({ delimited: "word" });

    setTimeout(function () {
      $(".nyancat")
        .addClass("fly");
    }, 2000);

  }

  async checkStatus(){

 
    //Step 2 Subdomains
    try{
      this.subdomainsStatus = await this.bitcoinService.getSubdomainsStatus(this.guid);
      let status = this.subdomainsStatus.json().status;

      
      if (status == 'Subdomain propagated'){
        let lastTxId = await this.bitcoinService.getZoneFileLastTxIx(this.guid);
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
      let zoneFileStatusResp = await this.bitcoinService.getZoneFileStatus(this.guid);
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
    

  }

}
