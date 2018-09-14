import {FacebookMessage} from "./FacebookMessageParser";
// @ts-ignore
import LOG = require("../../../util/logging");
import {parse} from 'node-html-parser';

import TextModel from "../../nlp/model/TextModel";

import axios from 'axios';
import TextInputModel from "../../nlp/model/TextInputModel";
import AttachmentModel from "../../nlp/model/AttachmentModel";
import ChoiceModel, {Choice} from "../../nlp/model/ChoiceModel";

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
      },
    };


    if (responseMessage.interact && responseMessage.interact.length > 0) {

      responseMessage.interact.map((item: any) => {

        if (!payload.message) {
          payload.message = {
            text: ''
          };
        }

        switch (item.type) {
          case TextModel.name:

            // append the messages
            payload.message.text += this.extractText(item.text) + '\n\n';

            break;


          case TextInputModel.name:

            payload.message.text += this.extractText(item.questionLabel) + '\n\n';

            break;

          case ChoiceModel.name:

            // transform into buttons with payload
            payload.message.text += this.extractText(item.questionLabel) + '\n\n';
            payload.message.quick_replies = [];
            item.choices.map((choice: Choice) => {

              payload.message.quick_replies.push({
                content_type:'text',
                title: choice.label,
                payload: JSON.stringify({
                  choice: choice,
                  sectionId: item.parameterId,
                })
                //"image_url":"http://example.com/img/red.png"
              })

            });

            break;
        }

      });
    } else if (responseMessage.nlp && responseMessage.nlp.length > 0) {

      responseMessage.nlp.map((item: any) => {
        if (!payload.message) {
          payload.message = {
            text: ''
          };
        }

        // append the messages
        payload.message.text += item.text + '\n';
      });

    } else {
      // no response at all?
      log.warn('got not response at all!');
      payload.message = {
        text: 'Haven´t got any response that we currently support either from nlp or from interact.',
      };
    }

    // send message:
    const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + apiToken;
    axios.post(url, payload).then((resp) => {
      if (log.info) {
        log.info('Answer send to facebook chat');
      }
    }).catch(err => {
      log.error('Error during answering to facebook chat request. %s, with payload %s', err.response.data.error.message, JSON.stringify(payload));
    })

  }


  private extractText(html: string): string {

    const parsed = parse(html);

    if (parsed.text !== '') {
      return parsed.text;
    } else {
      return html;
    }

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
