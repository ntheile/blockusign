import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FeatureProvider } from '../../providers/feature/feature';
import { initDomAdapter } from '@angular/platform-browser/src/browser';


@IonicPage()
@Component({
  selector: 'page-features-modal',
  templateUrl: 'features-modal.html',
})
export class FeaturesModalPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public featureService: FeatureProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeaturesModalPage');
    this.init();
  }

  init(){
 
  }

  dismiss() {
    this.featureService.putMyFeatures();
    this.viewCtrl.dismiss();
  }

}
