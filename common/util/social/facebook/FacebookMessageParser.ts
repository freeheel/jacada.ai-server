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


export default class FacebookMessageParser {

  constructor() {

  }

  parseMessage(message: any): FacebookMessage[] {

    let res: FacebookMessage[] = [];

    message.entry.forEach((item) => {

      if (item.messaging) {
        item.messaging.forEach((messageObject) => {
          if (!messageObject.message) {
            return;
          }
          let textMessage = new FacebookTextMessage(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.text)
          res.push(textMessage);
        });
      }

    });

    return res;

  };


}
