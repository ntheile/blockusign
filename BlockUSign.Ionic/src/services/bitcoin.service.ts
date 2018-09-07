import { Injectable } from '@angular/core';
declare let global: any;
declare let bitcore: any;

@Injectable()
export class BitcoinService {

    insight;
    bitcore;
    

    constructor() {
        
        const Insight = require('bitcore-explorers').Insight;
        
        try {
            this.bitcore = require('bitcore-lib');
        } catch (err) {
            delete global._bitcore
            this.bitcore = require('bitcore-lib');
        }
        this.insight = new Insight('testnet');
    }

    sendTransaction(to, signer, signerKey, data){
        this.insight.getUnspentUtxos(signer,  (err, utxos) => {
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
                tx.fee(50000);
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

    
}

