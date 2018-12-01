import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { handleOAuthFlow, decryptPayload, getCollection, getFile } from 'graphite-docs';
declare let window: any;

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

  constructor(
    public navParams: NavParams,
    public nav: NavController, 
  ) {
  }

  ionViewDidLoad() {
    if(window.location.href.includes('response')) {
      this.handleGraphiteRedirect();
    }
    else{
      this.importFromGraphite();
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
    localStorage.setItem('graphitePdf', pdf.link.replace('data:application/pdf;base64,',''));
    localStorage.setItem('graphiteName', pdf.name);
    this.nav.setRoot("HomePage");
    this.nav.push("HomePage");
  } 

}
