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
    }
    //Response back to facebook
    respond(responseMessage, requestMessage, apiToken) {
        let payload = {
            recipient: {
                id: requestMessage.senderId
            },
        };
        if (responseMessage.interact && responseMessage.interact.length > 0) {
            responseMessage.interact.map((item) => {
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
            });
        }
        else if (responseMessage.nlp && responseMessage.nlp.length > 0) {
            responseMessage.nlp.map((item) => {
                if (!payload.message) {
                    payload.message = {
                        text: ''
                    };
                }
                // append the messages
                payload.message.text += item.text + '\n';
            });
        }
        else {
            // no response at all?
            log.warn('got not response at all!');
            payload.message = {
                text: 'Haven´t got any response that we currently support either from nlp or from interact.',
            };
        }
        console.log(payload);
        // send message:
        const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + apiToken;
        axios_1.default.post(url, payload).then((resp) => {
            if (log.info) {
                log.info('Answer send to facebook chat');
            }
        }).catch(err => {
            log.error('Error during answering to facebook chat request. %s, with payload %s', err.response.data.error.message, JSON.stringify(payload));
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBQzVELHNGQUE4RDtBQUM5RCw4RUFBZ0U7QUFDaEUsa0ZBQTBEO0FBRTFELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQyxNQUFxQixpQkFBaUI7SUFFcEM7SUFFQSxDQUFDO0lBRUgsMkJBQTJCO0lBQ3pCLE9BQU8sQ0FBQyxlQUFvQixFQUFFLGNBQStCLEVBQUUsUUFBZ0I7UUFFN0UsSUFBSSxPQUFPLEdBQVE7WUFDakIsU0FBUyxFQUFFO2dCQUNULEVBQUUsRUFBRSxjQUFjLENBQUMsUUFBUTthQUM1QjtTQUNGLENBQUM7UUFFRixJQUFJLGVBQWUsQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRW5FLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHO3dCQUNoQixJQUFJLEVBQUUsRUFBRTtxQkFDVCxDQUFDO2lCQUNIO2dCQUNELFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDakIsS0FBSyxtQkFBUyxDQUFDLElBQUk7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO3dCQUM3RCxNQUFNO29CQUVSLEtBQUssd0JBQWMsQ0FBQyxJQUFJ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UUFFOUIsTUFBTSxNQUFNLEdBQUcsd0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUVILENBQUM7Q0FHRjtBQXBKRCxvQ0FvSkM7QUFHRDs7Ozs7Ozs7Ozs7O0dBWUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhY2Vib29rTWVzc2FnZX0gZnJvbSBcIi4vRmFjZWJvb2tNZXNzYWdlUGFyc2VyXCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgTE9HID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWwvbG9nZ2luZ1wiKTtcbmltcG9ydCB7cGFyc2V9IGZyb20gJ25vZGUtaHRtbC1wYXJzZXInO1xuXG5pbXBvcnQgVGV4dE1vZGVsIGZyb20gXCIuLi8uLi9ubHAvbW9kZWwvVGV4dE1vZGVsXCI7XG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9UZXh0SW5wdXRNb2RlbFwiO1xuaW1wb3J0IEF0dGFjaG1lbnRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL0F0dGFjaG1lbnRNb2RlbFwiO1xuaW1wb3J0IENob2ljZU1vZGVsLCB7Q2hvaWNlfSBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL0Nob2ljZU1vZGVsXCI7XG5pbXBvcnQgVGVtcGxhdGVNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RlbXBsYXRlTW9kZWxcIjtcblxuY29uc3QgbG9nID0gTE9HLmxvZygnRmFjZWJvb2sgUmVzcG9uZGVyJyk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFjZWJvb2tSZXNwb25kZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuLy9SZXNwb25zZSBiYWNrIHRvIGZhY2Vib29rXG4gIHJlc3BvbmQocmVzcG9uc2VNZXNzYWdlOiBhbnksIHJlcXVlc3RNZXNzYWdlOiBGYWNlYm9va01lc3NhZ2UsIGFwaVRva2VuOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICByZWNpcGllbnQ6IHtcbiAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLnNlbmRlcklkXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAocmVzcG9uc2VNZXNzYWdlLmludGVyYWN0ICYmIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXBheWxvYWQubWVzc2FnZSkge1xuICAgICAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgIGNhc2UgVGV4dE1vZGVsLm5hbWU6XG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIG1lc3NhZ2VzXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0udGV4dCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBUZXh0SW5wdXRNb2RlbC5uYW1lOlxuICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnRleHQgKz0gdGhpcy5leHRyYWN0VGV4dChpdGVtLnF1ZXN0aW9uTGFiZWwpICsgJ1xcblxcbic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgQ2hvaWNlTW9kZWwubmFtZTpcbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBpbnRvIGJ1dHRvbnMgd2l0aCBwYXlsb2FkXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzID0gW107XG4gICAgICAgICAgICBpdGVtLmNob2ljZXMubWFwKChjaG9pY2U6IENob2ljZSkgPT4ge1xuXG4gICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBjaG9pY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgY2hvaWNlOiBjaG9pY2UsXG4gICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IGl0ZW0ucGFyYW1ldGVySWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL1wiaW1hZ2VfdXJsXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vaW1nL3JlZC5wbmdcIlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQXR0YWNobWVudE1vZGVsLm5hbWUgOlxuICAgICAgICAgICAgLy9Td2l0Y2ggb24gYXR0YWNoZWRUeXBlXG4gICAgICAgICAgICBpZihpdGVtLmF0dGFjaGVkVHlwZSA9PSAndmlkZW8nKXtcbiAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQubWVzc2FnZS50ZXh0O1xuICAgICAgICAgICAgICBsZXQgdXJsID0gJyc7XG4gICAgICAgICAgICAgIHVybCA9IGl0ZW0udXJsO1xuICAgICAgICAgICAgICBpZiAodXJsICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UuYXR0YWNobWVudCA9IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZW1wbGF0ZScsXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX3R5cGU6ICdvcGVuX2dyYXBoJyxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmF0dGFjaGVkVHlwZSA9PSAnYXVkaW8nKXtcbiAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQubWVzc2FnZS50ZXh0O1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSXRlbSB0eXBlOiAnICsgaXRlbS5hdHRhY2hlZFR5cGUpO1xuICAgICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5hdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgICAgICAgdHlwZTogaXRlbS5hdHRhY2hlZFR5cGUsXG4gICAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogaXRlbS51cmwsXG4gICAgICAgICAgICAgICAgICAgIGlzX3JldXNhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmF0dGFjaGVkVHlwZSA9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkLm1lc3NhZ2UudGV4dDtcbiAgICAgICAgICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgICAgICAgICB1cmwgPSBpdGVtLnVybDtcbiAgICAgICAgICAgICAgaWYgKHVybCAhPSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLmF0dGFjaG1lbnQgPSB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLmF0dGFjaGVkVHlwZSxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcbiAgICAgICAgICAgICAgICAgICAgaXNfcmV1c2FibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUZW1wbGF0ZU1vZGVsLm5hbWUgOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZU1lc3NhZ2UubmxwICYmIHJlc3BvbnNlTWVzc2FnZS5ubHAubGVuZ3RoID4gMCkge1xuXG4gICAgICByZXNwb25zZU1lc3NhZ2UubmxwLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBtZXNzYWdlc1xuICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSBpdGVtLnRleHQgKyAnXFxuJztcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIHJlc3BvbnNlIGF0IGFsbD9cbiAgICAgIGxvZy53YXJuKCdnb3Qgbm90IHJlc3BvbnNlIGF0IGFsbCEnKTtcbiAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgdGV4dDogJ0hhdmVuwrR0IGdvdCBhbnkgcmVzcG9uc2UgdGhhdCB3ZSBjdXJyZW50bHkgc3VwcG9ydCBlaXRoZXIgZnJvbSBubHAgb3IgZnJvbSBpbnRlcmFjdC4nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcblxuICAgIC8vIHNlbmQgbWVzc2FnZTpcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNi9tZS9tZXNzYWdlcz9hY2Nlc3NfdG9rZW49JyArIGFwaVRva2VuO1xuICAgIGF4aW9zLnBvc3QodXJsLCBwYXlsb2FkKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAobG9nLmluZm8pIHtcbiAgICAgICAgbG9nLmluZm8oJ0Fuc3dlciBzZW5kIHRvIGZhY2Vib29rIGNoYXQnKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgbG9nLmVycm9yKCdFcnJvciBkdXJpbmcgYW5zd2VyaW5nIHRvIGZhY2Vib29rIGNoYXQgcmVxdWVzdC4gJXMsIHdpdGggcGF5bG9hZCAlcycsIGVyci5yZXNwb25zZS5kYXRhLmVycm9yLm1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICB9KTtcblxuICB9XG5cblxuICBwcml2YXRlIGV4dHJhY3RUZXh0KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShodG1sKTtcblxuICAgIGlmIChwYXJzZWQudGV4dCAhPT0gJycpIHtcbiAgICAgIHJldHVybiBwYXJzZWQudGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gIH1cblxuXG59XG5cblxuLypcblxudmFyIHNlbmRNZXNzYWdlVG9GQiA9ICh1c2VySWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCB1c2VyTmFtZTogc3RyaW5nKSA9PiB7XG4gIG1lc3NhZ2VEYXRhLnJlY2lwaWVudC5pZCA9IHVzZXJJZDtcbiAgbWVzc2FnZURhdGEubWVzc2FnZS50ZXh0ID0gbWVzc2FnZTtcbiAgcmVxdWVzdCh7XG4gICAgdXJpOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPUVBQUZYbzlQaFE0OEJBSEJwd2VaQ1F3RDVhN0NuWkNMR3JOcXVmVkp3VU9NdEIxMXh5dzh1NUVqczRaQkhHOVVud1JyOXVFdFNzVFpDVHNaQkQ5S1lPNnY1RkQ4RzF4ak1QVGJOYWt3MkVqUmwwMzBlRGRXUWlXMlBYQlpCcEFUOTdZY2dsOXV0dFRxcEhJeWpxa0ZDakQ5d1pDWGlNVUlQWkJ0UWQ4M1pDZ1pBaVVFdU5EVHZzVjJYUGtZbUhGNXVncDRaQ3NaRFwiLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAganNvbjogbWVzc2FnZURhdGFcbiAgfSk7XG59XG5cbiAqL1xuIl19