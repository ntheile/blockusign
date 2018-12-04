import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { handleOAuthFlow, decryptPayload, getCollection, getFile, decryptContent } from 'graphite-docs';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BitcoinService } from './../../services/bitcoin.service';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
declare let window: any;
declare let blockstack: any;

/**
 * Generated class for the GraphitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graphite',
  templateUrl: 'graphite.html'
})
export class GraphitePage {


  graphiteDocs;
  graphiteJWT;
  graphiteGaia;

  httpOptions;

  constructor(
    public navParams: NavParams,
    public nav: NavController, 
    public  http: Http,
    public bitcoinService: BitcoinService,
  ) {
  }

  ionViewDidLoad() {
    this.init();
  }

  init(){
   
   if(window.location.href.includes('file')){
      this.fromGraphite();
      return;
    }
    else if (window.location.href.includes('response')) {
      this.handleGraphiteRedirect();
      return;

    }
    else{
      this.importFromGraphite();
      return;

    }

    
  }

  importFromGraphite(){
    handleOAuthFlow({
     targetURI: 'https://app.graphitedocs.com/oauth/verify',
     appName: "Blockusign",
     redirectURI: window.location.origin + "/#/graphite/"
    });
 }

  handleGraphiteRedirect(){
      const payload = JSON.parse(decryptPayload(window.location.href.split('response=')[1]));
      this.graphiteJWT = payload;
      const hub = JSON.parse(payload.gaiaConfig)
      console.log(hub);
      const object:any = {};
      object.docType = "vault";
      object.privateKey = payload.private;
      object.storagePath = hub.url_prefix + hub.address;
      this.graphiteGaia = hub.url_prefix + hub.address;
      console.log(object);
      getCollection(object).then(data => {
        this.graphiteDocs = data.filter(t=>t.type =="application/pdf");
      });
  }

  async itemSelected(doc){
    let pdf = await getFile({
      docType: 'vault',
      storagePath: this.graphiteGaia,
      privateKey: this.graphiteJWT.private,
      id: doc.id
    });
    console.log(pdf.link);
    this.loadPdf(pdf);
  }
  
  loadPdf(pdf){
    localStorage.setItem('graphitePdf', pdf.link.replace('data:application/pdf;base64,',''));
    localStorage.setItem('graphiteName', pdf.name);
    this.nav.setRoot("HomePage");
    this.nav.push("HomePage");
  }

  // example redirect url
  // http://localhost:8100/#/graphite?file=https://gaia.blockstack.org/hub/199HNXubFgCH2QUtXN9bEbousnrHtLTmG6/blockusign/1543803149107&decrypt=true
  async fromGraphite() {
    let file = this.getParameterByName("file", window.location.href);
    let decrypt = this.getParameterByName("decrypt", window.location.href);
    console.log('file', file);

    try{
      
      this.httpOptions = new RequestOptions();
      this.httpOptions.headers = new Headers(
        {
          'Content-Type': 'application/json'
        }
      );
      let resp = await this.http.get(file, this.httpOptions).toPromise();
      let data = resp.json();
      console.log('graphite data', data);
      if(decrypt=="true"){
        data = blockstack.decryptContent(JSON.stringify(data), {privateKey: blockstack.loadUserData().appPrivateKey});
      }
      data = JSON.parse(data);
      console.log('graphite data parsed', data);

      //now redirected pdf data payload to editor
      console.log("pdf type ", data.type);
      if (data.type =="application/pdf"){
        console.log("pdf link ", data.link);
        this.loadPdf(data);
      }
      else{
       alert('must be data.type application/pdf ') ;
      }
     }
    catch(e){
      console.error('error in fromGraphite ', e);
    }
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));  
  }

}
