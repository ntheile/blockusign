import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AnonymousSubject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operator/delay';
import { Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

declare let global: any;
//declare let bitcore: any;
declare let blockstack: any;
declare let bitcoin: any;
declare let window: any;
declare let parseZoneFile: any;

@Injectable()
export class BitcoinService {

    // insight;
    // bitcore;
    messageSigner;
    subdomainUrl =  'https://blockusign-subdomains.azurewebsites.net/'; //'http://localhost:3000/register/'; 

    // blockstack op_return and keys https://forum.blockstack.org/t/prove-two-parties-signed-a-copy-of-a-document-multi-sig-hash-op-return/6107/4
    // 
    constructor(
        private http: Http,
    ) {

       this.init();
        
    }

    init(){
        let bitcore;
        // const Insight = require('bitcore-explorers').Insight;
        const Message = require('bitcore-message');
        try {
            bitcore = require('bitcore-lib');
        } catch (err) {
            console.log('bitcore error: ', err)
            delete global._bitcore
            bitcore = require('bitcore-lib');
        }
        // this.insight = new Insight();
        this.messageSigner = Message;
        window.bitcoin = require('bitcoinjs-lib');
        window.bitcore = bitcore;
            
    }

      

  
    // sendTransaction(to, signer, signerKey, data) {
    //     this.insight.getUnspentUtxos(signer, (err, utxos) => {
    //         if (err) {
    //             // handle errors
    //         } else {
    //             // unspent outputs = satoshis: 200000000 
    //             // console.log(utxos);
    //             var tx = this.bitcore.Transaction();
    //             tx.from(utxos);
    //             tx.to(to, 500000);
    //             tx.change(signer);
    //             tx.addData(data);
    //             //tx.fee(50000);
    //             tx.sign(signerKey);

    //             //console.log(tx.toObject());

    //             // send
    //             this.insight.broadcast(tx.serialize(), (err, returnedTxId) => {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log('success - ' + returnedTxId);
    //                 }
    //             });

    //         }
    //     });
    // }

    getWif(){
        return blockstack.hexStringToECPair(blockstack.loadUserData().appPrivateKey + '01').toWIF();
    }

    getAppBitcoinAddress(){
        return this.getAppPrivateKeyCompressed().toAddress();
    }

    getAppPrivateKeyCompressed(){
        return window.bitcore.PrivateKey.fromWIF( this.getWif() ); // c8c2298ea50c2dc3b8e9d92377b8677f03c6eeed98dab299c630ab7e3e5c9b33
    }

    // This will validate that a given username's owner address is associated with
    //   the given app address 
    fetchProfileValidateAppAddress(username, appAddress, appOrigin) {
        return this.getProfileJWT(username)
            .then((response) => {
                const jwt = response.profileJWT
                const ownerAddress = response.owner
                // this verifies that the token is signed by the owner address
                const profile = blockstack.verifyProfileToken(jwt, ownerAddress)
                    .payload.claim
                if (!profile.apps)
                    throw new Error('No app entry in this profile! Validation fails.')
                if (!profile.apps[appOrigin])
                    throw new Error(`No entry for ${appOrigin} in profile! Validation fails.`)
                const appUrl = profile.apps[appOrigin]
                // make sure that the address in the gaia url for the app matches
                //     the provided app address
                const matches = appUrl.match(/([13][a-km-zA-HJ-NP-Z0-9]{26,35})/)
                if (!matches)
                    throw new Error('Failed to parse address out of app url!')

                const expectedAppAddress = matches[matches.length - 1]
                if (expectedAppAddress !== appAddress) {
                    throw new Error(`Expected app address ${expectedAppAddress} does not match provided ${appAddress}`)
                }

                return { username, appAddress, appOrigin, profileJWT: jwt, ownerAddress }

            })
    }

    // Fetch the most recent profile object for a user.
    //   Unfortunately, you need to do this manually, as lookupProfile() doesn't return the
    //   full JSON web token, which you need to perform the verification.
    getProfileJWT(username) {
        return blockstack.config.network.getNameInfo(username)
            .then((responseJSON) => {
                if (responseJSON.zonefile && responseJSON.address) {
                    // let zoneFile = responseJSON.zonefile.slice(length, length - 2);
                    let zoneFile = responseJSON.zonefile;
                    const zoneFileJSON = parseZoneFile(zoneFile)
                    const profileURL = blockstack.getTokenFileUrl(zoneFileJSON)
                    return fetch(profileURL)
                        .then((resp) => resp.json())
                        .then((profileJWT) => ({
                            owner: responseJSON.address,
                            profileJWT: profileJWT[0].token
                        }))
                } else {
                    throw new Error('Name information did not return zonefile.')
                }
            })
    }


    signMessage(messageToSign, wif ){
        let privateKey = window.bitcore.PrivateKey.fromWIF(wif);
        let signature = this.messageSigner(messageToSign).sign(privateKey);
        return signature;
    }

    verifyMessage(messageToVerify, address, signature){
        let verified = this.messageSigner(messageToVerify).verify(address, signature);
        return verified;
    }

    async sendSudomainBatch(fileName, appAddress, hash, signature, profileUrl) { 
        
       
        
        let origin = '$ORIGIN ' + fileName + '\n$TTL 3600\n_https._tcp URI 10 1 \"' + profileUrl + '\"\n'; 
        let hashTXT = 'hash TXT \"' + hash + '\"\n';
        let signatureTXT = 'signature TXT \"' + signature + '\"\n';
        let ownerTXT = 'owner TXT \"' + appAddress + '\"\n';
        let zonefile = origin + hashTXT + signatureTXT + ownerTXT;
        let privateKey = new window.bitcore.PrivateKey();
        let burnAddress = privateKey.toAddress().toString();

        let json = {
            "zonefile": zonefile,
             "name": fileName , 
             // "owner_address": appAddress  // think about what to add here, the transation lasts forever and shold never be name_updated, so it could be a burn address
            "owner_address": burnAddress,
        }

        let httpOptions = new RequestOptions();
        httpOptions.headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': 'bearer 9922b2c7-8258-4ff9-8ff1-19f1f9f0148a'
            }
        );
        
        let resp = await this.http.post(this.subdomainUrl + "register/", json, httpOptions).toPromise();
        return resp;
    }

    async getSubdomainsStatus(fileGuid){
        let resp = await this.http.get(this.subdomainUrl + 'status/' + fileGuid).toPromise();
        return resp;
    }

    async getZoneFileStatus(fileGuid){
        let resp = await this.http.get('https://core.blockstack.org/v1/names/' + fileGuid + '.blockusign1.id').toPromise();
        return resp;
    }

    async getZoneFileLastTxIx(fileGuid){
        let resp = await this.http.get('https://core.blockstack.org/v1/names/blockusign1.id').toPromise();
        return resp.json().last_txid;
    }

}

