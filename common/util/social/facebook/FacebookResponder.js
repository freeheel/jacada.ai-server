"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LOG = require("../../../util/logging");
const node_html_parser_1 = require("node-html-parser");
const TextModel_1 = __importDefault(require("../../nlp/model/TextModel"));
const axios_1 = __importDefault(require("axios"));
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
            }
        };
        if (responseMessage.interact && responseMessage.interact.length > 0) {
            responseMessage.interact.map((item) => {
                switch (item.type) {
                    case TextModel_1.default.name:
                        // extract plain text without html
                        const plainText = this.extractText(item.text);
                        if (!payload.message) {
                            payload.message = {
                                text: ''
                            };
                        }
                        // append the messages
                        payload.message.text += plainText + '\n';
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
                text: 'Haven´t got any response neigher from nlp nore from interact.'
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
        return node_html_parser_1.parse(html).text;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDZDQUE4QztBQUM5Qyx1REFBdUM7QUFFdkMsMEVBQWtEO0FBRWxELGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFHMUMsTUFBcUIsaUJBQWlCO0lBRXBDO0lBRUEsQ0FBQztJQUVELE9BQU8sQ0FBQyxlQUFvQixFQUFFLGNBQStCLEVBQUUsUUFBZ0I7UUFFN0UsaUVBQWlFO1FBRWpFLDJDQUEyQztRQUUzQyxJQUFJLE9BQU8sR0FBUTtZQUNqQixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRO2FBQzVCO1NBQ0YsQ0FBQztRQUdGLElBQUksZUFBZSxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFbkUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFFcEMsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNqQixLQUFLLG1CQUFTLENBQUMsSUFBSTt3QkFFakIsa0NBQWtDO3dCQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7NEJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUc7Z0NBQ2hCLElBQUksRUFBRSxFQUFFOzZCQUNULENBQUM7eUJBQ0g7d0JBRUQsc0JBQXNCO3dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUV6QyxNQUFNO2lCQUNUO1lBRUgsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksZUFBZSxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFaEUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUc7d0JBQ2hCLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7aUJBQ0g7Z0JBRUQsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUVKO2FBQU07WUFDTCxzQkFBc0I7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSwrREFBK0Q7YUFDdEUsQ0FBQztTQUNIO1FBRUQsZ0JBQWdCO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLDJEQUEyRCxHQUFHLFFBQVEsQ0FBQztRQUNuRixlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5SSxDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFHTyxXQUFXLENBQUMsSUFBWTtRQUM5QixPQUFPLHdCQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7Q0FHRjtBQWpGRCxvQ0FpRkM7QUFHRDs7Ozs7Ozs7Ozs7O0dBWUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZhY2Vib29rTWVzc2FnZX0gZnJvbSBcIi4vRmFjZWJvb2tNZXNzYWdlUGFyc2VyXCI7XG5pbXBvcnQgTE9HID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9sb2dnaW5nJyk7XG5pbXBvcnQge3BhcnNlfSBmcm9tICdub2RlLWh0bWwtcGFyc2VyJztcblxuaW1wb3J0IFRleHRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RleHRNb2RlbFwiO1xuXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBsb2cgPSBMT0cubG9nKCdGYWNlYm9vayBSZXNwb25kZXInKTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWNlYm9va1Jlc3BvbmRlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHJlc3BvbmQocmVzcG9uc2VNZXNzYWdlOiBhbnksIHJlcXVlc3RNZXNzYWdlOiBGYWNlYm9va01lc3NhZ2UsIGFwaVRva2VuOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIC8vIHN3aXRjaCB0aGUgZGlmZmVyZW50IGNhc2VzLiBGb3Igbm93IHdlIG9ubHkgaGF2ZSB0ZXh0IHJlc3BvbnNlXG5cbiAgICAvLyBsZXTCtHQgc2VlIGlmIHdlIGhhdmUgYSBpbnRlcmFjdCByZXNwb25zZVxuXG4gICAgbGV0IHBheWxvYWQ6IGFueSA9IHtcbiAgICAgIHJlY2lwaWVudDoge1xuICAgICAgICBpZDogcmVxdWVzdE1lc3NhZ2Uuc2VuZGVySWRcbiAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBpZiAocmVzcG9uc2VNZXNzYWdlLmludGVyYWN0ICYmIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5pbnRlcmFjdC5tYXAoKGl0ZW0pID0+IHtcblxuICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgIGNhc2UgVGV4dE1vZGVsLm5hbWU6XG5cbiAgICAgICAgICAgIC8vIGV4dHJhY3QgcGxhaW4gdGV4dCB3aXRob3V0IGh0bWxcbiAgICAgICAgICAgIGNvbnN0IHBsYWluVGV4dCA9IHRoaXMuZXh0cmFjdFRleHQoaXRlbS50ZXh0KTtcblxuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIHRleHQ6ICcnXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgbWVzc2FnZXNcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IHBsYWluVGV4dCArICdcXG4nO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZS5ubHAgJiYgcmVzcG9uc2VNZXNzYWdlLm5scC5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHJlc3BvbnNlTWVzc2FnZS5ubHAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBtZXNzYWdlc1xuICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSBpdGVtLnRleHQgKyAnXFxuJztcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIHJlc3BvbnNlIGF0IGFsbD9cbiAgICAgIGxvZy53YXJuKCdnb3Qgbm90IHJlc3BvbnNlIGF0IGFsbCEnKTtcbiAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgdGV4dDogJ0hhdmVuwrR0IGdvdCBhbnkgcmVzcG9uc2UgbmVpZ2hlciBmcm9tIG5scCBub3JlIGZyb20gaW50ZXJhY3QuJ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBzZW5kIG1lc3NhZ2U6XG4gICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPScgKyBhcGlUb2tlbjtcbiAgICBheGlvcy5wb3N0KHVybCwgcGF5bG9hZCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKGxvZy5pbmZvKSB7XG4gICAgICAgIGxvZy5pbmZvKCdBbnN3ZXIgc2VuZCB0byBmYWNlYm9vayBjaGF0Jyk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGxvZy5lcnJvcignRXJyb3IgZHVyaW5nIGFuc3dlcmluZyB0byBmYWNlYm9vayBjaGF0IHJlcXVlc3QuICVzLCB3aXRoIHBheWxvYWQgJXMnLCBlcnIucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgfSlcblxuICB9XG5cblxuICBwcml2YXRlIGV4dHJhY3RUZXh0KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHBhcnNlKGh0bWwpLnRleHQ7XG4gIH1cblxuXG59XG5cblxuLypcblxudmFyIHNlbmRNZXNzYWdlVG9GQiA9ICh1c2VySWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCB1c2VyTmFtZTogc3RyaW5nKSA9PiB7XG4gIG1lc3NhZ2VEYXRhLnJlY2lwaWVudC5pZCA9IHVzZXJJZDtcbiAgbWVzc2FnZURhdGEubWVzc2FnZS50ZXh0ID0gbWVzc2FnZTtcbiAgcmVxdWVzdCh7XG4gICAgdXJpOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPUVBQUZYbzlQaFE0OEJBSEJwd2VaQ1F3RDVhN0NuWkNMR3JOcXVmVkp3VU9NdEIxMXh5dzh1NUVqczRaQkhHOVVud1JyOXVFdFNzVFpDVHNaQkQ5S1lPNnY1RkQ4RzF4ak1QVGJOYWt3MkVqUmwwMzBlRGRXUWlXMlBYQlpCcEFUOTdZY2dsOXV0dFRxcEhJeWpxa0ZDakQ5d1pDWGlNVUlQWkJ0UWQ4M1pDZ1pBaVVFdU5EVHZzVjJYUGtZbUhGNXVncDRaQ3NaRFwiLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAganNvbjogbWVzc2FnZURhdGFcbiAgfSk7XG59XG5cbiAqL1xuIl19