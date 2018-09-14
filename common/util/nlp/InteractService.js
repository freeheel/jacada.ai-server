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
    resetSession(externalId) {
        delete this.sessionMap[externalId];
    }
}
exports.default = InteractService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQVUvQixNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxPQUFPLElBQUksa0JBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUdyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQy9CLE9BQU8sTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDbkM7WUFFRCxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsRUFBRSxFQUFFLEVBQUU7Z0JBQzFHLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRO29CQUNoQyxrQkFBa0Is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LENBQUM7Q0FrRkY7QUF4UEQsa0NBd1BDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XHJcblxyXG4vKipcclxuICogU2ltcGxlIEFwaSBoZWxwZXIgY2xhc3MgdG8gc2VuZCB0aGUgYWpheFxyXG4gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUhhc2gge1xyXG4gIFttYXBwaW5nOiBzdHJpbmddOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0U2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgcmVxdWVzdEJhc2VVcmw6IHN0cmluZztcclxuICBwcml2YXRlIGFwaUFpS2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBlbnZpcm9ubWVudDogc3RyaW5nO1xyXG4gIHByaXZhdGUgdGVuYW50SWQ6IHN0cmluZztcclxuICBwcml2YXRlIGRvbWFpbk5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdO1xyXG5cclxuICBwcml2YXRlIHNlc3Npb25NYXA6IElIYXNoID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHRlbmFudElkOiBzdHJpbmcgPSAnbmxwZGVtb3NkZicsIGFwaUtleTogc3RyaW5nID0gJzIxMDFlNGE0LThjZDItNDQxMy1iMzg5LWEyNzYwNzdlMjMwNicsIGVudmlyb25tZW50OiBzdHJpbmcgPSAnRGV2JywgZG9tYWluTmFtZTogc3RyaW5nID0gJ0RDTV9UZWxjbycsIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdKSB7XHJcbiAgICB0aGlzLnJlcXVlc3RCYXNlVXJsID0gJ2h0dHBzOi8vZ29pbnRlcmFjdC5pby9pbnRlcmFjdC92ZXJzaW9uLzEvYWNjb3VudC8nO1xyXG4gICAgdGhpcy5hcGlBaUtleSA9IGFwaUtleTtcclxuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcclxuICAgIHRoaXMudGVuYW50SWQgPSB0ZW5hbnRJZDtcclxuICAgIHRoaXMuZG9tYWluTmFtZSA9IGRvbWFpbk5hbWU7XHJcbiAgICB0aGlzLmFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zO1xyXG4gICAgLy8gVE9ETyB0aGlzLmJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvciA9IG5ldyBCb3RSZXNwb25zZVRyYW5zZm9ybWF0b3IoKTtcclxuXHJcbiAgfVxyXG5cclxuICBzdGFydENvbnZlcnNhdGlvbihleHRlcm5hbElkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG5cclxuICAgICAgaWYgKHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSkge1xyXG4gICAgICAgIHJldHVybiByZWplY3QoJ2FscmVhZHkgZXhpc3RpbmcnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICcvc3RhcnQnLCB7fSwge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxyXG4gICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXHJcbiAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcclxuXHJcbiAgICAgIH0pLnRoZW4oKHN0YXJ0UmVzcG9uc2U6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF0gPSBzdGFydFJlc3BvbnNlLmRhdGEuc2Vzc2lvbklkO1xyXG5cclxuICAgICAgICByZXNvbHZlKHN0YXJ0UmVzcG9uc2UuZGF0YS5zZXNzaW9uSWQpO1xyXG5cclxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNlbmRNZXNzYWdlKGV4dGVybmFsSWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgbGV0IGJvZHk6IGFueTtcclxuICAgICAgaWYgKG1lc3NhZ2UudGV4dCkge1xyXG4gICAgICAgIGJvZHkgPSB7XHJcbiAgICAgICAgICB0ZXh0OiBtZXNzYWdlLnRleHQsXHJcbiAgICAgICAgICB2YXJpYWJsZXM6IHt9XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZm9ybURhdGEpIHtcclxuICAgICAgICBib2R5ID0ge1xyXG4gICAgICAgICAgY29udmVyc2F0aW9uQWN0aW9uRHRvOiB7XHJcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdDT05USU5VRV9GTE9XJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB2YXJpYWJsZXM6IHt9LFxyXG4gICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1lc3NhZ2UuZm9ybURhdGEubWFwKChmb3JtRGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICBib2R5LmlucHV0UGFyYW1ldGVyc1tmb3JtRGF0YS5rZXldID0gZm9ybURhdGEudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCgnTm90IHlldCBpbXBsZW1lbnRlZC4gRXhwZWN0aW5nIGEgdGV4dCBwcm9wZXJ0eSBpbiB0aGUgbWVzc2FnZScpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFwcGVuZCBhZGRpdGlvbmFsIHZhcmlhYmxlcyBpZiBhdmFpbGFibGVcclxuICAgICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zLm1hcCgocGFyYW0pID0+IHtcclxuICAgICAgICBib2R5LnZhcmlhYmxlc1twYXJhbS5rZXldID0gcGFyYW0udmFsdWU7XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIGlmICghdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbnZlcnNhdGlvbihleHRlcm5hbElkKS50aGVuKChjb252ZXJzYXRpb25JZCkgPT4ge1xyXG4gICAgICAgICAgYm9keS52YXJpYWJsZXMuY2xpZW50Q29udmVyc2F0aW9uSWQgPSBjb252ZXJzYXRpb25JZDtcclxuICAgICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgY29udmVyc2F0aW9uSWQsIGJvZHksIHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxyXG4gICAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxyXG4gICAgICAgICAgICAgICdFbnZpcm9ubWVudC1OYW1lJzogdGhpcy5lbnZpcm9ubWVudCxcclxuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xyXG4gICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXTtcclxuXHJcbiAgICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICc/c2Vzc2lvbklkPScgKyBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCwgYm9keSwge1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcclxuICAgICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXHJcbiAgICAgICAgICAgICdFbnZpcm9ubWVudC1OYW1lJzogdGhpcy5lbnZpcm9ubWVudCxcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpKTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEuZGF0YSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qXHJcblxyXG4gICAgICBlbHNlIGlmIChtZXNzYWdlLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAvLyBidWlsZCBhY3Rpb24gbWVzc2FnZSFcclxuICAgICAgICAgIGxldCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbkFjdGlvbkR0bzoge1xyXG4gICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiBtZXNzYWdlLmRhdGEuYWN0aW9uLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHBheWxvYWQuaW5wdXRQYXJhbWV0ZXJzW21lc3NhZ2UuZGF0YS5wYXlsb2FkLmtleV0gPSBtZXNzYWdlLmRhdGEucGF5bG9hZC52YWx1ZTtcclxuICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShwYXlsb2FkKTtcclxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnF1ZXVlZEZvcm1EYXRhKSB7XHJcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcclxuICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0NPTlRJTlVFX0ZMT1cnLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBfLmVhY2gobWVzc2FnZS5xdWV1ZWRGb3JtRGF0YSwgKGRhdGEsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgIHBheWxvYWQuaW5wdXRQYXJhbWV0ZXJzW2tleV0gPSBkYXRhLnZhbHVlO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgKi9cclxuXHJcblxyXG4gICAgfSkpO1xyXG5cclxuICB9XHJcblxyXG4gIHJlc2V0U2Vzc2lvbihleHRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF07XHJcbiAgfVxyXG5cclxuICAvKlxyXG5cclxuICBxdWV1ZUZvcm1EYXRhKGRhdGEpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5xdWV1ZWRGb3JtRGF0YSkge1xyXG4gICAgICAgICAgdGhpcy5xdWV1ZWRGb3JtRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5jb21wb3NlcklucHV0VHlwZXMuQUREX0ZPUk1fREFUQSk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucXVldWVkRm9ybURhdGFbZGF0YS5zZWN0aW9uLmlkXSA9IGRhdGE7XHJcblxyXG4gIH1cclxuXHJcbiAgcXVldWVJbWFnZURhdGEoZGF0YSkge1xyXG4gICAgICB0aGlzLnF1ZXVlZEltYWdlVXBsb2FkRGF0YSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBzdWJtaXRGb3JtRGF0YSgpIHtcclxuICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICBxdWV1ZWRGb3JtRGF0YTogdGhpcy5xdWV1ZWRGb3JtRGF0YVxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3VibWl0SW1hZ2VEYXRhKGV2ZW50KSB7XHJcbiAgICAgIC8vIFRPRE8gd2Ugd2lsbCBzdG9yZSBpdCBvbmNlIHRoZSBhcGkgaXMgYXZhaWxhYmxlLiBGb3Igbm93IGl0wrRzIG9ubHkgaW4gdGhlIGhpc3RvcnlcclxuXHJcblxyXG4gICAgICAvLyBUT0RPIGNoZWNrIGlmIHNlY3Rpb24gaGFzIG5hdmlnYXRpb25cclxuXHJcbiAgICAgIGlmIChldmVudC5wYWdlTmF2aWdhdGlvbi5uYXZpZ2F0aW9uUmlnaHQuYnV0dG9uQWN0aW9uID09PSAnQ09OVElOVUVfRkxPVycpIHtcclxuXHJcbiAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgICBxdWV1ZWRGb3JtRGF0YTogW11cclxuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gVE9ETyAtIGp1c3QgYWRkIGEgc3RhbmRhcmQgcmVzcG9uc2VcclxuICAgICAgICAgIHRoaXMuZW1pdCgnc3luY2hyb25vdXNCb3RSZXNwb25zZScsIFtuZXcgU2ltcGxlVGV4dE1vZGVsKCdUaGFua3MgZm9yIHVwbG9hZGluZyB0aGUgcGljdHVyZScsICdib3QnKV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGb3JtRGF0YSgpIHtcclxuICAgICAgZGVsZXRlIHRoaXMucXVldWVkRm9ybURhdGE7XHJcblxyXG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XHJcblxyXG4gIH1cclxuXHJcbiAgaGFuZGxlU3luY2hyb25vdXNCb3RSZXNwb25zZShyZXNwb25zZSkge1xyXG5cclxuICAgICAgTWVzc2FnZVN0b3JlLmVtaXQoJ01vZGVDaGFuZ2VkJywgQ29tcG9zZXJJbnB1dFR5cGVzLmRlZmF1bHRJbnB1dFR5cGUpO1xyXG5cclxuICAgICAgLy8gdHJhbnNmb3JtIHJlc3BvbnNlIHRvIGJlIGhhbmRsZWQgZnVydGhlciBpbiB0aGUgVUkuXHJcbiAgICAgIGxldCB1aU1vZGVsID0gdGhpcy5ib3RSZXNwb25zZVRyYW5zZm9ybWF0b3IudHJhbnNmb3JtKHJlc3BvbnNlLmRhdGEpO1xyXG5cclxuICAgICAgdGhpcy5lbWl0KCdzeW5jaHJvbm91c0JvdFJlc3BvbnNlJywgdWlNb2RlbCk7XHJcblxyXG5cclxuICB9XHJcblxyXG4gIGhhbmRsZUVycm9yQm90UmVzcG9uc2UoZXJyKSB7XHJcbiAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5kZWZhdWx0SW5wdXRUeXBlKTtcclxuICAgICAgY29uc29sZS53YXJuKCdCb3QgZXJyb3InKTtcclxuXHJcbiAgICAgIC8vIHRyYW5zZm9ybSByZXNwb25zZSB0byBiZSBoYW5kbGVkIGZ1cnRoZXIgaW4gdGhlIFVJLlxyXG4gICAgICBsZXQgdWlNb2RlbCA9IFtuZXcgU2ltcGxlVGV4dE1vZGVsKCdXZSBhcmUgc29ycnksIGJ1dCBhbiB1bmV4cGVjdGVkIGVycm9yIGhhcHBlbmVkLiBQbGVhc2UgdHJ5IGFnYWluLicsICdib3QnKV07XHJcblxyXG4gICAgICB0aGlzLmVtaXQoJ3N5bmNocm9ub3VzQm90UmVzcG9uc2UnLCB1aU1vZGVsKTtcclxuICB9XHJcbiovXHJcblxyXG59XHJcbiJdfQ==