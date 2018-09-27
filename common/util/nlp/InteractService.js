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
                        resolve({
                            response: data.data,
                            instanceUniqueId: this.sessionMap[externalId]['instanceUniqueId']
                        });
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
                    resolve({
                        response: data.data,
                        instanceUniqueId: this.sessionMap[externalId]['instanceUniqueId']
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50ZXJhY3RTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHdEQUErQjtBQUUvQixhQUFhO0FBQ2IsMENBQTJDO0FBRTNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQVVsQyxNQUFxQixlQUFlO0lBV2xDLFlBQVksV0FBbUIsWUFBWSxFQUFFLFNBQWlCLHNDQUFzQyxFQUFFLGNBQXNCLEtBQUssRUFBRSxhQUFxQixXQUFXLEVBQUUsZ0JBQXVCO1FBRnBMLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtREFBbUQsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsdUVBQXVFO0lBRXpFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUVsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFMUIsT0FBTyxJQUFJLGtCQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFHckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMvQixPQUFPLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxR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O29CQUVwRSxPQUFPLENBQUM7d0JBQ04sUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNuQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO3FCQUNsRSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN4RSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUVILENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFTixDQUFDO0lBRUQsWUFBWSxDQUFDLFVBQWtCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBRUY7QUF4S0Qsa0NBd0tDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgTE9HID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvbG9nZ2luZ1wiKTtcblxuY29uc3QgcExvZyA9IExPRy5wZXJmb3JtYW5jZUxvZygpO1xuXG4vKipcbiAqIFNpbXBsZSBBcGkgaGVscGVyIGNsYXNzIHRvIHNlbmQgdGhlIGFqYXhcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIElIYXNoIHtcbiAgW21hcHBpbmc6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlcXVlc3RCYXNlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYXBpQWlLZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBlbnZpcm9ubWVudDogc3RyaW5nO1xuICBwcml2YXRlIHRlbmFudElkOiBzdHJpbmc7XG4gIHByaXZhdGUgZG9tYWluTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGFkZGl0aW9uYWxQYXJhbXM6IGFueVtdO1xuXG4gIHByaXZhdGUgc2Vzc2lvbk1hcDogSUhhc2ggPSB7fTtcblxuICBjb25zdHJ1Y3Rvcih0ZW5hbnRJZDogc3RyaW5nID0gJ25scGRlbW9zZGYnLCBhcGlLZXk6IHN0cmluZyA9ICcyMTAxZTRhNC04Y2QyLTQ0MTMtYjM4OS1hMjc2MDc3ZTIzMDYnLCBlbnZpcm9ubWVudDogc3RyaW5nID0gJ0RldicsIGRvbWFpbk5hbWU6IHN0cmluZyA9ICdEQ01fVGVsY28nLCBhZGRpdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIHRoaXMucmVxdWVzdEJhc2VVcmwgPSAnaHR0cHM6Ly9nb2ludGVyYWN0LmlvL2ludGVyYWN0L3ZlcnNpb24vMS9hY2NvdW50Lyc7XG4gICAgdGhpcy5hcGlBaUtleSA9IGFwaUtleTtcbiAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgdGhpcy50ZW5hbnRJZCA9IHRlbmFudElkO1xuICAgIHRoaXMuZG9tYWluTmFtZSA9IGRvbWFpbk5hbWU7XG4gICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcztcbiAgICAvLyBUT0RPIHRoaXMuYm90UmVzcG9uc2VUcmFuc2Zvcm1hdG9yID0gbmV3IEJvdFJlc3BvbnNlVHJhbnNmb3JtYXRvcigpO1xuXG4gIH1cblxuICBzdGFydENvbnZlcnNhdGlvbihleHRlcm5hbElkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgY29uc3QgcFN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblxuICAgICAgaWYgKHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KCdhbHJlYWR5IGV4aXN0aW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGF4aW9zLnBvc3QodGhpcy5yZXF1ZXN0QmFzZVVybCArIHRoaXMudGVuYW50SWQgKyAnL2NvbnZlcnNhdGlvbi9kb21haW5zLycgKyB0aGlzLmRvbWFpbk5hbWUgKyAnL3N0YXJ0Jywge30sIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxuICAgICAgICAgICdBcHBsaWNhdGlvbi1LZXknOiB0aGlzLmFwaUFpS2V5LFxuICAgICAgICAgICdFbnZpcm9ubWVudC1OYW1lJzogdGhpcy5lbnZpcm9ubWVudCxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuXG4gICAgICB9KS50aGVuKChzdGFydFJlc3BvbnNlOiBhbnkpID0+IHtcblxuICAgICAgICBjb25zdCBzdG9wID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBwTG9nLmxvZygnc3RhcnQgY29udmVyc2F0aW9uJywgJ2l0IHRvb2sgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSA9IHN0YXJ0UmVzcG9uc2UuZGF0YTtcblxuICAgICAgICByZXNvbHZlKHN0YXJ0UmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbicsICdlcnJvciBhZnRlciAnICsgKERhdGUubm93KCkgLSBwU3RhcnQpICsgJ21zJyk7XG5cbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbiAgc2VuZE1lc3NhZ2UoZXh0ZXJuYWxJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnksIHNwdWk6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cbiAgICBjb25zdCBwU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgbGV0IGJvZHk6IGFueTtcbiAgICAgIGlmIChtZXNzYWdlLnRleHQpIHtcbiAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICB0ZXh0OiBtZXNzYWdlLnRleHQsXG4gICAgICAgICAgdmFyaWFibGVzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuZm9ybURhdGEpIHtcbiAgICAgICAgYm9keSA9IHtcbiAgICAgICAgICBjb252ZXJzYXRpb25BY3Rpb25EdG86IHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdDT05USU5VRV9GTE9XJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZhcmlhYmxlczoge30sXG4gICAgICAgICAgaW5wdXRQYXJhbWV0ZXJzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIG1lc3NhZ2UuZm9ybURhdGEubWFwKChmb3JtRGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgYm9keS5pbnB1dFBhcmFtZXRlcnNbZm9ybURhdGEua2V5XSA9IGZvcm1EYXRhLnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdOb3QgeWV0IGltcGxlbWVudGVkLiBFeHBlY3RpbmcgYSB0ZXh0IHByb3BlcnR5IGluIHRoZSBtZXNzYWdlJylcbiAgICAgIH1cblxuICAgICAgLy8gYXBwZW5kIGFkZGl0aW9uYWwgdmFyaWFibGVzIGlmIGF2YWlsYWJsZVxuICAgICAgdGhpcy5hZGRpdGlvbmFsUGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgYm9keS52YXJpYWJsZXNbcGFyYW0ua2V5XSA9IHBhcmFtLnZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGFwcGVuZCBzcHVpIGlmIG5vdCBudWxsXG4gICAgICBpZiAoc3B1aSkge1xuICAgICAgICBib2R5LnZhcmlhYmxlc1snc3B1aSddID0gc3B1aTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXSAmJiB0aGlzLnNlc3Npb25NYXBbZXh0ZXJuYWxJZF1bJ2luc3RhbmNlVW5pcXVlSWQnXSkge1xuICAgICAgICBib2R5LnZhcmlhYmxlc1snUGFyZW50SW50ZXJhY3Rpb25JZCddID0gdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdWydpbnN0YW5jZVVuaXF1ZUlkJ107XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb252ZXJzYXRpb24oZXh0ZXJuYWxJZCkudGhlbigoaW50ZXJhY3REYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBpbnRlcmFjdERhdGEuc2Vzc2lvbklkO1xuICAgICAgICAgIGJvZHkudmFyaWFibGVzLmNsaWVudENvbnZlcnNhdGlvbklkID0gY29udmVyc2F0aW9uSWQ7XG4gICAgICAgICAgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdWydpbnN0YW5jZVVuaXF1ZUlkJ10gPSBpbnRlcmFjdERhdGEuaW5zdGFuY2VVbmlxdWVJZDtcbiAgICAgICAgICBib2R5LnZhcmlhYmxlc1snUGFyZW50SW50ZXJhY3Rpb25JZCddID0gdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdWydpbnN0YW5jZVVuaXF1ZUlkJ107XG4gICAgICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICc/c2Vzc2lvbklkPScgKyBjb252ZXJzYXRpb25JZCwgYm9keSwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnVGVuYW50LUlkJzogdGhpcy50ZW5hbnRJZCxcbiAgICAgICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgICAgICdFbnZpcm9ubWVudC1OYW1lJzogdGhpcy5lbnZpcm9ubWVudCxcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbiBhbmQgc2VuZCBtZXNzYWdlJywgJ2l0IHRvb2sgJyArIChEYXRlLm5vdygpIC0gcFN0YXJ0KSArICdtcycpO1xuXG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgcmVzcG9uc2U6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgaW5zdGFuY2VVbmlxdWVJZDogdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdWydpbnN0YW5jZVVuaXF1ZUlkJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcblxuICAgICAgICAgICAgcExvZy5sb2coJ3N0YXJ0IGNvbnZlcnNhdGlvbiBhbmQgc2VuZCBtZXNzYWdlJywgJ2Vycm9yIGFmdGVyICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCA9IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnc2Vzc2lvbklkJ107XG5cbiAgICAgICAgYXhpb3MucG9zdCh0aGlzLnJlcXVlc3RCYXNlVXJsICsgdGhpcy50ZW5hbnRJZCArICcvY29udmVyc2F0aW9uL2RvbWFpbnMvJyArIHRoaXMuZG9tYWluTmFtZSArICc/c2Vzc2lvbklkPScgKyBib2R5LnZhcmlhYmxlcy5jbGllbnRDb252ZXJzYXRpb25JZCwgYm9keSwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdUZW5hbnQtSWQnOiB0aGlzLnRlbmFudElkLFxuICAgICAgICAgICAgJ0FwcGxpY2F0aW9uLUtleSc6IHRoaXMuYXBpQWlLZXksXG4gICAgICAgICAgICAnRW52aXJvbm1lbnQtTmFtZSc6IHRoaXMuZW52aXJvbm1lbnQsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgcExvZy5sb2coJ3NlbmQgbWVzc2FnZScsICdpdCB0b29rICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgcmVzcG9uc2U6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgIGluc3RhbmNlVW5pcXVlSWQ6IHRoaXMuc2Vzc2lvbk1hcFtleHRlcm5hbElkXVsnaW5zdGFuY2VVbmlxdWVJZCddXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBwTG9nLmxvZygnc2VuZCBtZXNzYWdlJywgJ2Vycm9yIGFmdGVyICcgKyAoRGF0ZS5ub3coKSAtIHBTdGFydCkgKyAnbXMnKTtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KSk7XG5cbiAgfVxuXG4gIHJlc2V0U2Vzc2lvbihleHRlcm5hbElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5zZXNzaW9uTWFwW2V4dGVybmFsSWRdO1xuICB9XG5cbn1cbiJdfQ==