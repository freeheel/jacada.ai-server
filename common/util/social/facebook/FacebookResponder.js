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
                                payload: {
                                    choice: choice,
                                    sectionId: item.parameterId,
                                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBQzVELDhFQUFnRTtBQUVoRSxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFHMUMsTUFBcUIsaUJBQWlCO0lBRXBDO0lBRUEsQ0FBQztJQUdELE9BQU8sQ0FBQyxlQUFvQixFQUFFLGNBQStCLEVBQUUsUUFBZ0I7UUFFN0UsaUVBQWlFO1FBRWpFLDJDQUEyQztRQUUzQyxJQUFJLE9BQU8sR0FBUTtZQUNqQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRO2FBQzVCO1NBQ0YsQ0FBQztRQUdGLElBQUksZUFBZSxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFbkUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUc7d0JBQ2hCLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7aUJBQ0g7Z0JBRUQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNqQixLQUFLLG1CQUFTLENBQUMsSUFBSTt3QkFFakIsc0JBQXNCO3dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBRTdELE1BQU07b0JBR1IsS0FBSyx3QkFBYyxDQUFDLElBQUk7d0JBRXRCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQzt3QkFFdEUsTUFBTTtvQkFFUixLQUFLLHFCQUFXLENBQUMsSUFBSTt3QkFFbkIsc0NBQXNDO3dCQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQ3RFLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTs0QkFFbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dDQUNqQyxZQUFZLEVBQUMsTUFBTTtnQ0FDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dDQUNuQixPQUFPLEVBQUU7b0NBQ1AsTUFBTSxFQUFFLE1BQU07b0NBQ2QsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXO2lDQUM1Qjs2QkFFRixDQUFDLENBQUE7d0JBRUosQ0FBQyxDQUFDLENBQUM7d0JBRUgsTUFBTTtpQkFDVDtZQUVILENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTSxJQUFJLGVBQWUsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRWhFLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNwQixPQUFPLENBQUMsT0FBTyxHQUFHO3dCQUNoQixJQUFJLEVBQUUsRUFBRTtxQkFDVCxDQUFDO2lCQUNIO2dCQUVELHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7U0FFSjthQUFNO1lBQ0wsc0JBQXNCO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsT0FBTyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsc0ZBQXNGO2FBQzdGLENBQUM7U0FDSDtRQUVELGdCQUFnQjtRQUNoQixNQUFNLEdBQUcsR0FBRywyREFBMkQsR0FBRyxRQUFRLENBQUM7UUFDbkYsZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQzthQUMxQztRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0VBQXNFLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUksQ0FBQyxDQUFDLENBQUE7SUFFSixDQUFDO0lBR08sV0FBVyxDQUFDLElBQVk7UUFFOUIsTUFBTSxNQUFNLEdBQUcsd0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3RCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUVILENBQUM7Q0FHRjtBQW5IRCxvQ0FtSEM7QUFHRDs7Ozs7Ozs7Ozs7O0dBWUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhY2Vib29rTWVzc2FnZX0gZnJvbSBcIi4vRmFjZWJvb2tNZXNzYWdlUGFyc2VyXCI7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgTE9HID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWwvbG9nZ2luZ1wiKTtcbmltcG9ydCB7cGFyc2V9IGZyb20gJ25vZGUtaHRtbC1wYXJzZXInO1xuXG5pbXBvcnQgVGV4dE1vZGVsIGZyb20gXCIuLi8uLi9ubHAvbW9kZWwvVGV4dE1vZGVsXCI7XG5cbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9UZXh0SW5wdXRNb2RlbFwiO1xuaW1wb3J0IENob2ljZU1vZGVsLCB7Q2hvaWNlfSBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL0Nob2ljZU1vZGVsXCI7XG5cbmNvbnN0IGxvZyA9IExPRy5sb2coJ0ZhY2Vib29rIFJlc3BvbmRlcicpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rUmVzcG9uZGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cblxuICByZXNwb25kKHJlc3BvbnNlTWVzc2FnZTogYW55LCByZXF1ZXN0TWVzc2FnZTogRmFjZWJvb2tNZXNzYWdlLCBhcGlUb2tlbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAvLyBzd2l0Y2ggdGhlIGRpZmZlcmVudCBjYXNlcy4gRm9yIG5vdyB3ZSBvbmx5IGhhdmUgdGV4dCByZXNwb25zZVxuXG4gICAgLy8gbGV0wrR0IHNlZSBpZiB3ZSBoYXZlIGEgaW50ZXJhY3QgcmVzcG9uc2VcblxuICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICByZWNpcGllbnQ6IHtcbiAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLnNlbmRlcklkXG4gICAgICB9LFxuICAgIH07XG5cblxuICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuaW50ZXJhY3QgJiYgcmVzcG9uc2VNZXNzYWdlLmludGVyYWN0Lmxlbmd0aCA+IDApIHtcblxuICAgICAgcmVzcG9uc2VNZXNzYWdlLmludGVyYWN0Lm1hcCgoaXRlbTogYW55KSA9PiB7XG5cbiAgICAgICAgaWYgKCFwYXlsb2FkLm1lc3NhZ2UpIHtcbiAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgIGNhc2UgVGV4dE1vZGVsLm5hbWU6XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgbWVzc2FnZXNcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IHRoaXMuZXh0cmFjdFRleHQoaXRlbS50ZXh0KSArICdcXG5cXG4nO1xuXG4gICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgY2FzZSBUZXh0SW5wdXRNb2RlbC5uYW1lOlxuXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIENob2ljZU1vZGVsLm5hbWU6XG5cbiAgICAgICAgICAgIC8vIHRyYW5zZm9ybSBpbnRvIGJ1dHRvbnMgd2l0aCBwYXlsb2FkXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzID0gW107XG4gICAgICAgICAgICBpdGVtLmNob2ljZXMubWFwKChjaG9pY2U6IENob2ljZSkgPT4ge1xuXG4gICAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS5xdWlja19yZXBsaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbnRlbnRfdHlwZTondGV4dCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGNob2ljZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICBjaG9pY2U6IGNob2ljZSxcbiAgICAgICAgICAgICAgICAgIHNlY3Rpb25JZDogaXRlbS5wYXJhbWV0ZXJJZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vXCJpbWFnZV91cmxcIjpcImh0dHA6Ly9leGFtcGxlLmNvbS9pbWcvcmVkLnBuZ1wiXG4gICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZS5ubHAgJiYgcmVzcG9uc2VNZXNzYWdlLm5scC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5ubHAubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFwYXlsb2FkLm1lc3NhZ2UpIHtcbiAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBlbmQgdGhlIG1lc3NhZ2VzXG4gICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IGl0ZW0udGV4dCArICdcXG4nO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm8gcmVzcG9uc2UgYXQgYWxsP1xuICAgICAgbG9nLndhcm4oJ2dvdCBub3QgcmVzcG9uc2UgYXQgYWxsIScpO1xuICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICB0ZXh0OiAnSGF2ZW7CtHQgZ290IGFueSByZXNwb25zZSB0aGF0IHdlIGN1cnJlbnRseSBzdXBwb3J0IGVpdGhlciBmcm9tIG5scCBvciBmcm9tIGludGVyYWN0LicsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIHNlbmQgbWVzc2FnZTpcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNi9tZS9tZXNzYWdlcz9hY2Nlc3NfdG9rZW49JyArIGFwaVRva2VuO1xuICAgIGF4aW9zLnBvc3QodXJsLCBwYXlsb2FkKS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBpZiAobG9nLmluZm8pIHtcbiAgICAgICAgbG9nLmluZm8oJ0Fuc3dlciBzZW5kIHRvIGZhY2Vib29rIGNoYXQnKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgbG9nLmVycm9yKCdFcnJvciBkdXJpbmcgYW5zd2VyaW5nIHRvIGZhY2Vib29rIGNoYXQgcmVxdWVzdC4gJXMsIHdpdGggcGF5bG9hZCAlcycsIGVyci5yZXNwb25zZS5kYXRhLmVycm9yLm1lc3NhZ2UsIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICB9KVxuXG4gIH1cblxuXG4gIHByaXZhdGUgZXh0cmFjdFRleHQoaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlKGh0bWwpO1xuXG4gICAgaWYgKHBhcnNlZC50ZXh0ICE9PSAnJykge1xuICAgICAgcmV0dXJuIHBhcnNlZC50ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG5cbiAgfVxuXG5cbn1cblxuXG4vKlxuXG52YXIgc2VuZE1lc3NhZ2VUb0ZCID0gKHVzZXJJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnksIHVzZXJOYW1lOiBzdHJpbmcpID0+IHtcbiAgbWVzc2FnZURhdGEucmVjaXBpZW50LmlkID0gdXNlcklkO1xuICBtZXNzYWdlRGF0YS5tZXNzYWdlLnRleHQgPSBtZXNzYWdlO1xuICByZXF1ZXN0KHtcbiAgICB1cmk6IFwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNi9tZS9tZXNzYWdlcz9hY2Nlc3NfdG9rZW49RUFBRlhvOVBoUTQ4QkFIQnB3ZVpDUXdENWE3Q25aQ0xHck5xdWZWSndVT010QjExeHl3OHU1RWpzNFpCSEc5VW53UnI5dUV0U3NUWkNUc1pCRDlLWU82djVGRDhHMXhqTVBUYk5ha3cyRWpSbDAzMGVEZFdRaVcyUFhCWkJwQVQ5N1ljZ2w5dXR0VHFwSEl5anFrRkNqRDl3WkNYaU1VSVBaQnRRZDgzWkNnWkFpVUV1TkRUdnNWMlhQa1ltSEY1dWdwNFpDc1pEXCIsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBqc29uOiBtZXNzYWdlRGF0YVxuICB9KTtcbn1cblxuICovXG4iXX0=