import { Component, Input, ViewChild } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { DocumentService } from '../../services/document.service';
import { BlockPdfComponent } from '../block-pdf/block-pdf';
declare let $: any;

/**
 * Generated class for the BlockStepsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'block-steps',
  templateUrl: 'block-steps.html'
})
export class BlockStepsComponent {

  @Input() activeStep;
  @Input() parent;
  text: string;

  constructor(
    private nav: NavController, 
    private documentService: DocumentService,
   
  ) {
    
    this.text = 'Hello World';
  }

  route(page){

    $('.block-pdf-page').empty();

    this.nav.push(page, {
      guid: this.documentService.currentDoc.guid
    });
  }

 

}
