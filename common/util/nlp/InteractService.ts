import axios from 'axios';
import Promise from "bluebird";

// @ts-ignore
import LOG = require("../../util/logging");

const pLog = LOG.performanceLog();

/**
 * Simple Api helper class to send the ajax
 */

export interface IHash {
  [mapping: string]: string;
}

export default class InteractService {

  private requestBaseUrl: string;
  private apiAiKey: string;
  private environment: string;
  private tenantId: string;
  private domainName: string;
  private additionalParams: any[];

  private sessionMap: IHash = {};

  constructor(tenantId: string = 'nlpdemosdf', apiKey: string = '2101e4a4-8cd2-4413-b389-a276077e2306', environment: string = 'Dev', domainName: string = 'DCM_Telco', additionalParams: any[]) {
    this.requestBaseUrl = 'https://gointeract.io/interact/version/1/account/';
    this.apiAiKey = apiKey;
    this.environment = environment;
    this.tenantId = tenantId;
    this.domainName = domainName;
    this.additionalParams = additionalParams;
    // TODO this.botResponseTransformator = new BotResponseTransformator();

  }

  startConversation(externalId: string): Promise<any> {

    const pStart = Date.now();

    return new Promise((resolve, reject) => {


      if (this.sessionMap[externalId]) {
        return reject('already existing');
      }

      axios.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '/start', {}, {
        headers: {
          'Tenant-Id': this.tenantId,
          'Application-Key': this.apiAiKey,
          'Environment-Name': this.environment,
          'Content-Type': 'application/json'
        },
        responseType: 'json',

      }).then((startResponse: any) => {

        const stop = Date.now();

        pLog.log('start conversation', 'it took ' + (Date.now() - pStart) + 'ms');

        this.sessionMap[externalId] = startResponse.data.sessionId;

        resolve(startResponse.data.sessionId);

      }).catch((err) => {
        pLog.log('start conversation', 'error after ' + (Date.now() - pStart) + 'ms');

        reject(err);
      });

    });
  }

  sendMessage(externalId: string, message: any, spui: string): Promise<any> {

    const pStart = Date.now();

    return new Promise<any>(((resolve, reject) => {

      let body: any;
      if (message.text) {
        body = {
          text: message.text,
          variables: {}
        };


      } else if (message.formData) {
        body = {
          conversationActionDto: {
            actionName: 'CONTINUE_FLOW',
          },
          variables: {},
          inputParameters: {}
        };

        message.formData.map((formData: any) => {
          body.inputParameters[formData.key] = formData.value;
        });

      } else {
        reject('Not yet implemented. Expecting a text property in the message')
      }

      // append additional variables if available
      this.additionalParams.map((param) => {
        body.variables[param.key] = param.value;
      });

      // append spui if not null
      if (spui) {
        body.variables['spui'] = spui;
      }


      if (!this.sessionMap[externalId]) {
        this.startConversation(externalId).then((conversationId) => {
          body.variables.clientConversationId = conversationId;
          axios.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '?sessionId=' + conversationId, body, {
            headers: {
              'Tenant-Id': this.tenantId,
              'Application-Key': this.apiAiKey,
              'Environment-Name': this.environment,
              'Content-Type': 'application/json'
            },
            responseType: 'json',
          }).then((data) => {

            pLog.log('start conversation and send message', 'it took ' + (Date.now() - pStart) + 'ms');

            resolve(data.data);
          }).catch((err) => {

            pLog.log('start conversation and send message', 'error after ' + (Date.now() - pStart) + 'ms');

            reject(err);
          });
        });

      } else {
        body.variables.clientConversationId = this.sessionMap[externalId];

        axios.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '?sessionId=' + body.variables.clientConversationId, body, {
          headers: {
            'Tenant-Id': this.tenantId,
            'Application-Key': this.apiAiKey,
            'Environment-Name': this.environment,
            'Content-Type': 'application/json'
          },
          responseType: 'json',
        }).then((data) => {

          pLog.log('send message', 'it took ' + (Date.now() - pStart) + 'ms');

          resolve(data.data);
        }).catch((err) => {
          pLog.log('send message', 'error after ' + (Date.now() - pStart) + 'ms');
          reject(err);
        });
      }

    }));

  }

  resetSession(externalId: string): void {
    delete this.sessionMap[externalId];
  }

}
