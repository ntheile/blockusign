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
        let privateKey = new window.bitcore.PrivateKey(); // this makes it immutable, nobody nows this key to be able to update the subdomain
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

    // returns {subdomainId: stringID, status: stringSTATUS}
    // async getZoneFileBySubdomainGuid(subdomainName){
    //     let subdomainsStatus = await this.http.get('https://core.blockstack.org/v1/names/' + fileGuid + '.blockusign1.id').toPromise();
    //     console.log({subdomainId: subdomainName, status: subdomainsStatus.json().status})
    //     return {subdomainId: subdomainName, status: status};
    // }

    async getZoneFileStatus(fileGuid){
        let resp = await this.http.get('https://core.blockstack.org/v1/names/' + fileGuid + '.blockusign1.id').toPromise();
        return resp;
    }

    async getZoneFileLastTxIx(){
        let resp = await this.http.get('https://core.blockstack.org/v1/names/blockusign1.id').toPromise();
        return resp.json().last_txid;
    }




  // (1) Is propegated to Subdomains , get all zone files
  // Get all the zonefiles for the doc hash. Zonefiles represent one blockstack account who signed the hash. The second
  // user who signed the hash is prepended with 2 the third is prepended with 3 and so on up to 9 signers.
  // This is limited to only 9 signers because two digits would put it over the subdomains length limit for names when appended with
  // the document GUID (which is a pretty long string...maybe we can strip out the dashes in the future, maybe we append the alphabet to give us 26 more signers)
  async getAllZoneFileSubdomainStatusByGuid(guid) {
    let zonefiles = []; // subdomainId , status 
   
    for(let i = -1; i <= 9; i++)
    {
      let subdomainName = guid;
      if (i != -1) subdomainName = i + subdomainName;
      console.log('getting ' + subdomainName);
      try{
        let status = await this.getSubdomainsStatus(subdomainName);
        // if status is 404 then end of subdomains
        console.log(subdomainName, status);
        zonefiles.push({subdomainName: subdomainName, subdomainStatus: status});
      }
      catch(e){
        return zonefiles;
      }
    }
    return zonefiles;
  }

  // (2) Is Anchored to Bitcoin
  async getAnchoredToBitcoinStatusByZoneFiles(zoneFilesList){

    let lastTxId = await this.getZoneFileLastTxIx();

    for (let zonefile of zoneFilesList){
        let status = zonefile.subdomainStatus.json().status;
        if (status == 'Subdomain propagated'){  
            zonefile.btcTxStatus = `Subdomain propagated <a href="https://www.blockchain.com/btc/tx/` + lastTxId + `" target="_blank">` + lastTxId + `</a>`
           // on step 2
        }
        else if (status.includes('queued')){
          // this.onStep = "1";
          zonefile.btcTxStatus = status;
        }
        else{
          let words = status.split(' ');
          let txIndex = words.indexOf("transaction") + 1;
          let tx = words[txIndex];
          words[txIndex] = `<a href="https://www.blockchain.com/btc/tx/` + tx + `" target="_blank">` + tx + `</a>`
          zonefile.btcTxStatus = words.join(' ');
          // console.log(this.subdomainsStatus);
          // this.onStep = "2";
  
        }
    }

    return zoneFilesList;
  }

  // (3) Is propegated to Blockstack Atlas P2P

  async getBlockstackAtlasP2PStatusByZoneFile(zoneFilesList){

    for (let zonefile of zoneFilesList){


        try{
            let zoneFileStatusResp = await this.getZoneFileStatus(zonefile.subdomainName);
            if (zoneFileStatusResp){
              if (zoneFileStatusResp.json().zonefile){
                // this.zonefile = zoneFileStatusResp.json().zonefile;
                //this.isOnBlockchain = true;
                //this.onStep = "3";
                zonefile.zonefile = zoneFileStatusResp.json().zonefile;
                zonefile.isOnBlockchain = true;
              }
              else{
                zonefile.zonefile = null;
                zonefile.isOnBlockchain = false;
              }
    
            }
            else{
                zonefile.zonefile = null;
                zonefile.isOnBlockchain = false;
            }
        }
        catch (e){
            zonefile.zonefile = null;
            zonefile.isOnBlockchain = false;
        }   
        
    }

    return zoneFilesList;
    
  }

  // (4)
  async verifyAllZonfilesSignatures(zoneFilesList, localGaiaHash) {
    
    for (let zonefile of zoneFilesList){ 
        zonefile.verified = false;
        let zonefileJson = parseZoneFile(zonefile.zonefile);
        zonefile.zonefileJson = zonefileJson;
        zonefile.owner = zonefileJson.txt.find(f=> f.name == "owner").txt;
        let hash = zonefileJson.txt.find(n=>n.name === 'hash').txt;
        zonefile.hash = hash;
        let signature = zonefileJson.txt.find(n=>n.name === 'signature').txt;
        let owner = zonefileJson.txt.find(n=>n.name === 'owner').txt;
        let verifiedZonefileSignature = this.verifyMessage(hash, owner, signature);
        if (verifiedZonefileSignature && (hash === localGaiaHash) ){
            // whoami proof
            // associate the users app public key to his blockstack id
            // lookup users blockstack id based on app public key via the Blockstack Azure Search indexer
            let  blockstackName = await this.getBlockstackNameByAppPubKey(owner);
            if (blockstackName != ""){
                let profile =  await this.fetchProfileValidateAppAddress(blockstackName,owner, window.location.origin);
                if (profile){
                    if (profile.username){
                        console.log(profile.username + " VERIFIED!!!");
                        zonefile.verified = profile.username;
                    }
                }
            }
            else{
                // not a person
            }
            
        }
    }
    return zoneFilesList;
  }


  async getBlockstackNameByAppPubKey(appPubKey) {
    let blockstackName = "";
    try{
      let results = await this.http.get("https://blockusign-subdomains.azurewebsites.net/search/user/" + appPubKey).toPromise();
      if (results.json()) { 
           blockstackName = results.json()[0].fqu;
      }
      return blockstackName;
    }
    catch(e){ 
        console.error('failed to getBlockstackNameByAppPubKey ', e);
        return blockstackName;
    }
  }



}

