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



  constructor(
    public events: Events,
    public http: Http
  ) {

  }

  async getPic(userId) {
    let resp = await this.http.get("https://core.blockstack.org/v1/search?query=" + userId.replace('.id', '')).toPromise();
    return resp;
  }



}
