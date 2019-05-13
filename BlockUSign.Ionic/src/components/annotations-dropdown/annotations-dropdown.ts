import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { DocumentService } from '../../services/document.service';
declare let dragOn:any;

@Component({
  selector: 'annotations-dropdown',
  templateUrl: 'annotations-dropdown.html'
})
export class AnnotationsDropdownComponent {

  text: string;

  constructor(
    public viewCtrl: ViewController,
    public documentService: DocumentService,
    ) {
    console.log('Hello AnnotationsDropdownComponent Component');
    this.text = 'Hello World';
  }

  close(url) {
    this.documentService.currentAnnotationUrl = url;
    //this.viewCtrl.dismiss();
  }

}
