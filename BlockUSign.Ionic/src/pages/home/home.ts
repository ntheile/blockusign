import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import moment from 'moment-timezone';
import 'rxjs/add/operator/toPromise';
import { LoadingController } from 'ionic-angular';
declare var window: any;




@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

  

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        
    ) {
       
    }

}


