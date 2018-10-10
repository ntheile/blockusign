import { Injectable } from '@angular/core';
declare let global: any;
declare let bitcore: any;
declare let blockstack: any;
declare let bitcoin: any;
declare let window: any;
declare let parseZoneFile: any;



@Injectable()
export class BitcoinService {

    insight;
    bitcore;
    messageSigner;

    // blockstack op_return and keys https://forum.blockstack.org/t/prove-two-parties-signed-a-copy-of-a-document-multi-sig-hash-op-return/6107/4
    // 
    constructor() {
        const Insight = require('bitcore-explorers').Insight;
        const Message = require('bitcore-message');
        try {
            this.bitcore = require('bitcore-lib');
        } catch (err) {
            delete global._bitcore
            this.bitcore = require('bitcore-lib');
        }
        this.insight = new Insight();
        this.messageSigner = Message;
        window.bitcoin = require('bitcoinjs-lib');
        window.bitcore = this.bitcore;
    }

    sendTransaction(to, signer, signerKey, data) {
        this.insight.getUnspentUtxos(signer, (err, utxos) => {
            if (err) {
                // handle errors
            } else {
                // unspent outputs = satoshis: 200000000 
                // console.log(utxos);
                var tx = this.bitcore.Transaction();
                tx.from(utxos);
                tx.to(to, 500000);
                tx.change(signer);
                tx.addData(data);
                //tx.fee(50000);
                tx.sign(signerKey);

                //console.log(tx.toObject());

                // send
                this.insight.broadcast(tx.serialize(), (err, returnedTxId) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('success - ' + returnedTxId);
                    }
                });

            }
        });
    }

    getWif(){
        return blockstack.hexStringToECPair(blockstack.loadUserData().appPrivateKey + '01').toWIF();
    }

    getAppBitcoinAddress(){
        return this.getAppPrivateKeyCompressed().toAddress();
    }

    getAppPrivateKeyCompressed(){
        return bitcore.PrivateKey.fromWIF( this.getWif() ); // c8c2298ea50c2dc3b8e9d92377b8677f03c6eeed98dab299c630ab7e3e5c9b33
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
        let privateKey = this.bitcore.PrivateKey.fromWIF(wif);
        let signature = this.messageSigner(messageToSign).sign(privateKey);
        return signature;
    }

    verifyMessage(messageToVerify, address, signature){
        let verified = this.messageSigner(messageToVerify).verify(address, signature);
        return verified;
    }

    //  subdomain command
    // $ curl -X POST -H 'Authorization: bearer API-KEY-IF-USED' 
    // -H 'Content-Type: application/json' 
    // --data '{"zonefile": "$ORIGIN spqr\n$TTL 3600\n_https._tcp URI 10 1 \"https://gaia.blockstack.org/hub/1HgW81v6MxGD76UwNbHXBi6Zre2fK8TwNi/profile.json\"\n", "name": "spqr", "owner_address": "1HgW81v6MxGD76UwNbHXBi6Zre2fK8TwNi"}' 
    // http://localhost:3000/register/
    makeBatch() { 
        // let batchData = {
        //     "zonefile": "$ORIGIN spqr\n$TTL 3600\n_https._tcp URI 10 1 \"https://gaia.blockstack.org/hub/1HgW81v6MxGD76UwNbHXBi6Zre2fK8TwNi/profile.json\"\n", 
        //     "name": "spqr", 
        //     "owner_address": "1HgW81v6MxGD76UwNbHXBi6Zre2fK8TwNi"
        // }
    }


}

