import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { DocumentService } from './../services/document.service';
import { ToastController } from 'ionic-angular';

@Component({
    template: `
     <br/>
      <ion-list style="">
        <button ion-item (click)="documentRemove()">Delete</button>
        <button ion-item (click)="close()">CLOSE X</button>
      </ion-list>
    `
  })
  export class OptionsPopoverPage {
    
    doc: any;

    constructor(public viewCtrl: ViewController, public documentService: DocumentService, private toastCtrl: ToastController) {
        this.doc = this.viewCtrl.data.selectedDoc;

    }
  
    close() {
      this.viewCtrl.dismiss();
    }

    async documentRemove(selectedDocument){
        await this.documentService.removeDocument( this.doc );
        let toast = this.toastCtrl.create({
            message: 'Document deleted!',
            duration: 3000,
            position: 'middle'
          });
        toast.present();
        
        this.viewCtrl.dismiss();
    }

  }