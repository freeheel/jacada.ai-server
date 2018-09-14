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
    sendMessage(externalId, message) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQUUvQixhQUFhO0FBQ2IsMENBQTJDO0FBQzNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQVVsQyxNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFMUIsT0FBTyxJQUFJLGtCQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFHckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxR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UCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQzFCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUNoQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsV0FBVzt3QkFDcEMsY0FBYyxFQUFFLGtCQUFrQjtxQkFDbkM7b0JBQ0QsWUFBWSxFQUFFLE1BQU07aUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFFZixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBRXBFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDeEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUVELFlBQVksQ0FBQyxVQUFrQjtRQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUVGO0FBeEpELGtDQXdKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IExPRyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsL2xvZ2dpbmdcIik7XG5jb25zdCBwTG9nID0gTE9HLnBlcmZvcm1hbmNlTG9nKCk7XG5cbi8qKlxuICogU2ltcGxlIEFwaSBoZWxwZXIgY2xhc3MgdG8gc2VuZCB0aGUgYWpheFxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUhhc2gge1xuICBbbWFwcGluZzogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVxdWVzdEJhc2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBhcGlBaUtleTogc3RyaW5nO1xuICBwcml2YXRlIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIHByaXZhdGUgdGVuYW50SWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBkb21haW5OYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgYWRkaXRpb25hbFBhcmFtczogYW55W107XG5cbiAgcHJpdmF0ZSBzZXNzaW9uTWFwOiBJSGFzaCA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHRlbmFudElkOiBzdHJpbmcgPSAnbmxwZGVtb3NkZicsIGFwaUtleTogc3RyaW5nID0gJzIxMDFlNGE0LThjZDItNDQxMy1iMzg5LWEyNzYwNzdlMjMwNicsIGVudmlyb25tZW50OiBzdHJpbmcgPSAnRGV2JywgZG9tYWluTmFtZTogc3RyaW5nID0gJ0RDTV9UZWxjbycsIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgdGhpcy5yZXF1ZXN0QmFzZVVybCA9ICdodHRwczovL2dvaW50ZXJhY3QuaW8vaW50ZXJhY3QvdmVyc2lvbi8xL2FjY291bnQvJztcbiAgICB0aGlzLmFwaUFpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcbiAgICB0aGlzLnRlbmFudElkID0gdGVuYW50SWQ7XG4gICAgdGhpcy5kb21haW5OYW1lID0gZG9tYWluTmFtZTtcbiAgICB0aGlzLmFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zO1xuICAgIC8vIFRPRE8gdGhpcy5ib3RSZXNwb25zZVRyYW5zZm9ybWF0b3IgPSBuZXcgQm90UmVzcG9uc2VUcmFuc2Zvcm1hdG9yKCk7XG5cbiAgfVxuXG4gIHN0YXJ0Q29udmVyc2F0aW9uKGV4dGVybmFsSWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cbiAgICBjb25zdCBwU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXG4gICAgICBpZiAodGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoJ2FscmVhZHkgZXhpc3RpbmcnKTtcbiAgICAgIH1cblxuICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICcvc3RhcnQnLCB7fSwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgJ0Vudmlyb25tZW50LU5hbWUnOiB0aGlzLmVudmlyb25tZW50LFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG5cbiAgICAgIH0pLnRoZW4oKHN0YXJ0UmVzcG9uc2U6IGFueSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHN0b3AgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24nLCAnaXQgdG9vayAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdID0gc3RhcnRSZXNwb25zZS5kYXRhLnNlc3Npb25JZDtcblxuICAgICAgICByZXNvbHZlKHN0YXJ0UmVzcG9uc2UuZGF0YS5zZXNzaW9uSWQpO1xuXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24nLCAnZXJyb3IgYWZ0ZXIgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKGV4dGVybmFsSWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICAgIGNvbnN0IHBTdGFydCA9IERhdGUubm93KCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBsZXQgYm9keTogYW55O1xuICAgICAgaWYgKG1lc3NhZ2UudGV4dCkge1xuICAgICAgICBib2R5ID0ge1xuICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICB2YXJpYWJsZXM6IHt9XG4gICAgICAgIH07XG5cblxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmZvcm1EYXRhKSB7XG4gICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uQWN0aW9uRHRvOiB7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnQ09OVElOVUVfRkxPVycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YXJpYWJsZXM6IHt9LFxuICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBtZXNzYWdlLmZvcm1EYXRhLm1hcCgoZm9ybURhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIGJvZHkuaW5wdXRQYXJhbWV0ZXJzW2Zvcm1EYXRhLmtleV0gPSBmb3JtRGF0YS52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm90IHlldCBpbXBsZW1lbnRlZC4gRXhwZWN0aW5nIGEgdGV4dCBwcm9wZXJ0eSBpbiB0aGUgbWVzc2FnZScpXG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGVuZCBhZGRpdGlvbmFsIHZhcmlhYmxlcyBpZiBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkaXRpb25hbFBhcmFtcy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgIGJvZHkudmFyaWFibGVzW3BhcmFtLmtleV0gPSBwYXJhbS52YWx1ZTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIGlmICghdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb252ZXJzYXRpb24oZXh0ZXJuYWxJZCkudGhlbigoY29udmVyc2F0aW9uSWQpID0+IHtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IGNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgY29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24gYW5kIHNlbmQgbWVzc2FnZScsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xuICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcblxuICAgICAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbiBhbmQgc2VuZCBtZXNzYWdlJywgJ2Vycm9yIGFmdGVyICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXTtcblxuICAgICAgICBheGlvcy5wb3N0KHRoaXMucmVxdWVzdEJhc2VVcmwgKyB0aGlzLnRlbmFudElkICsgJy9jb252ZXJzYXRpb24vZG9tYWlucy8nICsgdGhpcy5kb21haW5OYW1lICsgJz9zZXNzaW9uSWQ9JyArIGJvZHkudmFyaWFibGVzLmNsaWVudENvbnZlcnNhdGlvbklkLCBib2R5LCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgICAnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcGlBaUtleSxcbiAgICAgICAgICAgICdFbnZpcm9ubWVudC1OYW1lJzogdGhpcy5lbnZpcm9ubWVudCxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG5cbiAgICAgICAgICBwTG9nLmxvZygnc2VuZCBtZXNzYWdlJywgJ2l0IHRvb2sgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcExvZy5sb2coJ3NlbmQgbWVzc2FnZScsICdlcnJvciBhZnRlciAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSkpO1xuXG4gIH1cblxuICByZXNldFNlc3Npb24oZXh0ZXJuYWxJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXTtcbiAgfVxuXG59XG4iXX0=