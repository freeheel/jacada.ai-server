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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tSZXNwb25kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va1Jlc3BvbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGFBQWE7QUFDYiw2Q0FBOEM7QUFDOUMsdURBQXVDO0FBRXZDLDBFQUFrRDtBQUVsRCxrREFBMEI7QUFDMUIsb0ZBQTREO0FBRTVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQyxNQUFxQixpQkFBaUI7SUFFcEM7SUFFQSxDQUFDO0lBR0QsT0FBTyxDQUFDLGVBQW9CLEVBQUUsY0FBK0IsRUFBRSxRQUFnQjtRQUU3RSxpRUFBaUU7UUFFakUsMkNBQTJDO1FBRTNDLElBQUksT0FBTyxHQUFRO1lBQ2pCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLEVBQUUsY0FBYyxDQUFDLFFBQVE7YUFDNUI7U0FDRixDQUFDO1FBR0YsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUVuRSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsT0FBTyxDQUFDLE9BQU8sR0FBRzt3QkFDaEIsSUFBSSxFQUFFLEVBQUU7cUJBQ1QsQ0FBQztpQkFDSDtnQkFFRCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pCLEtBQUssbUJBQVMsQ0FBQyxJQUFJO3dCQUVqQixzQkFBc0I7d0JBQ3RCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQzt3QkFFN0QsTUFBTTtvQkFHUixLQUFLLHdCQUFjLENBQUMsSUFBSTt3QkFFdEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDO3dCQUV0RSxNQUFNO2lCQUNUO1lBRUgsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksZUFBZSxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFaEUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxPQUFPLEdBQUc7d0JBQ2hCLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7aUJBQ0g7Z0JBRUQsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUVKO2FBQU07WUFDTCxzQkFBc0I7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLEdBQUc7Z0JBQ2hCLElBQUksRUFBRSxzRkFBc0Y7YUFDN0YsQ0FBQztTQUNIO1FBRUQsZ0JBQWdCO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLDJEQUEyRCxHQUFHLFFBQVEsQ0FBQztRQUNuRixlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxzRUFBc0UsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5SSxDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFHTyxXQUFXLENBQUMsSUFBWTtRQUU5QixNQUFNLE1BQU0sR0FBRyx3QkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3BCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBRUgsQ0FBQztDQUdGO0FBOUZELG9DQThGQztBQUdEOzs7Ozs7Ozs7Ozs7R0FZRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmFjZWJvb2tNZXNzYWdlfSBmcm9tIFwiLi9GYWNlYm9va01lc3NhZ2VQYXJzZXJcIjtcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBMT0cgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXRpbC9sb2dnaW5nXCIpO1xuaW1wb3J0IHtwYXJzZX0gZnJvbSAnbm9kZS1odG1sLXBhcnNlcic7XG5cbmltcG9ydCBUZXh0TW9kZWwgZnJvbSBcIi4uLy4uL25scC9tb2RlbC9UZXh0TW9kZWxcIjtcblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBUZXh0SW5wdXRNb2RlbCBmcm9tIFwiLi4vLi4vbmxwL21vZGVsL1RleHRJbnB1dE1vZGVsXCI7XG5cbmNvbnN0IGxvZyA9IExPRy5sb2coJ0ZhY2Vib29rIFJlc3BvbmRlcicpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rUmVzcG9uZGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cblxuICByZXNwb25kKHJlc3BvbnNlTWVzc2FnZTogYW55LCByZXF1ZXN0TWVzc2FnZTogRmFjZWJvb2tNZXNzYWdlLCBhcGlUb2tlbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAvLyBzd2l0Y2ggdGhlIGRpZmZlcmVudCBjYXNlcy4gRm9yIG5vdyB3ZSBvbmx5IGhhdmUgdGV4dCByZXNwb25zZVxuXG4gICAgLy8gbGV0wrR0IHNlZSBpZiB3ZSBoYXZlIGEgaW50ZXJhY3QgcmVzcG9uc2VcblxuICAgIGxldCBwYXlsb2FkOiBhbnkgPSB7XG4gICAgICByZWNpcGllbnQ6IHtcbiAgICAgICAgaWQ6IHJlcXVlc3RNZXNzYWdlLnNlbmRlcklkXG4gICAgICB9LFxuICAgIH07XG5cblxuICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuaW50ZXJhY3QgJiYgcmVzcG9uc2VNZXNzYWdlLmludGVyYWN0Lmxlbmd0aCA+IDApIHtcblxuICAgICAgcmVzcG9uc2VNZXNzYWdlLmludGVyYWN0Lm1hcCgoaXRlbTogYW55KSA9PiB7XG5cbiAgICAgICAgaWYgKCFwYXlsb2FkLm1lc3NhZ2UpIHtcbiAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgICAgIGNhc2UgVGV4dE1vZGVsLm5hbWU6XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgbWVzc2FnZXNcbiAgICAgICAgICAgIHBheWxvYWQubWVzc2FnZS50ZXh0ICs9IHRoaXMuZXh0cmFjdFRleHQoaXRlbS50ZXh0KSArICdcXG5cXG4nO1xuXG4gICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgY2FzZSBUZXh0SW5wdXRNb2RlbC5uYW1lOlxuXG4gICAgICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSB0aGlzLmV4dHJhY3RUZXh0KGl0ZW0ucXVlc3Rpb25MYWJlbCkgKyAnXFxuXFxuJztcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZU1lc3NhZ2UubmxwICYmIHJlc3BvbnNlTWVzc2FnZS5ubHAubGVuZ3RoID4gMCkge1xuXG4gICAgICByZXNwb25zZU1lc3NhZ2UubmxwLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmICghcGF5bG9hZC5tZXNzYWdlKSB7XG4gICAgICAgICAgcGF5bG9hZC5tZXNzYWdlID0ge1xuICAgICAgICAgICAgdGV4dDogJydcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBtZXNzYWdlc1xuICAgICAgICBwYXlsb2FkLm1lc3NhZ2UudGV4dCArPSBpdGVtLnRleHQgKyAnXFxuJztcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIHJlc3BvbnNlIGF0IGFsbD9cbiAgICAgIGxvZy53YXJuKCdnb3Qgbm90IHJlc3BvbnNlIGF0IGFsbCEnKTtcbiAgICAgIHBheWxvYWQubWVzc2FnZSA9IHtcbiAgICAgICAgdGV4dDogJ0hhdmVuwrR0IGdvdCBhbnkgcmVzcG9uc2UgdGhhdCB3ZSBjdXJyZW50bHkgc3VwcG9ydCBlaXRoZXIgZnJvbSBubHAgb3IgZnJvbSBpbnRlcmFjdC4nLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBzZW5kIG1lc3NhZ2U6XG4gICAgY29uc3QgdXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPScgKyBhcGlUb2tlbjtcbiAgICBheGlvcy5wb3N0KHVybCwgcGF5bG9hZCkudGhlbigocmVzcCkgPT4ge1xuICAgICAgaWYgKGxvZy5pbmZvKSB7XG4gICAgICAgIGxvZy5pbmZvKCdBbnN3ZXIgc2VuZCB0byBmYWNlYm9vayBjaGF0Jyk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGxvZy5lcnJvcignRXJyb3IgZHVyaW5nIGFuc3dlcmluZyB0byBmYWNlYm9vayBjaGF0IHJlcXVlc3QuICVzLCB3aXRoIHBheWxvYWQgJXMnLCBlcnIucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLCBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgfSlcblxuICB9XG5cblxuICBwcml2YXRlIGV4dHJhY3RUZXh0KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZShodG1sKTtcblxuICAgIGlmIChwYXJzZWQudGV4dCAhPT0gJycpIHtcbiAgICAgIHJldHVybiBwYXJzZWQudGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gIH1cblxuXG59XG5cblxuLypcblxudmFyIHNlbmRNZXNzYWdlVG9GQiA9ICh1c2VySWQ6IHN0cmluZywgbWVzc2FnZTogYW55LCB1c2VyTmFtZTogc3RyaW5nKSA9PiB7XG4gIG1lc3NhZ2VEYXRhLnJlY2lwaWVudC5pZCA9IHVzZXJJZDtcbiAgbWVzc2FnZURhdGEubWVzc2FnZS50ZXh0ID0gbWVzc2FnZTtcbiAgcmVxdWVzdCh7XG4gICAgdXJpOiBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXM/YWNjZXNzX3Rva2VuPUVBQUZYbzlQaFE0OEJBSEJwd2VaQ1F3RDVhN0NuWkNMR3JOcXVmVkp3VU9NdEIxMXh5dzh1NUVqczRaQkhHOVVud1JyOXVFdFNzVFpDVHNaQkQ5S1lPNnY1RkQ4RzF4ak1QVGJOYWt3MkVqUmwwMzBlRGRXUWlXMlBYQlpCcEFUOTdZY2dsOXV0dFRxcEhJeWpxa0ZDakQ5d1pDWGlNVUlQWkJ0UWQ4M1pDZ1pBaVVFdU5EVHZzVjJYUGtZbUhGNXVncDRaQ3NaRFwiLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAganNvbjogbWVzc2FnZURhdGFcbiAgfSk7XG59XG5cbiAqL1xuIl19