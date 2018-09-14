"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const bluebird_1 = __importDefault(require("bluebird"));
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
        return new bluebird_1.default((resolve, reject) => {
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
        return new bluebird_1.default(((resolve, reject) => {
            let body;
            if (message.text) {
                body = {
                    text: message.text,
                    variables: {}
                };
            }
            else if (message.formData) {
                body = {
                    conversationActionDto: {
                        actionName: 'CONTINUE_FLOW',
                    },
                    variables: {},
                    inputParameters: {}
                };
                message.formData.map((formData) => {
                    body.inputParameters[formData.key] = formData.value;
                });
            }
            else {
                reject('Not yet implemented. Expecting a text property in the message');
            }
            // append additional variables if available
            this.additionalParams.map((param) => {
                body.variables[param.key] = param.value;
            });
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
                        console.log(JSON.stringify(data.data));
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
}
exports.default = InteractService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQVUvQixNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxPQUFPLElBQUksa0JBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUdyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQy9CLE9BQU8sTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDbkM7WUFFRCxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsRUFBRSxFQUFFLEVBQUU7Z0JBQzFHLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRO29CQUNoQyxrQkFBa0Is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dCBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuXG4vKipcbiAqIFNpbXBsZSBBcGkgaGVscGVyIGNsYXNzIHRvIHNlbmQgdGhlIGFqYXhcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElIYXNoIHtcbiAgW21hcHBpbmc6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlcXVlc3RCYXNlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYXBpQWlLZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBlbnZpcm9ubWVudDogc3RyaW5nO1xuICBwcml2YXRlIHRlbmFudElkOiBzdHJpbmc7XG4gIHByaXZhdGUgZG9tYWluTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdO1xuXG4gIHByaXZhdGUgc2Vzc2lvbk1hcDogSUhhc2ggPSB7fTtcblxuICBjb25zdHJ1Y3Rvcih0ZW5hbnRJZDogc3RyaW5nID0gJ25scGRlbW9zZGYnLCBhcGlLZXk6IHN0cmluZyA9ICcyMTAxZTRhNC04Y2QyLTQ0MTMtYjM4OS1hMjc2MDc3ZTIzMDYnLCBlbnZpcm9ubWVudDogc3RyaW5nID0gJ0RldicsIGRvbWFpbk5hbWU6IHN0cmluZyA9ICdEQ01fVGVsY28nLCBhZGRpdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIHRoaXMucmVxdWVzdEJhc2VVcmwgPSAnaHR0cHM6Ly9nb2ludGVyYWN0LmlvL2ludGVyYWN0L3ZlcnNpb24vMS9hY2NvdW50Lyc7XG4gICAgdGhpcy5hcGlBaUtleSA9IGFwaUtleTtcbiAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgdGhpcy50ZW5hbnRJZCA9IHRlbmFudElkO1xuICAgIHRoaXMuZG9tYWluTmFtZSA9IGRvbWFpbk5hbWU7XG4gICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcztcbiAgICAvLyBUT0RPIHRoaXMuYm90UmVzcG9uc2VUcmFuc2Zvcm1hdG9yID0gbmV3IEJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvcigpO1xuXG4gIH1cblxuICBzdGFydENvbnZlcnNhdGlvbihleHRlcm5hbElkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXG4gICAgICBpZiAodGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoJ2FscmVhZHkgZXhpc3RpbmcnKTtcbiAgICAgIH1cblxuICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICcvc3RhcnQnLCB7fSwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG5cbiAgICAgIH0pLnRoZW4oKHN0YXJ0UmVzcG9uc2U6IGFueSkgPT4ge1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSA9IHN0YXJ0UmVzcG9uc2UuZGF0YS5zZXNzaW9uSWQ7XG5cbiAgICAgICAgcmVzb2x2ZShzdGFydFJlc3BvbnNlLmRhdGEuc2Vzc2lvbklkKTtcblxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxuICBzZW5kTWVzc2FnZShleHRlcm5hbElkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBsZXQgYm9keTogYW55O1xuICAgICAgaWYgKG1lc3NhZ2UudGV4dCkge1xuICAgICAgICBib2R5ID0ge1xuICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICB2YXJpYWJsZXM6IHtcblxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZm9ybURhdGEpIHtcbiAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdDT05USU5VRV9GTE9XJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZhcmlhYmxlczoge30sXG4gICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIG1lc3NhZ2UuZm9ybURhdGEubWFwKChmb3JtRGF0YSA6IGFueSkgPT4ge1xuICAgICAgICAgIGJvZHkuaW5wdXRQYXJhbWV0ZXJzW2Zvcm1EYXRhLmtleV0gPSBmb3JtRGF0YS52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm90IHlldCBpbXBsZW1lbnRlZC4gRXhwZWN0aW5nIGEgdGV4dCBwcm9wZXJ0eSBpbiB0aGUgbWVzc2FnZScpXG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGVuZCBhZGRpdGlvbmFsIHZhcmlhYmxlcyBpZiBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkaXRpb25hbFBhcmFtcy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgIGJvZHkudmFyaWFibGVzW3BhcmFtLmtleV0gPSBwYXJhbS52YWx1ZTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIGlmICghdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb252ZXJzYXRpb24oZXh0ZXJuYWxJZCkudGhlbigoY29udmVyc2F0aW9uSWQpID0+IHtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IGNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgY29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpKTtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5kYXRhKTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkudmFyaWFibGVzLmNsaWVudENvbnZlcnNhdGlvbklkID0gdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdO1xuXG4gICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgYm9keS52YXJpYWJsZXMuY2xpZW50Q29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcbiAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEuZGF0YSkpO1xuXG4gICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKlxuXG4gICAgICBlbHNlIGlmIChtZXNzYWdlLmRhdGEpIHtcblxuICAgICAgICAgIC8vIGJ1aWxkIGFjdGlvbiBtZXNzYWdlIVxuICAgICAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6IG1lc3NhZ2UuZGF0YS5hY3Rpb24sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgICB9O1xuICAgICAgICAgIHBheWxvYWQuaW5wdXRQYXJhbWV0ZXJzW21lc3NhZ2UuZGF0YS5wYXlsb2FkLmtleV0gPSBtZXNzYWdlLmRhdGEucGF5bG9hZC52YWx1ZTtcbiAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UucXVldWVkRm9ybURhdGEpIHtcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uQWN0aW9uRHRvOiB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnQ09OVElOVUVfRkxPVycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgXy5lYWNoKG1lc3NhZ2UucXVldWVkRm9ybURhdGEsIChkYXRhLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgcGF5bG9hZC5pbnB1dFBhcmFtZXRlcnNba2V5XSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG5cbiAgICAgIH1cblxuICAgICAgKi9cblxuXG4gICAgfSkpO1xuXG4gIH1cblxuICAvKlxuXG4gIHF1ZXVlRm9ybURhdGEoZGF0YSkge1xuXG4gICAgICBpZiAoIXRoaXMucXVldWVkRm9ybURhdGEpIHtcbiAgICAgICAgICB0aGlzLnF1ZXVlZEZvcm1EYXRhID0ge307XG5cbiAgICAgICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuY29tcG9zZXJJbnB1dFR5cGVzLkFERF9GT1JNX0RBVEEpO1xuXG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXVlZEZvcm1EYXRhW2RhdGEuc2VjdGlvbi5pZF0gPSBkYXRhO1xuXG4gIH1cblxuICBxdWV1ZUltYWdlRGF0YShkYXRhKSB7XG4gICAgICB0aGlzLnF1ZXVlZEltYWdlVXBsb2FkRGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXRGb3JtRGF0YSgpIHtcbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIHF1ZXVlZEZvcm1EYXRhOiB0aGlzLnF1ZXVlZEZvcm1EYXRhXG4gICAgICB9KS50aGVuKCgpID0+IHtcblxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuXG4gICAgICB9KTtcbiAgfVxuXG4gIHN1Ym1pdEltYWdlRGF0YShldmVudCkge1xuICAgICAgLy8gVE9ETyB3ZSB3aWxsIHN0b3JlIGl0IG9uY2UgdGhlIGFwaSBpcyBhdmFpbGFibGUuIEZvciBub3cgaXTCtHMgb25seSBpbiB0aGUgaGlzdG9yeVxuXG5cbiAgICAgIC8vIFRPRE8gY2hlY2sgaWYgc2VjdGlvbiBoYXMgbmF2aWdhdGlvblxuXG4gICAgICBpZiAoZXZlbnQucGFnZU5hdmlnYXRpb24ubmF2aWdhdGlvblJpZ2h0LmJ1dHRvbkFjdGlvbiA9PT0gJ0NPTlRJTlVFX0ZMT1cnKSB7XG5cbiAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgcXVldWVkRm9ybURhdGE6IFtdXG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE8gLSBqdXN0IGFkZCBhIHN0YW5kYXJkIHJlc3BvbnNlXG4gICAgICAgICAgdGhpcy5lbWl0KCdzeW5jaHJvbm91c0JvdFJlc3BvbnNlJywgW25ldyBTaW1wbGVUZXh0TW9kZWwoJ1RoYW5rcyBmb3IgdXBsb2FkaW5nIHRoZSBwaWN0dXJlJywgJ2JvdCcpXSk7XG4gICAgICB9XG5cbiAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5kZWZhdWx0SW5wdXRUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZUZvcm1EYXRhKCkge1xuICAgICAgZGVsZXRlIHRoaXMucXVldWVkRm9ybURhdGE7XG5cbiAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5kZWZhdWx0SW5wdXRUeXBlKTtcblxuICB9XG5cbiAgaGFuZGxlU3luY2hyb25vdXNCb3RSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XG5cbiAgICAgIC8vIHRyYW5zZm9ybSByZXNwb25zZSB0byBiZSBoYW5kbGVkIGZ1cnRoZXIgaW4gdGhlIFVJLlxuICAgICAgbGV0IHVpTW9kZWwgPSB0aGlzLmJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvci50cmFuc2Zvcm0ocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgIHRoaXMuZW1pdCgnc3luY2hyb25vdXNCb3RSZXNwb25zZScsIHVpTW9kZWwpO1xuXG5cbiAgfVxuXG4gIGhhbmRsZUVycm9yQm90UmVzcG9uc2UoZXJyKSB7XG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XG4gICAgICBjb25zb2xlLndhcm4oJ0JvdCBlcnJvcicpO1xuXG4gICAgICAvLyB0cmFuc2Zvcm0gcmVzcG9uc2UgdG8gYmUgaGFuZGxlZCBmdXJ0aGVyIGluIHRoZSBVSS5cbiAgICAgIGxldCB1aU1vZGVsID0gW25ldyBTaW1wbGVUZXh0TW9kZWwoJ1dlIGFyZSBzb3JyeSwgYnV0IGFuIHVuZXhwZWN0ZWQgZXJyb3IgaGFwcGVuZWQuIFBsZWFzZSB0cnkgYWdhaW4uJywgJ2JvdCcpXTtcblxuICAgICAgdGhpcy5lbWl0KCdzeW5jaHJvbm91c0JvdFJlc3BvbnNlJywgdWlNb2RlbCk7XG4gIH1cbiovXG5cbn1cbiJdfQ==