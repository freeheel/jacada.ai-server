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
class FacebookAttachment extends FacebookMessage {
    constructor(requestId, senderId, receiverId, messageId, url, attachmentType) {
        super(requestId, senderId, receiverId, messageId);
        this.url = url;
        this.attachmentType = attachmentType;
    }
}
exports.FacebookAttachment = FacebookAttachment;
class FacebookQuickReply extends FacebookMessage {
    constructor(requestId, senderId, receiverId, messageId, payload) {
        super(requestId, senderId, receiverId, messageId);
        this.payload = JSON.parse(payload);
    }
}
exports.FacebookQuickReply = FacebookQuickReply;
class FacebookMessageParser {
    constructor() {
    }
    parseMessage(message) {
        let res = [];
        message.entry.forEach((item) => {
            //console.log(item);
            if (item.messaging) {
                item.messaging.forEach((messageObject) => {
                    if (!messageObject.message) {
                        return;
                    }
                    if (messageObject.message.quick_reply) {
                        let quickReplyMessage = new FacebookQuickReply(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.quick_reply.payload);
                        res.push(quickReplyMessage);
                    }
                    else {
                        let textMessage = new FacebookTextMessage(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.text);
                        res.push(textMessage);
                    }
                    if (messageObject.message.attachments) {
                        let textMessage = new FacebookAttachment(item.id, messageObject.sender.id, messageObject.recipient.id, messageObject.message.mid, messageObject.message.attachments[0].payload.url, messageObject.message.attachments[0].type);
                        res.push(textMessage);
                    }
                });
            }
        });
        return res;
    }
    ;
}
exports.default = FacebookMessageParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tNZXNzYWdlUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmFjZWJvb2tNZXNzYWdlUGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBc0IsZUFBZTtJQU9uQyxZQUFZLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFNBQWlCO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Q0FFRjtBQWRELDBDQWNDO0FBRUQsTUFBYSxtQkFBb0IsU0FBUSxlQUFlO0lBSXRELFlBQVksU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxJQUFZO1FBQ2xHLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFSRCxrREFRQztBQUVELE1BQWEsa0JBQW1CLFNBQVEsZUFBZTtJQUtyRCxZQUFZLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFNBQWlCLEVBQUUsR0FBVyxFQUFFLGNBQXNCO1FBQ3pILEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRjtBQVZELGdEQVVDO0FBR0QsTUFBYSxrQkFBbUIsU0FBUSxlQUFlO0lBSXJELFlBQVksU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsU0FBaUIsRUFBRSxPQUFlO1FBQ3JHLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBUkQsZ0RBUUM7QUFHRCxNQUFxQixxQkFBcUI7SUFFeEM7SUFFQSxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQVk7UUFFdkIsSUFBSSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztRQUVoQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2xDLG9CQUFvQjtZQUNwQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBa0IsRUFBRSxFQUFFO29CQUU1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDMUIsT0FBTztxQkFDUjtvQkFFRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO3dCQUNyQyxJQUFJLGlCQUFpQixHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbkwsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUM3Qjt5QkFBTTt3QkFDTCxJQUFJLFdBQVcsR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDL0osR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDdkI7b0JBQ0QsSUFBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQzt3QkFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9OLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3ZCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFFSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBRWIsQ0FBQztJQUFBLENBQUM7Q0FHSDtBQXhDRCx3Q0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgRmFjZWJvb2tNZXNzYWdlIHtcblxuICByZXF1ZXN0SWQ6IHN0cmluZztcbiAgc2VuZGVySWQ6IHN0cmluZztcbiAgcmVjZWl2ZXJJZDogc3RyaW5nO1xuICBtZXNzYWdlSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0SWQ6IHN0cmluZywgc2VuZGVySWQ6IHN0cmluZywgcmVjZWl2ZXJJZDogc3RyaW5nLCBtZXNzYWdlSWQ6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZUlkID0gbWVzc2FnZUlkO1xuICAgIHRoaXMucmVxdWVzdElkID0gcmVxdWVzdElkO1xuICAgIHRoaXMuc2VuZGVySWQgPSBzZW5kZXJJZDtcbiAgICB0aGlzLnJlY2VpdmVySWQgPSByZWNlaXZlcklkO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEZhY2Vib29rVGV4dE1lc3NhZ2UgZXh0ZW5kcyBGYWNlYm9va01lc3NhZ2Uge1xuXG4gIHRleHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0SWQ6IHN0cmluZywgc2VuZGVySWQ6IHN0cmluZywgcmVjZWl2ZXJJZDogc3RyaW5nLCBtZXNzYWdlSWQ6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgc3VwZXIocmVxdWVzdElkLCBzZW5kZXJJZCwgcmVjZWl2ZXJJZCwgbWVzc2FnZUlkKTtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGYWNlYm9va0F0dGFjaG1lbnQgZXh0ZW5kcyBGYWNlYm9va01lc3NhZ2Uge1xuXG4gIHVybDogc3RyaW5nO1xuICBhdHRhY2htZW50VHlwZTpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdElkOiBzdHJpbmcsIHNlbmRlcklkOiBzdHJpbmcsIHJlY2VpdmVySWQ6IHN0cmluZywgbWVzc2FnZUlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCBhdHRhY2htZW50VHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIocmVxdWVzdElkLCBzZW5kZXJJZCwgcmVjZWl2ZXJJZCwgbWVzc2FnZUlkKTtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLmF0dGFjaG1lbnRUeXBlID0gYXR0YWNobWVudFR5cGU7XG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tRdWlja1JlcGx5IGV4dGVuZHMgRmFjZWJvb2tNZXNzYWdlIHtcblxuICBwYXlsb2FkOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdElkOiBzdHJpbmcsIHNlbmRlcklkOiBzdHJpbmcsIHJlY2VpdmVySWQ6IHN0cmluZywgbWVzc2FnZUlkOiBzdHJpbmcsIHBheWxvYWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHJlcXVlc3RJZCwgc2VuZGVySWQsIHJlY2VpdmVySWQsIG1lc3NhZ2VJZCk7XG4gICAgdGhpcy5wYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2Vib29rTWVzc2FnZVBhcnNlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIHBhcnNlTWVzc2FnZShtZXNzYWdlOiBhbnkpOiBGYWNlYm9va01lc3NhZ2VbXSB7XG5cbiAgICBsZXQgcmVzOiBGYWNlYm9va01lc3NhZ2VbXSA9IFtdO1xuXG4gICAgbWVzc2FnZS5lbnRyeS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2coaXRlbSk7XG4gICAgICBpZiAoaXRlbS5tZXNzYWdpbmcpIHtcbiAgICAgICAgaXRlbS5tZXNzYWdpbmcuZm9yRWFjaCgobWVzc2FnZU9iamVjdDogYW55KSA9PiB7XG5cbiAgICAgICAgICBpZiAoIW1lc3NhZ2VPYmplY3QubWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtZXNzYWdlT2JqZWN0Lm1lc3NhZ2UucXVpY2tfcmVwbHkpIHtcbiAgICAgICAgICAgIGxldCBxdWlja1JlcGx5TWVzc2FnZSA9IG5ldyBGYWNlYm9va1F1aWNrUmVwbHkoaXRlbS5pZCwgbWVzc2FnZU9iamVjdC5zZW5kZXIuaWQsIG1lc3NhZ2VPYmplY3QucmVjaXBpZW50LmlkLCBtZXNzYWdlT2JqZWN0Lm1lc3NhZ2UubWlkLCBtZXNzYWdlT2JqZWN0Lm1lc3NhZ2UucXVpY2tfcmVwbHkucGF5bG9hZCk7XG4gICAgICAgICAgICByZXMucHVzaChxdWlja1JlcGx5TWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0ZXh0TWVzc2FnZSA9IG5ldyBGYWNlYm9va1RleHRNZXNzYWdlKGl0ZW0uaWQsIG1lc3NhZ2VPYmplY3Quc2VuZGVyLmlkLCBtZXNzYWdlT2JqZWN0LnJlY2lwaWVudC5pZCwgbWVzc2FnZU9iamVjdC5tZXNzYWdlLm1pZCwgbWVzc2FnZU9iamVjdC5tZXNzYWdlLnRleHQpO1xuICAgICAgICAgICAgcmVzLnB1c2godGV4dE1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihtZXNzYWdlT2JqZWN0Lm1lc3NhZ2UuYXR0YWNobWVudHMpe1xuICAgICAgICAgICAgbGV0IHRleHRNZXNzYWdlID0gbmV3IEZhY2Vib29rQXR0YWNobWVudChpdGVtLmlkLCBtZXNzYWdlT2JqZWN0LnNlbmRlci5pZCwgbWVzc2FnZU9iamVjdC5yZWNpcGllbnQuaWQsIG1lc3NhZ2VPYmplY3QubWVzc2FnZS5taWQsIG1lc3NhZ2VPYmplY3QubWVzc2FnZS5hdHRhY2htZW50c1swXS5wYXlsb2FkLnVybCwgbWVzc2FnZU9iamVjdC5tZXNzYWdlLmF0dGFjaG1lbnRzWzBdLnR5cGUpO1xuICAgICAgICAgICAgcmVzLnB1c2godGV4dE1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG5cbiAgfTtcblxuXG59XG4iXX0=