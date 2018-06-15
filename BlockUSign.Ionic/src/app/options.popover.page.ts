import { Component, ViewChild } from "@angular/core";
import { ViewController, NavController} from "ionic-angular";
import { DocumentService } from './../services/document.service';
import { ToastController } from 'ionic-angular';

@Component({
    template: `
     <br/>
      <ion-list style="">
        <button ion-item (click)="documentRemove()"> <ion-icon name="md-trash"></ion-icon>&nbsp;&nbsp; Delete</button>
        <button ion-item (click)="close()"> <ion-icon name="md-close-circle"></ion-icon>&nbsp;&nbsp; Close</button>
      </ion-list>
    `
  })
  export class OptionsPopoverPage {
    doc: any;
    constructor(
      public viewCtrl: ViewController, 
      public documentService: DocumentService, 
      private toastCtrl: ToastController,
      private nav: NavController
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

  }