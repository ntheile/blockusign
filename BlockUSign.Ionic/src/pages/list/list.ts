import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CryptoCompareService } from '../../services/cryptocompare.service'
import { HomePage } from '../home/home';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public cryptoCompareService: CryptoCompareService) {
   
    
  }

  ionViewDidLoad(){
  
  }
  
  

  
}
