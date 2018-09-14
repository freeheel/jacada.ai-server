import axios from 'axios';
import Promise from "bluebird";

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

        this.sessionMap[externalId] = startResponse.data.sessionId;

        resolve(startResponse.data.sessionId);

      }).catch((err) => {
        reject(err);
      });

    });
  }

  sendMessage(externalId: string, message: any): Promise<any> {

    return new Promise<any>(((resolve, reject) => {

      let body: any;
      if (message.text) {
        body = {
          text: message.text,
          variables: {

          }
        };


      } else if (message.formData) {
        body = {
          conversationActionDto: {
            actionName: 'CONTINUE_FLOW',
          },
          variables: {},
          inputParameters: {}
        };

        message.formData.map((formData : any) => {
          body.inputParameters[formData.key] = formData.value;
        });

      } else {
        reject('Not yet implemented. Expecting a text property in the message')
      }

      // append additional variables if available
      this.additionalParams.map((param) => {
        body.variables[param.key] = param.value;
      });


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
            console.log(JSON.stringify(data.data));
            resolve(data.data);
          }).catch((err) => {
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

          console.log(JSON.stringify(data.data));

          resolve(data.data);
        }).catch((err) => {
          reject(err);
        });
      }

      /*

      else if (message.data) {

          // build action message!
          let payload = {
              conversationActionDto: {
                  actionName: message.data.action,
              },
              inputParameters: {}
          };
          payload.inputParameters[message.data.payload.key] = message.data.payload.value;
          body = JSON.stringify(payload);
      } else if (message.queuedFormData) {
          let payload = {
              conversationActionDto: {
                  actionName: 'CONTINUE_FLOW',
              },
              inputParameters: {}
          };

          _.each(message.queuedFormData, (data, key) => {
              payload.inputParameters[key] = data.value;
          });

          body = JSON.stringify(payload);

      }

      */


    }));

  }

  /*

  queueFormData(data) {

      if (!this.queuedFormData) {
          this.queuedFormData = {};

          MessageStore.emit('ModeChanged', ComposerInputTypes.composerInputTypes.ADD_FORM_DATA);

      }
      this.queuedFormData[data.section.id] = data;

  }

  queueImageData(data) {
      this.queuedImageUploadData = data;
  }

  submitFormData() {
      this.sendMessage({
          queuedFormData: this.queuedFormData
      }).then(() => {

      }).catch((err) => {

      });
  }

  submitImageData(event) {
      // TODO we will store it once the api is available. For now it´s only in the history


      // TODO check if section has navigation

      if (event.pageNavigation.navigationRight.buttonAction === 'CONTINUE_FLOW') {

          this.sendMessage({
              queuedFormData: []
          }).then(() => {
          }).catch((err) => {
          });

      } else {
          // TODO - just add a standard response
          this.emit('synchronousBotResponse', [new SimpleTextModel('Thanks for uploading the picture', 'bot')]);
      }

      MessageStore.emit('ModeChanged', ComposerInputTypes.defaultInputType);
  }

  removeFormData() {
      delete this.queuedFormData;

      MessageStore.emit('ModeChanged', ComposerInputTypes.defaultInputType);

  }

  handleSynchronousBotResponse(response) {

      MessageStore.emit('ModeChanged', ComposerInputTypes.defaultInputType);

      // transform response to be handled further in the UI.
      let uiModel = this.botResponseTransformator.transform(response.data);

      this.emit('synchronousBotResponse', uiModel);


  }

  handleErrorBotResponse(err) {
      MessageStore.emit('ModeChanged', ComposerInputTypes.defaultInputType);
      console.warn('Bot error');

      // transform response to be handled further in the UI.
      let uiModel = [new SimpleTextModel('We are sorry, but an unexpected error happened. Please try again.', 'bot')];

      this.emit('synchronousBotResponse', uiModel);
  }
*/

}
