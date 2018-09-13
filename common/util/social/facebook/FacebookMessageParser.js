"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FacebookMessage {
    constructor(requestId, senderId, receiverId, messageId) {
        this.messageId = messageId;
        this.requestId = requestId;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
exports.FacebookMessage = FacebookMessage;
class FacebookTextMessage extends FacebookMessage {
    constructor(requestId, senderId, receiverId, messageId, text) {
        super(requestId, senderId, receiverId, messageId);
        this.text = text;
    }
}
exports.FacebookTextMessage = FacebookTextMessage;
class FacebookMessageParser {
    constructor() {
    }
    parseMessage(message) {
        let res = [];
        message.entry.forEach((item) => {
            if (item.messaging) {
                item.messaging.forEach((messageObject) => {
                    if (!messageObject.message) {
                        return;
                    }
                    let textMessage = new FacebookTextMessage(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.text);
                    res.push(textMessage);
                });
            }
        });
        return res;
    }
    ;
}
exports.default = FacebookMessageParser;
//# sourceMappingURL=FacebookMessageParser.js.map