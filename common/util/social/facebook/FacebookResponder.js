"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const LOG = require("../../../util/logging");
const node_html_parser_1 = require("node-html-parser");
const TextModel_1 = __importDefault(require("../../nlp/model/TextModel"));
const axios_1 = __importDefault(require("axios"));
const TextInputModel_1 = __importDefault(require("../../nlp/model/TextInputModel"));
const AttachmentModel_1 = __importDefault(require("../../nlp/model/AttachmentModel"));
const ChoiceModel_1 = __importDefault(require("../../nlp/model/ChoiceModel"));
const TemplateModel_1 = __importDefault(require("../../nlp/model/TemplateModel"));
const log = LOG.log('Facebook Responder');
class FacebookResponder {
    constructor() {
        this._messageQueue = [];
    }
    //Response back to facebook
    respond(responseMessage, requestMessage, apiToken) {
        if (responseMessage.interact && responseMessage.interact.length > 0) {
            responseMessage.interact.map((item) => {
                let payload = {
                    recipient: {
                        id: requestMessage.senderId
                    },
                };
                if (!payload.message) {
                    payload.message = {
                        text: ''
                    };
                }
                switch (item.type) {
                    case TextModel_1.default.name:
                        // append the messages
                        payload.message.text += this.extractText(item.text) + '\n\n';
                        break;
                    case TextInputModel_1.default.name:
                        payload.message.text += this.extractText(item.questionLabel) + '\n\n';
                        break;
                    case ChoiceModel_1.default.name:
                        // transform into buttons with payload
                        payload.message.text += this.extractText(item.questionLabel) + '\n\n';
                        payload.message.quick_replies = [];
                        item.choices.map((choice) => {
                            payload.message.quick_replies.push({
                                content_type: 'text',
                                title: choice.label,
                                payload: JSON.stringify({
                                    choice: choice,
                                    sectionId: item.parameterId,
                                })
                                //"image_url":"http://example.com/img/red.png"
                            });
                        });
                        break;
                    case AttachmentModel_1.default.name:
                        //Switch on attachedType
                        if (item.attachedType == 'video') {
                            delete payload.message.text;
                            let url = '';
                            url = item.url;
                            if (url != 'undefined') {
                                payload.message.attachment = {
                                    type: 'template',
                                    payload: {
                                        template_type: 'open_graph',
                                        elements: [{
                                                url: item.url
                                            }]
                                    }
                                };
                            }
                        }
                        else if (item.attachedType == 'audio') {
                            delete payload.message.text;
                            console.log('Item type: ' + item.attachedType);
                            payload.message.attachment = {
                                type: item.attachedType,
                                payload: {
                                    url: item.url,
                                    is_reusable: true
                                }
                            };
                        }
                        else if (item.attachedType == 'image') {
                            delete payload.message.text;
                            let url = '';
                            url = item.url;
                            if (url != 'undefined') {
                                payload.message.attachment = {
                                    type: item.attachedType,
                                    payload: {
                                        url: item.url,
                                        is_reusable: true
                                    }
                                };
                            }
                        }
                        break;
                    case TemplateModel_1.default.name:
                        break;
                }
                this._addMessageToQueue(payload, apiToken);
            });
        }
        else if (responseMessage.nlp && responseMessage.nlp.length > 0) {
            let payload = {
                recipient: {
                    id: requestMessage.senderId
                },
            };
            responseMessage.nlp.map((item) => {
                if (!payload.message) {
                    payload.message = {
                        text: ''
                    };
                }
                // append the messages
                payload.message.text += item.text + '\n';
            });
            this._addMessageToQueue(payload, apiToken);
        }
        else {
            let payload = {
                recipient: {
                    id: requestMessage.senderId
                },
            };
            // no response at all?
            log.warn('got not response at all!');
            payload.message = {
                text: 'Haven´t got any response that we currently support either from nlp or from interact.',
            };
            this._addMessageToQueue(payload, apiToken);
        }
        this._messageQueue = this._messageQueue.reverse();
        this._sendMessage();
    }
    textRespond(text, recipientId, apiToken) {
        let payload = {
            recipient: {
                id: recipientId,
            },
            message: {
                text: text
            }
        };
        this._addMessageToQueue(payload, apiToken);
        this._sendMessage();
    }
    _addMessageToQueue(payload, apiToken) {
        this._messageQueue.push({
            payload: payload,
            apiToken: apiToken,
        });
    }
    _sendMessage() {
        if (this._messageQueue.length > 0) {
            const first = this._messageQueue.pop();
            // send message:
            const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + first.apiToken;
            axios_1.default.post(url, first.payload).then((resp) => {
                if (log.info) {
                    log.info('Answer send to facebook chat');
                }
                this._sendMessage();
            }).catch(err => {
                log.error('Error during answering to facebook chat request. %s, with payload %s', err.response.data.error.message, JSON.stringify(first.payload));
                this._sendMessage();
            });
        }
    }
    extractText(html) {
        const parsed = node_html_parser_1.parse(html);
        if (parsed.text !== '') {
            return parsed.text;
        }
        else {
            return html;
        }
    }
}
exports.default = FacebookResponder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBQzVELHNGQUE4RDtBQUM5RCw4RUFBZ0U7QUFDaEUsa0ZBQTBEO0FBRTFELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQyxNQUFxQixpQkFBaUI7SUFJcEM7UUFGUSxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQUlsQyxDQUFDO0lBRUgsMkJBQTJCO0lBQ3pCLE9BQU8sQ0FBQyxlQUFvQixFQUFFLGNBQStCLEVBQUUsUUFBZ0I7UUFFN0UsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUVuRSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUV6QyxJQUFJLE9BQU8sR0FBUTtvQkFDakIsU0FBUyxFQUFFO3dCQUNULEVBQUUsRUFBRSxjQUFjLENBQUMsUUFBUTtxQkFDNUI7aUJBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRzt3QkFDaEIsSUFBSSxFQUFFLEVBQUU7cUJBQ1QsQ0FBQztpQkFDSDtnQkFDRCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pCLEtBQUssbUJBQVMsQ0FBQyxJQUFJO3dCQUNqQixzQkFBc0I7d0JBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQzt3QkFDN0Qs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QyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xKLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUdKO0lBR0gsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFZO1FBRTlCLE1BQU0sTUFBTSxHQUFHLHdCQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDcEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFFSCxDQUFDO0NBR0Y7QUF0TkQsb0NBc05DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGYWNlYm9va01lc3NhZ2V9IGZyb20gXCIuL0ZhY2Vib29rTWVzc2FnZVBhcnNlclwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IExPRyA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsL2xvZ2dpbmdcIik7XG5pbXBvcnQge3BhcnNlfSBmcm9tICdub2RlLWh0bWwtcGFyc2VyJztcblxuaW1wb3J0IFRleHRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RleHRNb2RlbFwiO1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuLi8uLi9ubHAvbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9BdHRhY2htZW50TW9kZWxcIjtcbmltcG9ydCBDaG9pY2VNb2RlbCwge0Nob2ljZX0gZnJvbSBcIi4uLy4uL25scC9tb2RlbC9DaG9pY2VNb2RlbFwiO1xuaW1wb3J0IFRlbXBsYXRlTW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9UZW1wbGF0ZU1vZGVsXCI7XG5cbmNvbnN0IGxvZyA9IExPRy5sb2coJ0ZhY2Vib29rIFJlc3BvbmRlcicpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rUmVzcG9uZGVyIHtcblxuICBwcml2YXRlIF9tZXNzYWdlUXVldWU6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4vL1Jlc3BvbnNlIGJhY2sgdG8gZmFjZWJvb2tcbiAgcmVzcG9uZChyZXNwb25zZU1lc3NhZ2U6IGFueSwgcmVxdWVzdE1lc3NhZ2U6IEZhY2Vib29rTWVzc2FnZSwgYXBpVG9rZW46IHN0cmluZyk6IHZvaWQge1xuXG4gICAgaWYgKHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdCAmJiByZXNwb25zZU1lc3NhZ2UuaW50ZXJhY3QubGVuZ3RoID4gMCkge1xuXG4gICAgICByZXNwb25zZU1lc3NhZ2UuaW50ZXJhY3QubWFwKChpdGVtOiBhbnkpID0+IHtcblxuICAgICAgICBsZXQgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICAgIHJlY2lwaWVudDoge1xuICAgICAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLnNlbmRlcklkXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXBheWxvYWQubWVzc2FnZSkge1xuICAgICAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgIGNhc2UgVGV4dE1vZGVsLm5hbWU6XG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIG1lc3NhZ2VzXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0udGV4dCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBUZXh0SW5wdXRNb2RlbC5uYW1lOlxuICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnRleHQgKz0gdGhpcy5leHRyYWN0VGV4dChpdGVtLnF1ZXN0aW9uTGFiZWwpICsgJ1xcblxcbic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgQ2hvaWNlTW9kZWwubmFtZTpcbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBpbnRvIGJ1dHRvbnMgd2l0aCBwYXlsb2FkXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzID0gW107XG4gICAgICAgICAgICBpdGVtLmNob2ljZXMubWFwKChjaG9pY2U6IENob2ljZSkgPT4ge1xuXG4gICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBjaG9pY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgY2hvaWNlOiBjaG9pY2UsXG4gICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IGl0ZW0ucGFyYW1ldGVySWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL1wiaW1hZ2VfdXJsXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vaW1nL3JlZC5wbmdcIlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0YWNobWVudE1vZGVsLm5hbWUgOlxuICAgICAgICAgICAgLy9Td2l0Y2ggb24gYXR0YWNoZWRUeXBlXG4gICAgICAgICAgICBpZiAoaXRlbS5hdHRhY2hlZFR5cGUgPT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZC5tZXNzYWdlLnRleHQ7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgICAgICAgICAgdXJsID0gaXRlbS51cmw7XG4gICAgICAgICAgICAgIGlmICh1cmwgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UuYXR0YWNobWVudCA9IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZW1wbGF0ZScsXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX3R5cGU6ICdvcGVuX2dyYXBoJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmF0dGFjaGVkVHlwZSA9PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkLm1lc3NhZ2UudGV4dDtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0l0ZW0gdHlwZTogJyArIGl0ZW0uYXR0YWNoZWRUeXBlKTtcbiAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLmF0dGFjaG1lbnQgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogaXRlbS5hdHRhY2hlZFR5cGUsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgIGlzX3JldXNhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uYXR0YWNoZWRUeXBlID09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQubWVzc2FnZS50ZXh0O1xuICAgICAgICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgICAgICAgIHVybCA9IGl0ZW0udXJsO1xuICAgICAgICAgICAgICBpZiAodXJsICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLmF0dGFjaG1lbnQgPSB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLmF0dGFjaGVkVHlwZSxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgICAgaXNfcmV1c2FibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUZW1wbGF0ZU1vZGVsLm5hbWUgOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hZGRNZXNzYWdlVG9RdWV1ZShwYXlsb2FkLCBhcGlUb2tlbik7XG5cblxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZU1lc3NhZ2UubmxwICYmIHJlc3BvbnNlTWVzc2FnZS5ubHAubGVuZ3RoID4gMCkge1xuXG4gICAgICBsZXQgcGF5bG9hZDogYW55ID0ge1xuICAgICAgICByZWNpcGllbnQ6IHtcbiAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2Uuc2VuZGVySWRcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5ubHAubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFwYXlsb2FkLm1lc3NhZ2UpIHtcbiAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBlbmQgdGhlIG1lc3NhZ2VzXG4gICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IGl0ZW0udGV4dCArICdcXG4nO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2FkZE1lc3NhZ2VUb1F1ZXVlKHBheWxvYWQsIGFwaVRva2VuKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgIHJlY2lwaWVudDoge1xuICAgICAgICAgIGlkOiByZXF1ZXN0TWVzc2FnZS5zZW5kZXJJZFxuICAgICAgICB9LFxuICAgICAgfTtcblxuXG4gICAgICAvLyBubyByZXNwb25zZSBhdCBhbGw/XG4gICAgICBsb2cud2FybignZ290IG5vdCByZXNwb25zZSBhdCBhbGwhJyk7XG4gICAgICBwYXlsb2FkLm1lc3NhZ2UgPSB7XG4gICAgICAgIHRleHQ6ICdIYXZlbsK0dCBnb3QgYW55IHJlc3BvbnNlIHRoYXQgd2UgY3VycmVudGx5IHN1cHBvcnQgZWl0aGVyIGZyb20gbmxwIG9yIGZyb20gaW50ZXJhY3QuJyxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2FkZE1lc3NhZ2VUb1F1ZXVlKHBheWxvYWQsIGFwaVRva2VuKTtcblxuICAgIH1cblxuXG4gICAgdGhpcy5fbWVzc2FnZVF1ZXVlID0gdGhpcy5fbWVzc2FnZVF1ZXVlLnJldmVyc2UoKTtcbiAgICB0aGlzLl9zZW5kTWVzc2FnZSgpO1xuXG5cbiAgfVxuXG4gIHRleHRSZXNwb25kKHRleHQ6IHN0cmluZywgcmVjaXBpZW50SWQ6IHN0cmluZywgYXBpVG9rZW46IHN0cmluZykge1xuXG4gICAgbGV0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgIHJlY2lwaWVudDoge1xuICAgICAgICBpZDogcmVjaXBpZW50SWQsXG4gICAgICB9LFxuICAgICAgbWVzc2FnZToge1xuICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuX2FkZE1lc3NhZ2VUb1F1ZXVlKHBheWxvYWQsIGFwaVRva2VuKTtcbiAgICB0aGlzLl9zZW5kTWVzc2FnZSgpO1xuXG4gIH1cblxuICBwcml2YXRlIF9hZGRNZXNzYWdlVG9RdWV1ZShwYXlsb2FkOiBhbnksIGFwaVRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXNzYWdlUXVldWUucHVzaCh7XG4gICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgYXBpVG9rZW46IGFwaVRva2VuLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VuZE1lc3NhZ2UoKTogdm9pZCB7XG5cblxuICAgIGlmICh0aGlzLl9tZXNzYWdlUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLl9tZXNzYWdlUXVldWUucG9wKCk7XG5cbiAgICAgIC8vIHNlbmQgbWVzc2FnZTpcbiAgICAgIGNvbnN0IHVybCA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS92Mi42L21lL21lc3NhZ2VzP2FjY2Vzc190b2tlbj0nICsgZmlyc3QuYXBpVG9rZW47XG4gICAgICBheGlvcy5wb3N0KHVybCwgZmlyc3QucGF5bG9hZCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICBpZiAobG9nLmluZm8pIHtcbiAgICAgICAgICBsb2cuaW5mbygnQW5zd2VyIHNlbmQgdG8gZmFjZWJvb2sgY2hhdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UoKTtcblxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgbG9nLmVycm9yKCdFcnJvciBkdXJpbmcgYW5zd2VyaW5nIHRvIGZhY2Vib29rIGNoYXQgcmVxdWVzdC4gJXMsIHdpdGggcGF5bG9hZCAlcycsIGVyci5yZXNwb25zZS5kYXRhLmVycm9yLm1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KGZpcnN0LnBheWxvYWQpKTtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UoKTtcbiAgICAgIH0pO1xuXG5cbiAgICB9XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0VGV4dChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoaHRtbCk7XG5cbiAgICBpZiAocGFyc2VkLnRleHQgIT09ICcnKSB7XG4gICAgICByZXR1cm4gcGFyc2VkLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICB9XG5cblxufVxuIl19