import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var $: any;
declare var window: any;

@Injectable()
export class CryptoCompareService {

    baseUrl = "https://www.cryptocompare.com/api/data";

    apiUrl = window.apiUrl ; //http://localhost:5000 http://popbot2.azurewebsites.net

    url;

    currency = "BTC";

    aggregate = "1";

    constructor(private http: Http, private jsonp: Jsonp) {

    }

    public async getTopCoins() {

        let url = "https://api.coinmarketcap.com/v1/ticker/?limit=377";
        let response = await this.http.get(url).toPromise();

        let coinRefResponse = await this.http.get("https://min-api.cryptocompare.com/data/all/coinlist").toPromise();
        let coinsRef = coinRefResponse.json().Data;

        let topCoins = {};
        response.json().forEach(element => {
            let coinData = coinsRef[element.symbol];
            if (coinData) {
                coinData.rank = element.rank;
                topCoins[element.symbol] = coinData;
            }
            else {
                console.error("Cannot find " + element.symbol);
            }
        });



        return topCoins;
    }

    public async getSocialStats(coinId, limit) {

        if (!coinId)
            coinId = 306304;

        if (!limit)
            limit = 337;

        let api = "/socialstatshistohour/?aggregate=1&id=" + coinId + "&limit=" + limit;


        this.url = this.baseUrl + api;
        let response = await this.http.get(this.url).toPromise();

        return response;
    }


    async getCoins(coinLimit, histPriceLimit, socialLimit, currency, aggregate ) {

        this.currency = currency;
        this.aggregate = aggregate;

        if (!coinLimit) coinLimit = 10;

        if (!histPriceLimit) histPriceLimit = 24;

        if (!socialLimit) socialLimit = 24;


        return await this.http.get(this.apiUrl + "/api/coins?coinLimit=" + coinLimit + "&histPriceLimit="+ histPriceLimit + "&socialLimit=" + socialLimit + "&currency=" + this.currency + "&aggregate=" +  this.aggregate).toPromise();
       
    }



}