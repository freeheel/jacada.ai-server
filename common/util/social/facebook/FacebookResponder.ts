import {FacebookMessage} from "./FacebookMessageParser";
// @ts-ignore
import LOG = require("../../../util/logging");
import {parse} from 'node-html-parser';

import TextModel from "../../nlp/model/TextModel";

import axios from 'axios';
import TextInputModel from "../../nlp/model/TextInputModel";
import AttachmentModel from "../../nlp/model/AttachmentModel";
import ChoiceModel, {Choice} from "../../nlp/model/ChoiceModel";
import TemplateModel from "../../nlp/model/TemplateModel";

const log = LOG.log('Facebook Responder');


export default class FacebookResponder {

  private _messageQueue: any[] = [];

  constructor() {

  }

//Response back to facebook
  respond(responseMessage: any, requestMessage: FacebookMessage, apiToken: string): void {

    if (responseMessage.interact && responseMessage.interact.length > 0) {

      responseMessage.interact.map((item: any) => {

        let payload: any = {
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
                content_type: 'text',
                title: choice.label,
                payload: JSON.stringify({
                  choice: choice,
                  sectionId: item.parameterId,
                })
                //"image_url":"http://example.com/img/red.png"
              })
            });

            break;
          case AttachmentModel.name :
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
                }
              }
            } else if (item.attachedType == 'audio') {
              delete payload.message.text;
              console.log('Item type: ' + item.attachedType);
              payload.message.attachment = {
                type: item.attachedType,
                payload: {
                  url: item.url,
                  is_reusable: true
                }
              }
            } else if (item.attachedType == 'image') {
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
                }
              }
            }

            break;
          case TemplateModel.name :
            break;
        }

        this._addMessageToQueue(payload, apiToken);


      });
    } else if (responseMessage.nlp && responseMessage.nlp.length > 0) {

      let payload: any = {
        recipient: {
          id: requestMessage.senderId
        },
      };

      responseMessage.nlp.map((item: any) => {
        if (!payload.message) {
          payload.message = {
            text: ''
          };
        }

        // append the messages
        payload.message.text += item.text + '\n';
      });

      this._addMessageToQueue(payload, apiToken);

    } else {

      let payload: any = {
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

  textRespond(text: string, recipientId: string, apiToken: string) {

    let payload: any = {
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

  private _addMessageToQueue(payload: any, apiToken: string): void {
    this._messageQueue.push({
      payload: payload,
      apiToken: apiToken,
    });
  }

  private _sendMessage(): void {


    if (this._messageQueue.length > 0) {
      const first = this._messageQueue.pop();

      // send message:
      const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + first.apiToken;
      axios.post(url, first.payload).then((resp) => {
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

  private extractText(html: string): string {

    const parsed = parse(html);

    if (parsed.text !== '') {
      return parsed.text;
    } else {
      return html;
    }

  }


}
