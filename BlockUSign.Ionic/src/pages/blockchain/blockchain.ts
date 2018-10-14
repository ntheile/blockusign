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
    this.nyanCat();
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

    // if you are a signer and the document is not in your document.index then add it!
    // @todo think about allowing a document to get signed by an anonymous person if they got it via email with the documentKey

    // test - http://localhost:8100/#/sign/a48b11c6-349b-697b-90f9-8356c29ccbf8/?docData=eyJndWlkIjoiYTQ4YjExYzYtMzQ5Yi02OTdiLTkwZjktODM1NmMyOWNjYmY4IiwiY3JlYXRlZEF0IjoxNTI3MTI3NTgxNDgyLCJ1cGRhdGVkQXQiOjE1MjcxMjc1ODE0ODIsImhhc0Fubm90YXRpb25zIjpmYWxzZSwic3RlcCI6IkFubm90YXRlIiwiaXNDb21wbGV0ZWQiOmZhbHNlLCJmaWxlTmFtZSI6Im5pY2sgMS5wZGYiLCJkb2N1bWVudEtleSI6IjVjYmY0NjVjLTU5ODktOTNlMy02OGUxLTdkNTE5NzEyYTZmNCIsInBhdGhBbm5vdGF0ZWREb2MiOiJodHRwczovL2dhaWEuYmxvY2tzdGFjay5vcmcvaHViLzE4a1Rza0JwVGgxbXpuc3lwdTFmaEoyN2R4YkMxU3dYRUsvIiwicGF0aHMiOlt7Im5hbWUiOiJuaWNrIHRlZSIsInVzZXJJZCI6Im5pY2t0ZWUuaWQiLCJwYXRoVG9TdG9yYWdlIjoiaHR0cHM6Ly9nYWlhLmJsb2Nrc3RhY2sub3JnL2h1Yi8xOGtUc2tCcFRoMW16bnN5cHUxZmhKMjdkeGJDMVN3WEVLLyJ9XSwic2lnbmVyIjpbImJsb2NrdXNpZ24uaWQiXX0=


    if (this.navParams.get("guid") && !this.documentService.currentDoc) {
      this.guid = this.navParams.get("guid");
      this.documentService.getDocumentsIndex(true).then(async (data) => {
        this.documentService.documentsList = data;
        await this.documentService.setCurrentDoc(this.guid);
        await this.documentService.getAnnotations(this.guid);
        this.getHash();
      });

    }
    else {
      this.getHash();
    }

    this.getSig();


  }



  back() {
    // this.navCtrl.push("SignPage", {
    //   guid: this.documentService.currentDoc.guid
    // });
    this.blockSteps.route("SignPage");
  }

  getHash() {
    let toHash = '';
    if (this.documentService.currentDocAnnotations) {
      toHash = this.documentService.currentDocAnnotations.annotations;
    }
    this.hash = this.documentService.genHashFromString(toHash);
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

  verifyHash() {

    // OLD
    // this.bitcoinService.sendTransaction(window.appsettings.to, window.appsettings.signer, window.appsettings.signerKey,  'sha256-' + this.hash);
    // let appUrl = window.location.origin;
    // let resp = this.bitcoinService.fetchProfileValidateAppAddress(blockstackId, appBitcoinAddress, appUrl);

    // let verifiedSig = this.bitcoinService.verifyMessage(hash, address, signature);
    // console.log(verifiedSig);
  }

  // https://blockusign-subdomains.azurewebsites.net/status/077f517a-c5c5-8422-a76b-500f50d2c938
  getStatus(docGuid) {

    // returns txid

    // goto bitcoin block explorer
    // https://www.blockchain.com/btc/tx/b705474a72dbb874bb62ea1f9bf2fc6eea85ffdd1d6117cf05617e929e3befda

    // how many confirmations ?


    // eventually it will propegate to blockstack explorer as name_update
    // https://explorer.blockstack.org/name/blockusign1.id

  }

  nyanCat() {

    $(".rainbow > *")
      .blast({ delimited: "word" });

    setTimeout(function () {
      $(".nyancat")
        .addClass("fly");
    }, 2000);

  }

}
