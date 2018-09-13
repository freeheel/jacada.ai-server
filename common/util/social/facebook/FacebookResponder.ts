import {FacebookMessage} from "./FacebookMessageParser";
import LOG = require('../../../util/logging');
import { parse } from 'node-html-parser';

import TextModel from "../../nlp/model/TextModel";

import axios from 'axios';

const log = LOG.log('Facebook Responder');


export default class FacebookResponder {

  constructor() {

  }

  respond(responseMessage: any, requestMessage: FacebookMessage, apiToken: string): void {

    // switch the different cases. For now we only have text response

    // let´t see if we have a interact response

    let payload: any = {
      recipient: {
        id: requestMessage.senderId
      }
    };


    if (responseMessage.interact && responseMessage.interact.length > 0) {
      responseMessage.interact.map((item) => {

        switch (item.type) {
          case TextModel.name:

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
    } else if (responseMessage.nlp && responseMessage.nlp.length > 0) {

    } else {
      // no response at all?
      log.warn('got not response at all!');
      payload.message = {
        text: 'Haven´t got any response neigher from nlp nore from interact.'
      };
    }


    // send message:
    const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + apiToken;
    axios.post(url, payload).then((resp) => {
      if (log.info) {
        log.info('Answer send to facebook chat');
      }
    }).catch(err => {
      log.error('Error during answering to facebook chat request. %s, with payload %s', err.message, JSON.stringify(payload));
    })

  }


  private extractText(html: string): string {
    return parse(html).text;
  }


}


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
