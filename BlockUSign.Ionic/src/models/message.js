import Model from 'radiks/lib/model';
import moment from 'moment';

export default class Message extends Model {
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

  ago() {
    return moment( Date.now() ).fromNow();
  }
}
