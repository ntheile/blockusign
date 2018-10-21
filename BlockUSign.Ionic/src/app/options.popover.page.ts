import { Component, ViewChild } from "@angular/core";
import { ViewController, NavController, App, MenuController} from "ionic-angular";
import { DocumentService } from './../services/document.service';
import { ToastController } from 'ionic-angular';

@Component({
    template: `
    <div style="background-color: #1E2124">
     
     <br/>
      <ion-list style="background-color: #1E2124; margin: -1px 0 0px;">
       <button (click)="close()" style="float: right; background-color: #1E2124; margin-top: -10px; margin-bottom: -4px"> <ion-icon style="color: white; margin-top:-10px" name="md-close-circle"></ion-icon></button>
        <button ion-item (click)="goto('BlockchainPage')" style="background-color: #1E2124"> <ion-icon name="md-finger-print"></ion-icon>&nbsp;&nbsp; Verify on Blockchain</button>
        <button ion-item (click)="goto('SignPage')" style="background-color: #1E2124"> <ion-icon name="md-create"></ion-icon>&nbsp;&nbsp; View e-signatures</button>
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
      private menuCtrl: MenuController
    ) {
        this.doc = this.viewCtrl.data.selectedDoc;

    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    async documentRemove(selectedDocument){
        window.location.hash = '';
        await this.documentService.removeDocument( this.doc );
        let toast = this.toastCtrl.create({
            message: 'Document deleted!',
            duration: 3000,
            position: 'middle'
          });
        toast.present();
        
        this.viewCtrl.dismiss();

        window.location.hash = '';
    }

    async goto(page){
      this.viewCtrl.dismiss();
      this.menuCtrl.close();
      this.appCtrl.getRootNav().push(page, {
        guid: this.doc.guid
      });

    }

  }