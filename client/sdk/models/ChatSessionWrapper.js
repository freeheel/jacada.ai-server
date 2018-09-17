"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class ChatSessionWrapper {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ChatSessionWrapper`.
     */
    static getModelName() {
        return "ChatSessionWrapper";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ChatSessionWrapper for dynamic purposes.
    **/
    static factory(data) {
        return new ChatSessionWrapper(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
        return {
            name: 'ChatSessionWrapper',
            plural: 'ChatSessionWrappers',
            path: 'ChatSessionWrappers',
            idName: 'id',
            properties: {
                "sessionId": {
                    name: 'sessionId',
                    type: 'string'
                },
                "apiKey": {
                    name: 'apiKey',
                    type: 'string'
                },
                "interactions": {
                    name: 'interactions',
                    type: 'any'
                },
                "interactionStack": {
                    name: 'interactionStack',
                    type: 'any'
                },
                "asyncTasks": {
                    name: 'asyncTasks',
                    type: 'any'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "chatMessageList": {
                    name: 'chatMessageList',
                    type: 'Array&lt;any&gt;',
                    default: []
                },
                "chatDataList": {
                    name: 'chatDataList',
                    type: 'Array&lt;any&gt;',
                    default: []
                },
            },
            relations: {
                chatMassages: {
                    name: 'chatMassages',
                    type: 'any[]',
                    model: '',
                    relationType: 'embedsMany',
                    keyFrom: 'chatMessageList',
                    keyTo: 'id'
                },
                chatData: {
                    name: 'chatData',
                    type: 'any[]',
                    model: '',
                    relationType: 'embedsMany',
                    keyFrom: 'chatDataList',
                    keyTo: 'id'
                },
            }
        };
    }
}
exports.ChatSessionWrapper = ChatSessionWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdFNlc3Npb25XcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hhdFNlc3Npb25XcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBZ0JwQixNQUFhLGtCQUFrQjtJQVc3QixZQUFZLElBQWtDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLG9CQUFvQixDQUFDO0lBQzlCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBaUM7UUFDckQsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLE1BQU0sRUFBRSxxQkFBcUI7WUFDN0IsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsT0FBTyxFQUFPLEVBQUU7aUJBQ2pCO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsT0FBTyxFQUFPLEVBQUU7aUJBQ2pCO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxZQUFZLEVBQUUsWUFBWTtvQkFDbEIsT0FBTyxFQUFFLGlCQUFpQjtvQkFDbEMsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxZQUFZLEVBQUUsWUFBWTtvQkFDbEIsT0FBTyxFQUFFLGNBQWM7b0JBQy9CLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBbkdELGdEQW1HQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBDaGF0U2Vzc2lvbldyYXBwZXJJbnRlcmZhY2Uge1xuICBcInNlc3Npb25JZFwiOiBzdHJpbmc7XG4gIFwiYXBpS2V5XCI/OiBzdHJpbmc7XG4gIFwiaW50ZXJhY3Rpb25zXCI/OiBhbnk7XG4gIFwiaW50ZXJhY3Rpb25TdGFja1wiPzogYW55O1xuICBcImFzeW5jVGFza3NcIj86IGFueTtcbiAgXCJpZFwiPzogYW55O1xuICBcImNoYXRNZXNzYWdlTGlzdFwiPzogQXJyYXk8YW55PjtcbiAgXCJjaGF0RGF0YUxpc3RcIj86IEFycmF5PGFueT47XG4gIGNoYXRNYXNzYWdlcz86IGFueVtdO1xuICBjaGF0RGF0YT86IGFueVtdO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhdFNlc3Npb25XcmFwcGVyIGltcGxlbWVudHMgQ2hhdFNlc3Npb25XcmFwcGVySW50ZXJmYWNlIHtcbiAgXCJzZXNzaW9uSWRcIjogc3RyaW5nO1xuICBcImFwaUtleVwiOiBzdHJpbmc7XG4gIFwiaW50ZXJhY3Rpb25zXCI6IGFueTtcbiAgXCJpbnRlcmFjdGlvblN0YWNrXCI6IGFueTtcbiAgXCJhc3luY1Rhc2tzXCI6IGFueTtcbiAgXCJpZFwiOiBhbnk7XG4gIFwiY2hhdE1lc3NhZ2VMaXN0XCI6IEFycmF5PGFueT47XG4gIFwiY2hhdERhdGFMaXN0XCI6IEFycmF5PGFueT47XG4gIGNoYXRNYXNzYWdlczogYW55W107XG4gIGNoYXREYXRhOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IENoYXRTZXNzaW9uV3JhcHBlckludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQ2hhdFNlc3Npb25XcmFwcGVyYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkNoYXRTZXNzaW9uV3JhcHBlclwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIENoYXRTZXNzaW9uV3JhcHBlciBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBDaGF0U2Vzc2lvbldyYXBwZXJJbnRlcmZhY2UpOiBDaGF0U2Vzc2lvbldyYXBwZXJ7XG4gICAgcmV0dXJuIG5ldyBDaGF0U2Vzc2lvbldyYXBwZXIoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdDaGF0U2Vzc2lvbldyYXBwZXInLFxuICAgICAgcGx1cmFsOiAnQ2hhdFNlc3Npb25XcmFwcGVycycsXG4gICAgICBwYXRoOiAnQ2hhdFNlc3Npb25XcmFwcGVycycsXG4gICAgICBpZE5hbWU6ICdpZCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwic2Vzc2lvbklkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2Vzc2lvbklkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImFwaUtleVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2FwaUtleScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbnRlcmFjdGlvbnNcIjoge1xuICAgICAgICAgIG5hbWU6ICdpbnRlcmFjdGlvbnMnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiaW50ZXJhY3Rpb25TdGFja1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ludGVyYWN0aW9uU3RhY2snLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXN5bmNUYXNrc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2FzeW5jVGFza3MnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJjaGF0TWVzc2FnZUxpc3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdjaGF0TWVzc2FnZUxpc3QnLFxuICAgICAgICAgIHR5cGU6ICdBcnJheSZsdDthbnkmZ3Q7JyxcbiAgICAgICAgICBkZWZhdWx0OiA8YW55PltdXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2hhdERhdGFMaXN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnY2hhdERhdGFMaXN0JyxcbiAgICAgICAgICB0eXBlOiAnQXJyYXkmbHQ7YW55Jmd0OycsXG4gICAgICAgICAgZGVmYXVsdDogPGFueT5bXVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBjaGF0TWFzc2FnZXM6IHtcbiAgICAgICAgICBuYW1lOiAnY2hhdE1hc3NhZ2VzJyxcbiAgICAgICAgICB0eXBlOiAnYW55W10nLFxuICAgICAgICAgIG1vZGVsOiAnJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdlbWJlZHNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdjaGF0TWVzc2FnZUxpc3QnLFxuICAgICAgICAgIGtleVRvOiAnaWQnXG4gICAgICAgIH0sXG4gICAgICAgIGNoYXREYXRhOiB7XG4gICAgICAgICAgbmFtZTogJ2NoYXREYXRhJyxcbiAgICAgICAgICB0eXBlOiAnYW55W10nLFxuICAgICAgICAgIG1vZGVsOiAnJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdlbWJlZHNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdjaGF0RGF0YUxpc3QnLFxuICAgICAgICAgIGtleVRvOiAnaWQnXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=