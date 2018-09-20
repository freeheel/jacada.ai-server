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
                this.sessionMap[externalId] = startResponse.data;
                resolve(startResponse.data);
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
            if (this.sessionMap[externalId] && this.sessionMap[externalId]['instanceUniqueId']) {
                body.variables['ParentInteractionId'] = this.sessionMap[externalId]['instanceUniqueId'];
            }
            if (!this.sessionMap[externalId]) {
                this.startConversation(externalId).then((interactData) => {
                    const conversationId = interactData.sessionId;
                    body.variables.clientConversationId = conversationId;
                    this.sessionMap[externalId]['instanceUniqueId'] = interactData.instanceUniqueId;
                    body.variables['ParentInteractionId'] = this.sessionMap[externalId]['instanceUniqueId'];
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
                body.variables.clientConversationId = this.sessionMap[externalId]['sessionId'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQUUvQixhQUFhO0FBQ2IsMENBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQVVsQyxNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFMUIsT0FBTyxJQUFJLGtCQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFHckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxR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RSxFQUFFO29CQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDeEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFFSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUVELFlBQVksQ0FBQyxVQUFrQjtRQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUVGO0FBbEtELGtDQWtLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IExPRyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsL2xvZ2dpbmdcIik7XG5cbmNvbnN0IHBMb2cgPSBMT0cucGVyZm9ybWFuY2VMb2coKTtcblxuLyoqXG4gKiBTaW1wbGUgQXBpIGhlbHBlciBjbGFzcyB0byBzZW5kIHRoZSBhamF4XG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJSGFzaCB7XG4gIFttYXBwaW5nOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0U2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZXF1ZXN0QmFzZVVybDogc3RyaW5nO1xuICBwcml2YXRlIGFwaUFpS2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgZW52aXJvbm1lbnQ6IHN0cmluZztcbiAgcHJpdmF0ZSB0ZW5hbnRJZDogc3RyaW5nO1xuICBwcml2YXRlIGRvbWFpbk5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBhZGRpdGlvbmFsUGFyYW1zOiBhbnlbXTtcblxuICBwcml2YXRlIHNlc3Npb25NYXA6IElIYXNoID0ge307XG5cbiAgY29uc3RydWN0b3IodGVuYW50SWQ6IHN0cmluZyA9ICdubHBkZW1vc2RmJywgYXBpS2V5OiBzdHJpbmcgPSAnMjEwMWU0YTQtOGNkMi00NDEzLWIzODktYTI3NjA3N2UyMzA2JywgZW52aXJvbm1lbnQ6IHN0cmluZyA9ICdEZXYnLCBkb21haW5OYW1lOiBzdHJpbmcgPSAnRENNX1RlbGNvJywgYWRkaXRpb25hbFBhcmFtczogYW55W10pIHtcbiAgICB0aGlzLnJlcXVlc3RCYXNlVXJsID0gJ2h0dHBzOi8vZ29pbnRlcmFjdC5pby9pbnRlcmFjdC92ZXJzaW9uLzEvYWNjb3VudC8nO1xuICAgIHRoaXMuYXBpQWlLZXkgPSBhcGlLZXk7XG4gICAgdGhpcy5lbnZpcm9ubWVudCA9IGVudmlyb25tZW50O1xuICAgIHRoaXMudGVuYW50SWQgPSB0ZW5hbnRJZDtcbiAgICB0aGlzLmRvbWFpbk5hbWUgPSBkb21haW5OYW1lO1xuICAgIHRoaXMuYWRkaXRpb25hbFBhcmFtcyA9IGFkZGl0aW9uYWxQYXJhbXM7XG4gICAgLy8gVE9ETyB0aGlzLmJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvciA9IG5ldyBCb3RSZXNwb25zZVRyYW5zZm9ybWF0b3IoKTtcblxuICB9XG5cbiAgc3RhcnRDb252ZXJzYXRpb24oZXh0ZXJuYWxJZDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIGNvbnN0IHBTdGFydCA9IERhdGUubm93KCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cbiAgICAgIGlmICh0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF0pIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdCgnYWxyZWFkeSBleGlzdGluZycpO1xuICAgICAgfVxuXG4gICAgICBheGlvcy5wb3N0KHRoaXMucmVxdWVzdEJhc2VVcmwgKyB0aGlzLnRlbmFudElkICsgJy9jb252ZXJzYXRpb24vZG9tYWlucy8nICsgdGhpcy5kb21haW5OYW1lICsgJy9zdGFydCcsIHt9LCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcbiAgICAgICAgICAnQXBwbGljYXRpb24tS2V5JzogdGhpcy5hcGlBaUtleSxcbiAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcblxuICAgICAgfSkudGhlbigoc3RhcnRSZXNwb25zZTogYW55KSA9PiB7XG5cbiAgICAgICAgY29uc3Qgc3RvcCA9IERhdGUubm93KCk7XG5cbiAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbicsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF0gPSBzdGFydFJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgcmVzb2x2ZShzdGFydFJlc3BvbnNlLmRhdGEpO1xuXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24nLCAnZXJyb3IgYWZ0ZXIgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKGV4dGVybmFsSWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCBzcHVpOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgY29uc3QgcFN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGxldCBib2R5OiBhbnk7XG4gICAgICBpZiAobWVzc2FnZS50ZXh0KSB7XG4gICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgdGV4dDogbWVzc2FnZS50ZXh0LFxuICAgICAgICAgIHZhcmlhYmxlczoge31cbiAgICAgICAgfTtcblxuICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmZvcm1EYXRhKSB7XG4gICAgICAgIGJvZHkgPSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uQWN0aW9uRHRvOiB7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnQ09OVElOVUVfRkxPVycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YXJpYWJsZXM6IHt9LFxuICAgICAgICAgIGlucHV0UGFyYW1ldGVyczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBtZXNzYWdlLmZvcm1EYXRhLm1hcCgoZm9ybURhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIGJvZHkuaW5wdXRQYXJhbWV0ZXJzW2Zvcm1EYXRhLmtleV0gPSBmb3JtRGF0YS52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCgnTm90IHlldCBpbXBsZW1lbnRlZC4gRXhwZWN0aW5nIGEgdGV4dCBwcm9wZXJ0eSBpbiB0aGUgbWVzc2FnZScpXG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGVuZCBhZGRpdGlvbmFsIHZhcmlhYmxlcyBpZiBhdmFpbGFibGVcbiAgICAgIHRoaXMuYWRkaXRpb25hbFBhcmFtcy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgIGJvZHkudmFyaWFibGVzW3BhcmFtLmtleV0gPSBwYXJhbS52YWx1ZTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhcHBlbmQgc3B1aSBpZiBub3QgbnVsbFxuICAgICAgaWYgKHNwdWkpIHtcbiAgICAgICAgYm9keS52YXJpYWJsZXNbJ3NwdWknXSA9IHNwdWk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF0gJiYgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdWydpbnN0YW5jZVVuaXF1ZUlkJ10pIHtcbiAgICAgICAgYm9keS52YXJpYWJsZXNbJ1BhcmVudEludGVyYWN0aW9uSWQnXSA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnaW5zdGFuY2VVbmlxdWVJZCddO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSkge1xuICAgICAgICB0aGlzLnN0YXJ0Q29udmVyc2F0aW9uKGV4dGVybmFsSWQpLnRoZW4oKGludGVyYWN0RGF0YSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gaW50ZXJhY3REYXRhLnNlc3Npb25JZDtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IGNvbnZlcnNhdGlvbklkO1xuICAgICAgICAgIHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnaW5zdGFuY2VVbmlxdWVJZCddID0gaW50ZXJhY3REYXRhLmluc3RhbmNlVW5pcXVlSWQ7XG4gICAgICAgICAgYm9keS52YXJpYWJsZXNbJ1BhcmVudEludGVyYWN0aW9uSWQnXSA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnaW5zdGFuY2VVbmlxdWVJZCddO1xuICAgICAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnP3Nlc3Npb25JZD0nICsgY29udmVyc2F0aW9uSWQsIGJvZHksIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ1RlbmFudC1JZCc6IHRoaXMudGVuYW50SWQsXG4gICAgICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIHBMb2cubG9nKCdzdGFydCBjb252ZXJzYXRpb24gYW5kIHNlbmQgbWVzc2FnZScsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLmRhdGEpO1xuICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcblxuICAgICAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbiBhbmQgc2VuZCBtZXNzYWdlJywgJ2Vycm9yIGFmdGVyICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnc2Vzc2lvbklkJ107XG5cbiAgICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICc/c2Vzc2lvbklkPScgKyBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCwgYm9keSwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxuICAgICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgcExvZy5sb2coJ3NlbmQgbWVzc2FnZScsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgIHJlc29sdmUoZGF0YS5kYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHBMb2cubG9nKCdzZW5kIG1lc3NhZ2UnLCAnZXJyb3IgYWZ0ZXIgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pKTtcblxuICB9XG5cbiAgcmVzZXRTZXNzaW9uKGV4dGVybmFsSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF07XG4gIH1cblxufVxuIl19