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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQVUvQixNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxPQUFPLElBQUksa0JBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUdyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQy9CLE9BQU8sTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDbkM7WUFFRCxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsRUFBRSxFQUFFLEVBQUU7Z0JBQzFHLE9BQU8sRUFBRTtvQkFDUCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQzFCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRO29CQUNoQyxrQkFBa0Is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LGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRTtvQkFDdkosT0FBTyxFQUFFO3dCQUNQLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDMUIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ2hDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxXQUFXO3dCQUNwQyxjQUFjLEVBQUUsa0JBQWtCO3FCQUNuQztvQkFDRCxZQUFZLEVBQUUsTUFBTTtpQkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUVmLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0E2QkU7UUFHSixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztDQWtGRjtBQTFPRCxrQ0EwT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5cbi8qKlxuICogU2ltcGxlIEFwaSBoZWxwZXIgY2xhc3MgdG8gc2VuZCB0aGUgYWpheFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUhhc2gge1xuICBbbWFwcGluZzogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVxdWVzdEJhc2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBhcGlBaUtleTogc3RyaW5nO1xuICBwcml2YXRlIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIHByaXZhdGUgdGVuYW50SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBkb21haW5OYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgYWRkaXRpb25hbFBhcmFtczogYW55W107XG5cbiAgcHJpdmF0ZSBzZXNzaW9uTWFwOiBJSGFzaCA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHRlbmFudElkOiBzdHJpbmcgPSAnbmxwZGVtb3NkZicsIGFwaUtleTogc3RyaW5nID0gJzIxMDFlNGE0LThjZDItNDQxMy1iMzg5LWEyNzYwNzdlMjMwNicsIGVudmlyb25tZW50OiBzdHJpbmcgPSAnRGV2JywgZG9tYWluTmFtZTogc3RyaW5nID0gJ0RDTV9UZWxjbycsIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgdGhpcy5yZXF1ZXN0QmFzZVVybCA9ICdodHRwczovL2dvaW50ZXJhY3QuaW8vaW50ZXJhY3QvdmVyc2lvbi8xL2FjY291bnQvJztcbiAgICB0aGlzLmFwaUFpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcbiAgICB0aGlzLnRlbmFudElkID0gdGVuYW50SWQ7XG4gICAgdGhpcy5kb21haW5OYW1lID0gZG9tYWluTmFtZTtcbiAgICB0aGlzLmFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zO1xuICAgIC8vIFRPRE8gdGhpcy5ib3RSZXNwb25zZVRyYW5zZm9ybWF0b3IgPSBuZXcgQm90UmVzcG9uc2VUcmFuc2Zvcm1hdG9yKCk7XG5cbiAgfVxuXG4gIHN0YXJ0Q29udmVyc2F0aW9uKGV4dGVybmFsSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cbiAgICAgIGlmICh0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF0pIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgnYWxyZWFkeSBleGlzdGluZycpO1xuICAgICAgfVxuXG4gICAgICBheGlvcy5wb3N0KHRoaXMucmVxdWVzdEJhc2VVcmwgKyB0aGlzLnRlbmFudElkICsgJy9jb252ZXJzYXRpb24vZG9tYWlucy8nICsgdGhpcy5kb21haW5OYW1lICsgJy9zdGFydCcsIHt9LCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcbiAgICAgICAgICAnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcGlBaUtleSxcbiAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcblxuICAgICAgfSkudGhlbigoc3RhcnRSZXNwb25zZTogYW55KSA9PiB7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdID0gc3RhcnRSZXNwb25zZS5kYXRhLnNlc3Npb25JZDtcblxuICAgICAgICByZXNvbHZlKHN0YXJ0UmVzcG9uc2UuZGF0YS5zZXNzaW9uSWQpO1xuXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKGV4dGVybmFsSWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGxldCBib2R5OiBhbnk7XG4gICAgICBpZiAobWVzc2FnZS50ZXh0KSB7XG4gICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgdGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgICAgIHZhcmlhYmxlczoge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGFwcGVuZCBhZGRpdGlvbmFsIHZhcmlhYmxlcyBpZiBhdmFpbGFibGVcbiAgICAgICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlc1twYXJhbS5rZXldID0gcGFyYW0udmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoJ05vdCB5ZXQgaW1wbGVtZW50ZWQuIEV4cGVjdGluZyBhIHRleHQgcHJvcGVydHkgaW4gdGhlIG1lc3NhZ2UnKVxuICAgICAgfVxuXG5cbiAgICAgIGlmICghdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb252ZXJzYXRpb24oZXh0ZXJuYWxJZCkudGhlbigoY29udmVyc2F0aW9uSWQpID0+IHtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IGNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgY29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLmRhdGEpKTtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5kYXRhKTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkudmFyaWFibGVzLmNsaWVudENvbnZlcnNhdGlvbklkID0gdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdO1xuXG4gICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgYm9keS52YXJpYWJsZXMuY2xpZW50Q29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcbiAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEuZGF0YSkpO1xuXG4gICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKlxuXG4gICAgICBlbHNlIGlmIChtZXNzYWdlLmRhdGEpIHtcblxuICAgICAgICAgIC8vIGJ1aWxkIGFjdGlvbiBtZXNzYWdlIVxuICAgICAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6IG1lc3NhZ2UuZGF0YS5hY3Rpb24sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgICB9O1xuICAgICAgICAgIHBheWxvYWQuaW5wdXRQYXJhbWV0ZXJzW21lc3NhZ2UuZGF0YS5wYXlsb2FkLmtleV0gPSBtZXNzYWdlLmRhdGEucGF5bG9hZC52YWx1ZTtcbiAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UucXVldWVkRm9ybURhdGEpIHtcbiAgICAgICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uQWN0aW9uRHRvOiB7XG4gICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnQ09OVElOVUVfRkxPVycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgXy5lYWNoKG1lc3NhZ2UucXVldWVkRm9ybURhdGEsIChkYXRhLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgcGF5bG9hZC5pbnB1dFBhcmFtZXRlcnNba2V5XSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCk7XG5cbiAgICAgIH1cblxuICAgICAgKi9cblxuXG4gICAgfSkpO1xuXG4gIH1cblxuICAvKlxuXG4gIHF1ZXVlRm9ybURhdGEoZGF0YSkge1xuXG4gICAgICBpZiAoIXRoaXMucXVldWVkRm9ybURhdGEpIHtcbiAgICAgICAgICB0aGlzLnF1ZXVlZEZvcm1EYXRhID0ge307XG5cbiAgICAgICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuY29tcG9zZXJJbnB1dFR5cGVzLkFERF9GT1JNX0RBVEEpO1xuXG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXVlZEZvcm1EYXRhW2RhdGEuc2VjdGlvbi5pZF0gPSBkYXRhO1xuXG4gIH1cblxuICBxdWV1ZUltYWdlRGF0YShkYXRhKSB7XG4gICAgICB0aGlzLnF1ZXVlZEltYWdlVXBsb2FkRGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXRGb3JtRGF0YSgpIHtcbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIHF1ZXVlZEZvcm1EYXRhOiB0aGlzLnF1ZXVlZEZvcm1EYXRhXG4gICAgICB9KS50aGVuKCgpID0+IHtcblxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuXG4gICAgICB9KTtcbiAgfVxuXG4gIHN1Ym1pdEltYWdlRGF0YShldmVudCkge1xuICAgICAgLy8gVE9ETyB3ZSB3aWxsIHN0b3JlIGl0IG9uY2UgdGhlIGFwaSBpcyBhdmFpbGFibGUuIEZvciBub3cgaXTCtHMgb25seSBpbiB0aGUgaGlzdG9yeVxuXG5cbiAgICAgIC8vIFRPRE8gY2hlY2sgaWYgc2VjdGlvbiBoYXMgbmF2aWdhdGlvblxuXG4gICAgICBpZiAoZXZlbnQucGFnZU5hdmlnYXRpb24ubmF2aWdhdGlvblJpZ2h0LmJ1dHRvbkFjdGlvbiA9PT0gJ0NPTlRJTlVFX0ZMT1cnKSB7XG5cbiAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgcXVldWVkRm9ybURhdGE6IFtdXG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE8gLSBqdXN0IGFkZCBhIHN0YW5kYXJkIHJlc3BvbnNlXG4gICAgICAgICAgdGhpcy5lbWl0KCdzeW5jaHJvbm91c0JvdFJlc3BvbnNlJywgW25ldyBTaW1wbGVUZXh0TW9kZWwoJ1RoYW5rcyBmb3IgdXBsb2FkaW5nIHRoZSBwaWN0dXJlJywgJ2JvdCcpXSk7XG4gICAgICB9XG5cbiAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5kZWZhdWx0SW5wdXRUeXBlKTtcbiAgfVxuXG4gIHJlbW92ZUZvcm1EYXRhKCkge1xuICAgICAgZGVsZXRlIHRoaXMucXVldWVkRm9ybURhdGE7XG5cbiAgICAgIE1lc3NhZ2VTdG9yZS5lbWl0KCdNb2RlQ2hhbmdlZCcsIENvbXBvc2VySW5wdXRUeXBlcy5kZWZhdWx0SW5wdXRUeXBlKTtcblxuICB9XG5cbiAgaGFuZGxlU3luY2hyb25vdXNCb3RSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XG5cbiAgICAgIC8vIHRyYW5zZm9ybSByZXNwb25zZSB0byBiZSBoYW5kbGVkIGZ1cnRoZXIgaW4gdGhlIFVJLlxuICAgICAgbGV0IHVpTW9kZWwgPSB0aGlzLmJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvci50cmFuc2Zvcm0ocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgIHRoaXMuZW1pdCgnc3luY2hyb25vdXNCb3RSZXNwb25zZScsIHVpTW9kZWwpO1xuXG5cbiAgfVxuXG4gIGhhbmRsZUVycm9yQm90UmVzcG9uc2UoZXJyKSB7XG4gICAgICBNZXNzYWdlU3RvcmUuZW1pdCgnTW9kZUNoYW5nZWQnLCBDb21wb3NlcklucHV0VHlwZXMuZGVmYXVsdElucHV0VHlwZSk7XG4gICAgICBjb25zb2xlLndhcm4oJ0JvdCBlcnJvcicpO1xuXG4gICAgICAvLyB0cmFuc2Zvcm0gcmVzcG9uc2UgdG8gYmUgaGFuZGxlZCBmdXJ0aGVyIGluIHRoZSBVSS5cbiAgICAgIGxldCB1aU1vZGVsID0gW25ldyBTaW1wbGVUZXh0TW9kZWwoJ1dlIGFyZSBzb3JyeSwgYnV0IGFuIHVuZXhwZWN0ZWQgZXJyb3IgaGFwcGVuZWQuIFBsZWFzZSB0cnkgYWdhaW4uJywgJ2JvdCcpXTtcblxuICAgICAgdGhpcy5lbWl0KCdzeW5jaHJvbm91c0JvdFJlc3BvbnNlJywgdWlNb2RlbCk7XG4gIH1cbiovXG5cbn1cbiJdfQ==