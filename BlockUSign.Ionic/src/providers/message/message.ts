import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Model from 'radiks/lib/model';
import moment from 'moment';


/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

 

  constructor(public http: HttpClient) {
    console.log('Hello MessageProvider Provider');
  }

  async createMessage(){

    

    // let m = new Message({
    //   content: 'zzzzzzzzz',
    //   createdBy: 'nicktee.id'
    // });

  
    
    // let resp = await m.save();

    // @ts-ignore
    const msg = await Message.findById('4a2e41f6a3d6-43c8-a8c9-6500a76237cb');
    let a = 1;
  }

}

class Message extends Model {
  static className = 'Message';


  static schema = {
    content: {
      type: String,
      decrypted: true,
    },
    createdBy: {
      type: String,
      decrypted: true,
    }
  }

  constructor(_schema: any){
      super(_schema);
  }

  save(){
    
  };

  ago() {
    return moment( Date.now() ).fromNow();
  }
}
