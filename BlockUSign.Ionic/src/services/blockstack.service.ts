import { Injectable } from '@angular/core';
import { Document, Log, Message } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AnonymousSubject } from 'rxjs/Subject';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operator/delay';
declare let blockstack: any;

@Injectable()
export class BlockStackService {

  public picCache = [];
  public blockusignProfileUrl = "blockusign.profile.json";
  public profile;

  constructor(
    public events: Events,
    public http: Http
  ) {

  }

  async searchUser(user) {
    // get from server
    let resp = await this.http.get("https://core.blockstack.org/v1/search?query=" + user).map(r => r.json().results).toPromise();
    return resp;
  }

  async getPicUrl(userId) {

    // placeholder
    let picUrl = "http://www.gravatar.com/avatar/?d=identicon";
    try {
      if (!userId) {
        return picUrl;
      }

      // get from cache
      let isInCache = this.picCache.filter(item => item.id === userId)[0];
      if (isInCache) {
        return this.picCache.filter(item => item.id === userId)[0].pic;
      }

      // get from server
      let resp = await this.http.get("https://core.blockstack.org/v1/search?query=" + userId).toPromise();
      let respObj = JSON.parse(resp.text());
      if (respObj.results.length > 0) {
        picUrl = respObj.results[0].profile.image[0].contentUrl
      }
      this.picCache.push({
        id: userId,
        pic: picUrl
      });
    }
    catch (e) {
      console.log('Unable to getpic url')

    }

    return picUrl;

  }


  async getProfileData() {
  
    // this.clearProfileData();
  
    let profileData = await blockstack.getFile(this.blockusignProfileUrl, { decrypt: false });

    let myProfile = JSON.parse(profileData);
    if (myProfile) {
      this.profile = myProfile
    }

    return profileData;
  }

  async setProfileData(email) {
    
    let storagePath = blockstack.loadUserData().profile.apps[window.location.origin];
    let json = {
      email: email,
      storagePath: storagePath,
      appPublicKey: await this.getAppPublicKey()
    }
    return await blockstack.putFile(this.blockusignProfileUrl, JSON.stringify(json), { encrypt: false });
  }

  async clearProfileData() {
    
    let json = {
    
    }
    return await blockstack.putFile(this.blockusignProfileUrl, JSON.stringify(json), { encrypt: false });
  }

  async getAppPublicKey(){
    var myPublicKey  = await blockstack.getPublicKeyFromPrivate(blockstack.loadUserData().appPrivateKey);
    return myPublicKey;
  }

}
