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
const ChoiceModel_1 = __importDefault(require("../../nlp/model/ChoiceModel"));
const log = LOG.log('Facebook Responder');
class FacebookResponder {
    constructor() {
    }
    respond(responseMessage, requestMessage, apiToken) {
        // switch the different cases. For now we only have text response
        // let´t see if we have a interact response
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBRTVELDhFQUFnRTtBQUVoRSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFHMUMsTUFBcUIsaUJBQWlCO0lBRXBDO0lBRUEsQ0FBQztJQUdELE9BQU8sQ0FBQyxlQUFvQixFQUFFLGNBQStCLEVBQUUsUUFBZ0I7UUFFN0UsaUVBQWlFO1FBRWpFLDJDQUEyQztRQUUzQyxJQUFJLE9BQU8sR0FBUTtZQUNqQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRO2FBQzVCO1NBQ0YsQ0FBQztRQUdGLElBQUksZUFBZSxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFbkUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUc7d0JBQ2hCLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7aUJBQ0g7Z0JBRUQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNqQixLQUFLLG1CQUFTLENBQUMsSUFBSTt3QkFFakIsc0JBQXNCO3dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBRTdELE1BQU07b0JBR1IsS0FBSyx3QkFBYyxDQUFDLElBQUk7d0JBRXRCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQzt3QkFFdEUsTUFBTTtvQkFFUixLQUFLLHFCQUFXLENBQUMsSUFBSTt3QkFFbkIsc0NBQXNDO3dCQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQ3RFLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTs0QkFFbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dDQUNqQyxZQUFZLEVBQUMsTUFBTTtnQ0FDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dDQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQ0FDdEIsTUFBTSxFQUFFLE1BQU07b0NBQ2QsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXO2lDQUM1QixDQUFDO2dDQUNGLDhDQUE4Qzs2QkFDL0MsQ0FBQyxDQUFBO3dCQUVKLENBQUMsQ0FBQyxDQUFDO3dCQUVILE1BQU07aUJBQ1Q7WUFFSCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxlQUFlLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUVoRSxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRzt3QkFDaEIsSUFBSSxFQUFFLEVBQUU7cUJBQ1QsQ0FBQztpQkFDSDtnQkFFRCxzQkFBc0I7Z0JBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1NBRUo7YUFBTTtZQUNMLHNCQUFzQjtZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLE9BQU8sR0FBRztnQkFDaEIsSUFBSSxFQUFFLHNGQUFzRjthQUM3RixDQUFDO1NBQ0g7UUFFRCxnQkFBZ0I7UUFDaEIsTUFBTSxHQUFHLEdBQUcsMkRBQTJELEdBQUcsUUFBUSxDQUFDO1FBQ25GLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDWixHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7YUFDMUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixHQUFHLENBQUMsS0FBSyxDQUFDLHNFQUFzRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlJLENBQUMsQ0FBQyxDQUFBO0lBRUosQ0FBQztJQUdPLFdBQVcsQ0FBQyxJQUFZO1FBRTlCLE1BQU0sTUFBTSxHQUFHLHdCQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDcEI7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFFSCxDQUFDO0NBR0Y7QUFuSEQsb0NBbUhDO0FBR0Q7Ozs7Ozs7Ozs7OztHQVlHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGYWNlYm9va01lc3NhZ2V9IGZyb20gXCIuL0ZhY2Vib29rTWVzc2FnZVBhcnNlclwiO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IExPRyA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlsL2xvZ2dpbmdcIik7XG5pbXBvcnQge3BhcnNlfSBmcm9tICdub2RlLWh0bWwtcGFyc2VyJztcblxuaW1wb3J0IFRleHRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RleHRNb2RlbFwiO1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuLi8uLi9ubHAvbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9BdHRhY2htZW50TW9kZWxcIjtcbmltcG9ydCBDaG9pY2VNb2RlbCwge0Nob2ljZX0gZnJvbSBcIi4uLy4uL25scC9tb2RlbC9DaG9pY2VNb2RlbFwiO1xuXG5jb25zdCBsb2cgPSBMT0cubG9nKCdGYWNlYm9vayBSZXNwb25kZXInKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWNlYm9va1Jlc3BvbmRlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG5cbiAgcmVzcG9uZChyZXNwb25zZU1lc3NhZ2U6IGFueSwgcmVxdWVzdE1lc3NhZ2U6IEZhY2Vib29rTWVzc2FnZSwgYXBpVG9rZW46IHN0cmluZyk6IHZvaWQge1xuXG4gICAgLy8gc3dpdGNoIHRoZSBkaWZmZXJlbnQgY2FzZXMuIEZvciBub3cgd2Ugb25seSBoYXZlIHRleHQgcmVzcG9uc2VcblxuICAgIC8vIGxldMK0dCBzZWUgaWYgd2UgaGF2ZSBhIGludGVyYWN0IHJlc3BvbnNlXG5cbiAgICBsZXQgcGF5bG9hZDogYW55ID0ge1xuICAgICAgcmVjaXBpZW50OiB7XG4gICAgICAgIGlkOiByZXF1ZXN0TWVzc2FnZS5zZW5kZXJJZFxuICAgICAgfSxcbiAgICB9O1xuXG5cbiAgICBpZiAocmVzcG9uc2VNZXNzYWdlLmludGVyYWN0ICYmIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5tYXAoKGl0ZW06IGFueSkgPT4ge1xuXG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFRleHRNb2RlbC5uYW1lOlxuXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIG1lc3NhZ2VzXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0udGV4dCkgKyAnXFxuXFxuJztcblxuICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgIGNhc2UgVGV4dElucHV0TW9kZWwubmFtZTpcblxuICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnRleHQgKz0gdGhpcy5leHRyYWN0VGV4dChpdGVtLnF1ZXN0aW9uTGFiZWwpICsgJ1xcblxcbic7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSBDaG9pY2VNb2RlbC5uYW1lOlxuXG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm0gaW50byBidXR0b25zIHdpdGggcGF5bG9hZFxuICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlLnRleHQgKz0gdGhpcy5leHRyYWN0VGV4dChpdGVtLnF1ZXN0aW9uTGFiZWwpICsgJ1xcblxcbic7XG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UucXVpY2tfcmVwbGllcyA9IFtdO1xuICAgICAgICAgICAgaXRlbS5jaG9pY2VzLm1hcCgoY2hvaWNlOiBDaG9pY2UpID0+IHtcblxuICAgICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UucXVpY2tfcmVwbGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb250ZW50X3R5cGU6J3RleHQnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBjaG9pY2UubGFiZWwsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgY2hvaWNlOiBjaG9pY2UsXG4gICAgICAgICAgICAgICAgICBzZWN0aW9uSWQ6IGl0ZW0ucGFyYW1ldGVySWQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL1wiaW1hZ2VfdXJsXCI6XCJodHRwOi8vZXhhbXBsZS5jb20vaW1nL3JlZC5wbmdcIlxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZU1lc3NhZ2UubmxwICYmIHJlc3BvbnNlTWVzc2FnZS5ubHAubGVuZ3RoID4gMCkge1xuXG4gICAgICByZXNwb25zZU1lc3NhZ2UubmxwLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBtZXNzYWdlc1xuICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSBpdGVtLnRleHQgKyAnXFxuJztcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIHJlc3BvbnNlIGF0IGFsbD9cbiAgICAgIGxvZy53YXJuKCdnb3Qgbm90IHJlc3BvbnNlIGF0IGFsbCEnKTtcbiAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgdGV4dDogJ0hhdmVuwrR0IGdvdCBhbnkgcmVzcG9uc2UgdGhhdCB3ZSBjdXJyZW50bHkgc3VwcG9ydCBlaXRoZXIgZnJvbSBubHAgb3IgZnJvbSBpbnRlcmFjdC4nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBzZW5kIG1lc3NhZ2U6XG4gICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPScgKyBhcGlUb2tlbjtcbiAgICBheGlvcy5wb3N0KHVybCwgcGF5bG9hZCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKGxvZy5pbmZvKSB7XG4gICAgICAgIGxvZy5pbmZvKCdBbnN3ZXIgc2VuZCB0byBmYWNlYm9vayBjaGF0Jyk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGxvZy5lcnJvcignRXJyb3IgZHVyaW5nIGFuc3dlcmluZyB0byBmYWNlYm9vayBjaGF0IHJlcXVlc3QuICVzLCB3aXRoIHBheWxvYWQgJXMnLCBlcnIucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgfSlcblxuICB9XG5cblxuICBwcml2YXRlIGV4dHJhY3RUZXh0KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShodG1sKTtcblxuICAgIGlmIChwYXJzZWQudGV4dCAhPT0gJycpIHtcbiAgICAgIHJldHVybiBwYXJzZWQudGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gIH1cblxuXG59XG5cblxuLypcblxudmFyIHNlbmRNZXNzYWdlVG9GQiA9ICh1c2VySWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCB1c2VyTmFtZTogc3RyaW5nKSA9PiB7XG4gIG1lc3NhZ2VEYXRhLnJlY2lwaWVudC5pZCA9IHVzZXJJZDtcbiAgbWVzc2FnZURhdGEubWVzc2FnZS50ZXh0ID0gbWVzc2FnZTtcbiAgcmVxdWVzdCh7XG4gICAgdXJpOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPUVBQUZYbzlQaFE0OEJBSEJwd2VaQ1F3RDVhN0NuWkNMR3JOcXVmVkp3VU9NdEIxMXh5dzh1NUVqczRaQkhHOVVud1JyOXVFdFNzVFpDVHNaQkQ5S1lPNnY1RkQ4RzF4ak1QVGJOYWt3MkVqUmwwMzBlRGRXUWlXMlBYQlpCcEFUOTdZY2dsOXV0dFRxcEhJeWpxa0ZDakQ5d1pDWGlNVUlQWkJ0UWQ4M1pDZ1pBaVVFdU5EVHZzVjJYUGtZbUhGNXVncDRaQ3NaRFwiLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAganNvbjogbWVzc2FnZURhdGFcbiAgfSk7XG59XG5cbiAqL1xuIl19