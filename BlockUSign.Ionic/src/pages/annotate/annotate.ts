import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Segment } from 'ionic-angular';
import { DocumentService } from '../../services/document.service';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

declare var $: any;
declare var window: any;
declare var blockstack: any;

/// https://www.sitepoint.com/custom-pdf-rendering/
@IonicPage({
  name: 'AnnotatePage',
  segment: 'annotate/:guid',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-annotate',
  templateUrl: 'annotate.html',
  styles: ['annotate.scss']
})
export class AnnotatePage {


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public documentService: DocumentService) {
    

  }

  ionViewDidLoad() {


  }

}
