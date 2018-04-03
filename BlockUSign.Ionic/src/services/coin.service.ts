import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoinService {
    
    baseUrl = "https://min-api.cryptocompare.com/data/histohour?fsym=";

    coin = "IOT";

    symbol = "IOT";

    params = "&tsym=USD&limit=60&aggregate=3&e=CCCAGG";
    
    public url = "";

    constructor(private http: Http) { 

    }

   async getCoin(coin){

        this.coin = coin;
    
        this.url = this.baseUrl + this.coin + this.params;
        let response = await this.http.get(this.url).toPromise();

        return response;
    }

    async getAllCoins(){
        let resp = await this.http.get("https://min-api.cryptocompare.com/data/all/coinlist").toPromise();
        return resp;
    }
    
}