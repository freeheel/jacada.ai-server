
import axios from 'axios';
// @ts-ignore
import LOG = require('../../../util/logging');
const log = LOG.log('Facebook Profile Helper');

class FacebookProfile {
  firstname: string;
  lastname: string;
  picUrl: string;
  id: string;

  constructor(firstname: string, lastname: string, picUrl: string, id: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.picUrl = picUrl;
    this.id = id;
  }

}

export default class FacebookProfileHelper {

  private _endPointUrl : string = '';

  constructor(apiToken: string) {
    this._endPointUrl = 'https://graph.facebook.com/v2.6/%s?access_token=' + apiToken;
  }

  readProfile(id: string): Promise<FacebookProfile> {

    log.info('Getting profile for %s', id);

    return new Promise<FacebookProfile>((resolve, reject) => {

      //const endPoint =

      axios.get(this._endPointUrl.replace('%s', id)).then(res => {

        log.info('Got fb profile: %s', res.data);

        resolve(new FacebookProfile(res.data.first_name, res.data.last_name, res.data.profile_pic, res.data.id));

      }).catch((err) => {
        reject(err);
      });

    });
  }
}
