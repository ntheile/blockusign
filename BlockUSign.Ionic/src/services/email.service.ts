import { Injectable } from '@angular/core';
import { Document } from './../models/models';
import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
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
export class EmailService {

  //url = "https://api.sendgrid.com/v3/mail/send";
  //apiK = "";
  url = "https://blockusign.co/api/email";
  //url = "http://localhost:5000/api/email";


  constructor(public events: Events, public http: Http) {

  }

  async sendEmail (to, subject, content) {

    if (!to || !subject || !content){
      alert('Must add an email address');
      return;
    }

    let data = {
      "to": to, 
      "subject": subject, 
      "content": content
    };
    let httpOptions = new RequestOptions();
    httpOptions.headers = new Headers(
      {
        'Content-Type': 'application/json'
      }
    );

    let resp = await this.http.post(this.url, JSON.stringify(data), httpOptions).toPromise();
    return resp;

  }
  
  catchError () {

  }

}
