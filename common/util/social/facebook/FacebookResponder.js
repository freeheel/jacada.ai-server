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
/*

var sendMessageToFB = (userId: string, message: any, userName: string) => {
  messageData.recipient.id = userId;
  messageData.message.text = message;
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAFXo9PhQ48BAHBpweZCQwD5a7CnZCLGrNqufVJwUOMtB11xyw8u5Ejs4ZBHG9UnwRr9uEtSsTZCTsZBD9KYO6v5FD8G1xjMPTbNakw2EjRl030eDdWQiW2PXBZBpAT97Ycgl9uttTqpHIyjqkFCjD9wZCXiMUIPZBtQd83ZCgZAiUEuNDTvsV2XPkYmHF5ugp4ZCsZD",
    method: "POST",
    json: messageData
  });
}

 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBQzVELHNGQUE4RDtBQUM5RCw4RUFBZ0U7QUFDaEUsa0ZBQTBEO0FBRTFELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQyxNQUFxQixpQkFBaUI7SUFFcEM7UUFvSlEsa0JBQWEsR0FBVSxFQUFFLENBQUM7SUFsSmxDLENBQUM7SUFFSCwyQkFBMkI7SUFDekIsT0FBTyxDQUFDLGVBQW9CLEVBQUUsY0FBK0IsRUFBRSxRQUFnQjtRQUU3RSxJQUFJLGVBQWUsQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRW5FLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBRXpDLElBQUksT0FBTyxHQUFRO29CQUNqQixTQUFTLEVBQUU7d0JBQ1QsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRO3FCQUM1QjtpQkFDRixDQUFDO2dCQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHO3dCQUNoQixJQUFJLEVBQUUsRUFBRTtxQkFDVCxDQUFDO2lCQUNIO2dCQUNELFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDakIsS0FBSyxtQkFBUyxDQUFDLElBQUk7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO3dCQUM3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U0FDcEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFFSCxDQUFDO0NBR0Y7QUF4TUQsb0NBd01DO0FBR0Q7Ozs7Ozs7Ozs7OztHQVlHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGYWNlYm9va01lc3NhZ2V9IGZyb20gXCIuL0ZhY2Vib29rTWVzc2FnZVBhcnNlclwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IExPRyA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsL2xvZ2dpbmdcIik7XG5pbXBvcnQge3BhcnNlfSBmcm9tICdub2RlLWh0bWwtcGFyc2VyJztcblxuaW1wb3J0IFRleHRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RleHRNb2RlbFwiO1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuLi8uLi9ubHAvbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9BdHRhY2htZW50TW9kZWxcIjtcbmltcG9ydCBDaG9pY2VNb2RlbCwge0Nob2ljZX0gZnJvbSBcIi4uLy4uL25scC9tb2RlbC9DaG9pY2VNb2RlbFwiO1xuaW1wb3J0IFRlbXBsYXRlTW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9UZW1wbGF0ZU1vZGVsXCI7XG5cbmNvbnN0IGxvZyA9IExPRy5sb2coJ0ZhY2Vib29rIFJlc3BvbmRlcicpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rUmVzcG9uZGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbi8vUmVzcG9uc2UgYmFjayB0byBmYWNlYm9va1xuICByZXNwb25kKHJlc3BvbnNlTWVzc2FnZTogYW55LCByZXF1ZXN0TWVzc2FnZTogRmFjZWJvb2tNZXNzYWdlLCBhcGlUb2tlbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAocmVzcG9uc2VNZXNzYWdlLmludGVyYWN0ICYmIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuXG4gICAgICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgICAgcmVjaXBpZW50OiB7XG4gICAgICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2Uuc2VuZGVySWRcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICAgICAgY2FzZSBUZXh0TW9kZWwubmFtZTpcbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgbWVzc2FnZXNcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IHRoaXMuZXh0cmFjdFRleHQoaXRlbS50ZXh0KSArICdcXG5cXG4nO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIFRleHRJbnB1dE1vZGVsLm5hbWU6XG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBDaG9pY2VNb2RlbC5uYW1lOlxuICAgICAgICAgICAgLy8gdHJhbnNmb3JtIGludG8gYnV0dG9ucyB3aXRoIHBheWxvYWRcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IHRoaXMuZXh0cmFjdFRleHQoaXRlbS5xdWVzdGlvbkxhYmVsKSArICdcXG5cXG4nO1xuICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnF1aWNrX3JlcGxpZXMgPSBbXTtcbiAgICAgICAgICAgIGl0ZW0uY2hvaWNlcy5tYXAoKGNob2ljZTogQ2hvaWNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnF1aWNrX3JlcGxpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29udGVudF90eXBlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNob2ljZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICBjaG9pY2U6IGNob2ljZSxcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25JZDogaXRlbS5wYXJhbWV0ZXJJZCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vXCJpbWFnZV91cmxcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9pbWcvcmVkLnBuZ1wiXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBBdHRhY2htZW50TW9kZWwubmFtZSA6XG4gICAgICAgICAgICAvL1N3aXRjaCBvbiBhdHRhY2hlZFR5cGVcbiAgICAgICAgICAgIGlmIChpdGVtLmF0dGFjaGVkVHlwZSA9PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkLm1lc3NhZ2UudGV4dDtcbiAgICAgICAgICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgICAgICAgICB1cmwgPSBpdGVtLnVybDtcbiAgICAgICAgICAgICAgaWYgKHVybCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5hdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ3RlbXBsYXRlJyxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVfdHlwZTogJ29wZW5fZ3JhcGgnLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogW3tcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6IGl0ZW0udXJsXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uYXR0YWNoZWRUeXBlID09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQubWVzc2FnZS50ZXh0O1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSXRlbSB0eXBlOiAnICsgaXRlbS5hdHRhY2hlZFR5cGUpO1xuICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UuYXR0YWNobWVudCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLmF0dGFjaGVkVHlwZSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICB1cmw6IGl0ZW0udXJsLFxuICAgICAgICAgICAgICAgICAgaXNfcmV1c2FibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5hdHRhY2hlZFR5cGUgPT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZC5tZXNzYWdlLnRleHQ7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgICAgICAgICAgdXJsID0gaXRlbS51cmw7XG4gICAgICAgICAgICAgIGlmICh1cmwgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UuYXR0YWNobWVudCA9IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0uYXR0YWNoZWRUeXBlLFxuICAgICAgICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGl0ZW0udXJsLFxuICAgICAgICAgICAgICAgICAgICBpc19yZXVzYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRlbXBsYXRlTW9kZWwubmFtZSA6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkZE1lc3NhZ2VUb1F1ZXVlKHBheWxvYWQsIGFwaVRva2VuKTtcblxuXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZS5ubHAgJiYgcmVzcG9uc2VNZXNzYWdlLm5scC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICAgIHJlY2lwaWVudDoge1xuICAgICAgICAgIGlkOiByZXF1ZXN0TWVzc2FnZS5zZW5kZXJJZFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmVzcG9uc2VNZXNzYWdlLm5scC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXBheWxvYWQubWVzc2FnZSkge1xuICAgICAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgbWVzc2FnZXNcbiAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnRleHQgKz0gaXRlbS50ZXh0ICsgJ1xcbic7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fYWRkTWVzc2FnZVRvUXVldWUocGF5bG9hZCwgYXBpVG9rZW4pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgbGV0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgICAgcmVjaXBpZW50OiB7XG4gICAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLnNlbmRlcklkXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG5cbiAgICAgIC8vIG5vIHJlc3BvbnNlIGF0IGFsbD9cbiAgICAgIGxvZy53YXJuKCdnb3Qgbm90IHJlc3BvbnNlIGF0IGFsbCEnKTtcbiAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgdGV4dDogJ0hhdmVuwrR0IGdvdCBhbnkgcmVzcG9uc2UgdGhhdCB3ZSBjdXJyZW50bHkgc3VwcG9ydCBlaXRoZXIgZnJvbSBubHAgb3IgZnJvbSBpbnRlcmFjdC4nLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fYWRkTWVzc2FnZVRvUXVldWUocGF5bG9hZCwgYXBpVG9rZW4pO1xuXG4gICAgfVxuXG5cbiAgICB0aGlzLl9tZXNzYWdlUXVldWUgPSB0aGlzLl9tZXNzYWdlUXVldWUucmV2ZXJzZSgpO1xuICAgIHRoaXMuX3NlbmRNZXNzYWdlKCk7XG5cblxuICB9XG5cbiAgcHJpdmF0ZSBfbWVzc2FnZVF1ZXVlOiBhbnlbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2FkZE1lc3NhZ2VUb1F1ZXVlKHBheWxvYWQ6IGFueSwgYXBpVG9rZW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX21lc3NhZ2VRdWV1ZS5wdXNoKHtcbiAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICBhcGlUb2tlbjogYXBpVG9rZW4sXG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgX3NlbmRNZXNzYWdlKCk6IHZvaWQge1xuXG5cbiAgICBpZiAodGhpcy5fbWVzc2FnZVF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5fbWVzc2FnZVF1ZXVlLnBvcCgpO1xuXG4gICAgICAvLyBzZW5kIG1lc3NhZ2U6XG4gICAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNi9tZS9tZXNzYWdlcz9hY2Nlc3NfdG9rZW49JyArIGZpcnN0LmFwaVRva2VuO1xuICAgICAgYXhpb3MucG9zdCh1cmwsIGZpcnN0LnBheWxvYWQpLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgaWYgKGxvZy5pbmZvKSB7XG4gICAgICAgICAgbG9nLmluZm8oJ0Fuc3dlciBzZW5kIHRvIGZhY2Vib29rIGNoYXQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKCk7XG5cbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGxvZy5lcnJvcignRXJyb3IgZHVyaW5nIGFuc3dlcmluZyB0byBmYWNlYm9vayBjaGF0IHJlcXVlc3QuICVzLCB3aXRoIHBheWxvYWQgJXMnLCBlcnIucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLCBKU09OLnN0cmluZ2lmeShmaXJzdC5wYXlsb2FkKSk7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKCk7XG4gICAgICB9KTtcblxuXG4gICAgfVxuXG5cbiAgfVxuXG5cbiAgcHJpdmF0ZSBleHRyYWN0VGV4dChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoaHRtbCk7XG5cbiAgICBpZiAocGFyc2VkLnRleHQgIT09ICcnKSB7XG4gICAgICByZXR1cm4gcGFyc2VkLnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICB9XG5cblxufVxuXG5cbi8qXG5cbnZhciBzZW5kTWVzc2FnZVRvRkIgPSAodXNlcklkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSwgdXNlck5hbWU6IHN0cmluZykgPT4ge1xuICBtZXNzYWdlRGF0YS5yZWNpcGllbnQuaWQgPSB1c2VySWQ7XG4gIG1lc3NhZ2VEYXRhLm1lc3NhZ2UudGV4dCA9IG1lc3NhZ2U7XG4gIHJlcXVlc3Qoe1xuICAgIHVyaTogXCJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS92Mi42L21lL21lc3NhZ2VzP2FjY2Vzc190b2tlbj1FQUFGWG85UGhRNDhCQUhCcHdlWkNRd0Q1YTdDblpDTEdyTnF1ZlZKd1VPTXRCMTF4eXc4dTVFanM0WkJIRzlVbndScjl1RXRTc1RaQ1RzWkJEOUtZTzZ2NUZEOEcxeGpNUFRiTmFrdzJFalJsMDMwZURkV1FpVzJQWEJaQnBBVDk3WWNnbDl1dHRUcXBISXlqcWtGQ2pEOXdaQ1hpTVVJUFpCdFFkODNaQ2daQWlVRXVORFR2c1YyWFBrWW1IRjV1Z3A0WkNzWkRcIixcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGpzb246IG1lc3NhZ2VEYXRhXG4gIH0pO1xufVxuXG4gKi9cbiJdfQ==