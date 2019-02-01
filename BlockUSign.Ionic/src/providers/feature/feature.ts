import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeaturesModalPage } from '../../pages/features-modal/features-modal';
declare let blockstack: any;

@Injectable()
export class FeatureProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FeatureProvider Provider');
  }

  features = ['videoproofs', 'cameraupload'];
  featuresNotSeen = [];

  async getFeaturesToShow(){

    // get the features i've already seen
    let respFeaturesIveSeen = await this.getMyFeaturesIveSeen();
    if (!respFeaturesIveSeen) return null;

    // return the diff
    let featuresNotSeen = [];
    this.features.forEach(feature => {
      if ( !respFeaturesIveSeen.includes(feature)  ){
        featuresNotSeen.push(feature);
      }
    });

    this.featuresNotSeen = featuresNotSeen;
    return this.featuresNotSeen;
  }

  async getMyFeaturesIveSeen(){

    let resp = null;
    let err = false;
    try{
      resp = await blockstack.getFile('features.json', {decrypt: false});
      if(resp){
        resp = JSON.parse(resp);
      } else{
        err = true
      }
    } catch(e){
      // if 404 not found then show new features and show modal
      err = true;
    }

    if (err){
      resp = await this.putMyFeatures();
      resp = [];
    }

    return resp;
  }

  async putMyFeatures(){
    let resp = null;
    try{
      //resp = blockstack.putFile('features.json', JSON.stringify(this.features), {encrypt: false});
    } catch(e){
      return null;
    }
    return resp;
  }

}


