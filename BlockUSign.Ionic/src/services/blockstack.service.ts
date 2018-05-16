import { Injectable } from '@angular/core';
import { Document, Log, Message } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AnonymousSubject } from 'rxjs/Subject';
import { Events } from 'ionic-angular';
declare let blockstack: any;

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BlockStackService {

  public picCache = [];

  constructor(
    public events: Events,
    public http: Http
  ) {

  }

  async getPicUrl(userId) {
    
    // placeholder
    let picUrl = "http://www.gravatar.com/avatar/?d=identicon";
    if (!userId){
      return picUrl;
    }

    // get from cache
    let isInCache = this.picCache.filter(item => item.id === userId)[0];
    if (isInCache){
      return this.picCache.filter(item => item.id === userId)[0].pic;
    }

    // get from server
    let resp = await this.http.get("https://core.blockstack.org/v1/search?query=" + userId).toPromise();
    let respObj = JSON.parse (resp.text() );
    if ( respObj.results.length > 0 ){
      picUrl = respObj.results[0].profile.image[0].contentUrl
    }
    this.picCache.push({
      id: userId,
      pic: picUrl
    });
    return picUrl;

  }



}
