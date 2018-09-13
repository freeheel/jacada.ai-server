"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOG = require("../../../util/logging");
const node_html_parser_1 = require("node-html-parser");
const TextModel_1 = require("../../nlp/model/TextModel");
const axios_1 = require("axios");
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
//# sourceMappingURL=FacebookResponder.js.map