export abstract class FacebookMessage {

  requestId: string;
  senderId: string;
  receiverId: string;
  messageId: string;

  constructor(requestId: string, senderId: string, receiverId: string, messageId: string) {
    this.messageId = messageId;
    this.requestId = requestId;
    this.senderId = senderId;
    this.receiverId = receiverId;
  }

}

export class FacebookTextMessage extends FacebookMessage {

  text: string;

  constructor(requestId: string, senderId: string, receiverId: string, messageId: string, text: string) {
    super(requestId, senderId, receiverId, messageId);
    this.text = text;
  }
}

export class FacebookQuickReply extends FacebookMessage {

  payload: any;

  constructor(requestId: string, senderId: string, receiverId: string, messageId: string, payload: string) {
    super(requestId, senderId, receiverId, messageId);
    this.payload = JSON.parse(payload);
  }
}


export default class FacebookMessageParser {

  constructor() {

  }

  parseMessage(message: any): FacebookMessage[] {

    let res: FacebookMessage[] = [];

    message.entry.forEach((item: any) => {

      if (item.messaging) {
        item.messaging.forEach((messageObject: any) => {
          if (!messageObject.message) {
            return;
          }

          if (messageObject.message.quick_reply) {
            let quickReplyMessage = new FacebookQuickReply(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.quick_reply.payload)
            res.push(quickReplyMessage);
          } else {
            let textMessage = new FacebookTextMessage(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.text)
            res.push(textMessage);
          }
        });
      }

    });

    return res;

  };


}
