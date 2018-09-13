"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Promise = require("bluebird");
class InteractService {
    constructor(tenantId = 'nlpdemosdf', apiKey = '2101e4a4-8cd2-4413-b389-a276077e2306', environment = 'Dev', domainName = 'DCM_Telco', additionalParams) {
        this.sessionMap = {};
        this.requestBaseUrl = 'https://gointeract.io/interact/version/1/account/';
        this.apiAiKey = apiKey;
        this.environment = environment;
        this.tenantId = tenantId;
        this.domainName = domainName;
        this.additionalParams = additionalParams;
        // TODO this.botResponseTransformator = new BotResponseTransformator();
    }
    startConversation(externalId) {
        return new Promise((resolve, reject) => {
            if (this.sessionMap[externalId]) {
                return reject('already existing');
            }
            axios_1.default.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '/start', {}, {
                headers: {
                    'Tenant-Id': this.tenantId,
                    'Application-Key': this.apiAiKey,
                    'Environment-Name': this.environment,
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
            }).then((startResponse) => {
                this.sessionMap[externalId] = startResponse.data.sessionId;
                resolve(startResponse.data.sessionId);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    sendMessage(externalId, message) {
        return new Promise(((resolve, reject) => {
            let body;
            if (message.text) {
                body = {
                    text: message.text,
                    variables: {}
                };
                // append additional variables if available
                this.additionalParams.map((param) => {
                    body.variables[param.key] = param.value;
                });
                console.log(body);
            }
            else {
                reject('Not yet implemented. Expecting a text property in the message');
            }
            if (!this.sessionMap[externalId]) {
                this.startConversation(externalId).then((conversationId) => {
                    body.variables.clientConversationId = conversationId;
                    axios_1.default.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '?sessionId=' + conversationId, body, {
                        headers: {
                            'Tenant-Id': this.tenantId,
                            'Application-Key': this.apiAiKey,
                            'Environment-Name': this.environment,
                            'Content-Type': 'application/json'
                        },
                        responseType: 'json',
                    }).then((data) => {
                        resolve(data.data);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }
            else {
                body.variables.clientConversationId = this.sessionMap[externalId];
                axios_1.default.post(this.requestBaseUrl + this.tenantId + '/conversation/domains/' + this.domainName + '?sessionId=' + body.variables.clientConversationId, body, {
                    headers: {
                        'Tenant-Id': this.tenantId,
                        'Application-Key': this.apiAiKey,
                        'Environment-Name': this.environment,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'json',
                }).then((data) => {
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
}
exports.default = InteractService;
//# sourceMappingURL=InteractService.js.map