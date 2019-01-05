import { Component, ViewChild } from "@angular/core";
import { ViewController, NavController, App, MenuController, NavParams} from "ionic-angular";
import { DocumentService } from './../services/document.service';
import { ToastController } from 'ionic-angular';

@Component({
    template: `
    <div style="background-color: #1E2124">
     
     <br/>
      <ion-list style="background-color: #1E2124; margin: -1px 0 0px;">
       <button (click)="close()" style="float: right; background-color: #1E2124; margin-top: -10px; margin-bottom: -4px"> <ion-icon style="color: white; margin-top:-10px" name="md-close-circle"></ion-icon></button>
        <button ion-item (click)="goto('blockchain')" style="background-color: #1E2124"> <ion-icon name="md-finger-print"></ion-icon>&nbsp;&nbsp; Verify on Blockchain</button>
        <button ion-item (click)="goto('sign')" style="background-color: #1E2124"> <ion-icon name="md-create"></ion-icon>&nbsp;&nbsp; View e-signatures</button>
        <button ion-item (click)="goto('review')" style="background-color: #1E2124"> <ion-icon name="ios-videocam"></ion-icon>&nbsp;&nbsp; View Video Proof</button>
        <button ion-item (click)="documentRemove()" style="background-color: #1E2124"> <ion-icon name="md-trash"></ion-icon>&nbsp;&nbsp; Delete</button>
      </ion-list>
    </div>
    `
  })
  export class OptionsPopoverPage {
    doc: any;
    constructor(
      public viewCtrl: ViewController, 
      public documentService: DocumentService, 
      private toastCtrl: ToastController,
      private nav: NavController,
      public appCtrl: App,
      public navParams: NavParams,
      private menuCtrl: MenuController
    ) {
        // this.doc = this.viewCtrl.data.selectedDoc;
        this.doc = this.navParams.get('selectedDoc');
    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    async documentRemove(selectedDocument){
        let d  = this.navParams.get('selectedDoc');
        await this.documentService.setCurrentDoc(d.guid);
        setTimeout( async ()=>{
          await this.documentService.removeDocument( d );
          let toast = this.toastCtrl.create({
            message: 'Document deleted!',
            duration: 1600,
            position: 'top'
          });
          toast.present();        
          this.viewCtrl.dismiss();
          window.location.hash = '';
          window.location.reload();
        }, 200 );
      
    }

    async goto(page){
      let d  = this.navParams.get('selectedDoc');
      await this.documentService.setCurrentDoc(d.guid);
      //this.menuCtrl.close();
      // this.appCtrl.getRootNav().push(page, {
      //   guid: d.guid
      // });
      //this.viewCtrl.dismiss();
      setTimeout( async ()=>{
        window.location.replace("/#/"+page+"/" + d.guid);
        window.location.reload();
      }, 1000);
     
    }

  }