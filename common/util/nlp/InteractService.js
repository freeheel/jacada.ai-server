"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const bluebird_1 = __importDefault(require("bluebird"));
// @ts-ignore
const LOG = require("../../util/logging");
const pLog = LOG.performanceLog();
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
        const pStart = Date.now();
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
    sendMessage(externalId, message, spui) {
        const pStart = Date.now();
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
            // append spui if not null
            if (spui) {
                body.variables['spui'] = spui;
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
                        pLog.log('start conversation and send message', 'it took ' + (Date.now() - pStart) + 'ms');
                        resolve(data.data);
                    }).catch((err) => {
                        pLog.log('start conversation and send message', 'error after ' + (Date.now() - pStart) + 'ms');
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
                    pLog.log('send message', 'it took ' + (Date.now() - pStart) + 'ms');
                    resolve(data.data);
                }).catch((err) => {
                    pLog.log('send message', 'error after ' + (Date.now() - pStart) + 'ms');
                    reject(err);
                });
            }
        }));
    }
    resetSession(externalId) {
        delete this.sessionMap[externalId];
    }
}
exports.default = InteractService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQUUvQixhQUFhO0FBQ2IsMENBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQVVsQyxNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFMUIsT0FBTyxJQUFJLGtCQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFHckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxR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QixHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFO29CQUN2SixPQUFPLEVBQUU7d0JBQ1AsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUMxQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUTt3QkFDaEMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFdBQVc7d0JBQ3BDLGNBQWMsRUFBRSxrQkFBa0I7cUJBQ25DO29CQUNELFlBQVksRUFBRSxNQUFNO2lCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBRWYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUVwRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBRUgsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7SUFFRCxZQUFZLENBQUMsVUFBa0I7UUFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FFRjtBQTdKRCxrQ0E2SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBMT0cgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9sb2dnaW5nXCIpO1xuXG5jb25zdCBwTG9nID0gTE9HLnBlcmZvcm1hbmNlTG9nKCk7XG5cbi8qKlxuICogU2ltcGxlIEFwaSBoZWxwZXIgY2xhc3MgdG8gc2VuZCB0aGUgYWpheFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUhhc2gge1xuICBbbWFwcGluZzogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVxdWVzdEJhc2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBhcGlBaUtleTogc3RyaW5nO1xuICBwcml2YXRlIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIHByaXZhdGUgdGVuYW50SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBkb21haW5OYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgYWRkaXRpb25hbFBhcmFtczogYW55W107XG5cbiAgcHJpdmF0ZSBzZXNzaW9uTWFwOiBJSGFzaCA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHRlbmFudElkOiBzdHJpbmcgPSAnbmxwZGVtb3NkZicsIGFwaUtleTogc3RyaW5nID0gJzIxMDFlNGE0LThjZDItNDQxMy1iMzg5LWEyNzYwNzdlMjMwNicsIGVudmlyb25tZW50OiBzdHJpbmcgPSAnRGV2JywgZG9tYWluTmFtZTogc3RyaW5nID0gJ0RDTV9UZWxjbycsIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgdGhpcy5yZXF1ZXN0QmFzZVVybCA9ICdodHRwczovL2dvaW50ZXJhY3QuaW8vaW50ZXJhY3QvdmVyc2lvbi8xL2FjY291bnQvJztcbiAgICB0aGlzLmFwaUFpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcbiAgICB0aGlzLnRlbmFudElkID0gdGVuYW50SWQ7XG4gICAgdGhpcy5kb21haW5OYW1lID0gZG9tYWluTmFtZTtcbiAgICB0aGlzLmFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zO1xuICAgIC8vIFRPRE8gdGhpcy5ib3RSZXNwb25zZVRyYW5zZm9ybWF0b3IgPSBuZXcgQm90UmVzcG9uc2VUcmFuc2Zvcm1hdG9yKCk7XG5cbiAgfVxuXG4gIHN0YXJ0Q29udmVyc2F0aW9uKGV4dGVybmFsSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cbiAgICBjb25zdCBwU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXG4gICAgICBpZiAodGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoJ2FscmVhZHkgZXhpc3RpbmcnKTtcbiAgICAgIH1cblxuICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICcvc3RhcnQnLCB7fSwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG5cbiAgICAgIH0pLnRoZW4oKHN0YXJ0UmVzcG9uc2U6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHN0b3AgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24nLCAnaXQgdG9vayAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdID0gc3RhcnRSZXNwb25zZS5kYXRhLnNlc3Npb25JZDtcblxuICAgICAgICByZXNvbHZlKHN0YXJ0UmVzcG9uc2UuZGF0YS5zZXNzaW9uSWQpO1xuXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24nLCAnZXJyb3IgYWZ0ZXIgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKGV4dGVybmFsSWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCBzcHVpOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgY29uc3QgcFN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGxldCBib2R5OiBhbnk7XG4gICAgICBpZiAobWVzc2FnZS50ZXh0KSB7XG4gICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgdGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgICAgIHZhcmlhYmxlczoge31cbiAgICAgICAgfTtcblxuXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZm9ybURhdGEpIHtcbiAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdDT05USU5VRV9GTE9XJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZhcmlhYmxlczoge30sXG4gICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIG1lc3NhZ2UuZm9ybURhdGEubWFwKChmb3JtRGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgYm9keS5pbnB1dFBhcmFtZXRlcnNbZm9ybURhdGEua2V5XSA9IGZvcm1EYXRhLnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdOb3QgeWV0IGltcGxlbWVudGVkLiBFeHBlY3RpbmcgYSB0ZXh0IHByb3BlcnR5IGluIHRoZSBtZXNzYWdlJylcbiAgICAgIH1cblxuICAgICAgLy8gYXBwZW5kIGFkZGl0aW9uYWwgdmFyaWFibGVzIGlmIGF2YWlsYWJsZVxuICAgICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgYm9keS52YXJpYWJsZXNbcGFyYW0ua2V5XSA9IHBhcmFtLnZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFwcGVuZCBzcHVpIGlmIG5vdCBudWxsXG4gICAgICBpZiAoc3B1aSkge1xuICAgICAgICBib2R5LnZhcmlhYmxlc1snc3B1aSddID0gc3B1aTtcbiAgICAgIH1cblxuXG4gICAgICBpZiAoIXRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSkge1xuICAgICAgICB0aGlzLnN0YXJ0Q29udmVyc2F0aW9uKGV4dGVybmFsSWQpLnRoZW4oKGNvbnZlcnNhdGlvbklkKSA9PiB7XG4gICAgICAgICAgYm9keS52YXJpYWJsZXMuY2xpZW50Q29udmVyc2F0aW9uSWQgPSBjb252ZXJzYXRpb25JZDtcbiAgICAgICAgICBheGlvcy5wb3N0KHRoaXMucmVxdWVzdEJhc2VVcmwgKyB0aGlzLnRlbmFudElkICsgJy9jb252ZXJzYXRpb24vZG9tYWlucy8nICsgdGhpcy5kb21haW5OYW1lICsgJz9zZXNzaW9uSWQ9JyArIGNvbnZlcnNhdGlvbklkLCBib2R5LCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxuICAgICAgICAgICAgICAnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcGlBaUtleSxcbiAgICAgICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICBwTG9nLmxvZygnc3RhcnQgY29udmVyc2F0aW9uIGFuZCBzZW5kIG1lc3NhZ2UnLCAnaXQgdG9vayAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5kYXRhKTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG5cbiAgICAgICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24gYW5kIHNlbmQgbWVzc2FnZScsICdlcnJvciBhZnRlciAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9keS52YXJpYWJsZXMuY2xpZW50Q29udmVyc2F0aW9uSWQgPSB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF07XG5cbiAgICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICc/c2Vzc2lvbklkPScgKyBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCwgYm9keSwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxuICAgICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgcExvZy5sb2coJ3NlbmQgbWVzc2FnZScsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgIHJlc29sdmUoZGF0YS5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHBMb2cubG9nKCdzZW5kIG1lc3NhZ2UnLCAnZXJyb3IgYWZ0ZXIgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pKTtcblxuICB9XG5cbiAgcmVzZXRTZXNzaW9uKGV4dGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF07XG4gIH1cblxufVxuIl19