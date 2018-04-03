import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var $: any;
declare var window: any;

@Injectable()
export class SlackService {

    baseUrl = window.apiUrl + "/api/slack"; //"https://hooks.slack.com/services/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";


    constructor(private http: Http, private jsonp: Jsonp) {

    }


    async sendAlert( msg ) {
        return await this.http.get(this.baseUrl + "/" + msg).toPromise();
    }



}