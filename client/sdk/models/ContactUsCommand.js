"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class ContactUsCommand {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ContactUsCommand`.
     */
    static getModelName() {
        return "ContactUsCommand";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ContactUsCommand for dynamic purposes.
    **/
    static factory(data) {
        return new ContactUsCommand(data);
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
            name: 'ContactUsCommand',
            plural: 'ContactUsCommands',
            path: 'ContactUsCommands',
            idName: 'id',
            properties: {
                "spui": {
                    name: 'spui',
                    type: 'string'
                },
                "chatBotSessionId": {
                    name: 'chatBotSessionId',
                    type: 'string'
                },
                "interactionSessionId": {
                    name: 'interactionSessionId',
                    type: 'string'
                },
                "scriptUrl": {
                    name: 'scriptUrl',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}
exports.ContactUsCommand = ContactUsCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFjdFVzQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbnRhY3RVc0NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFXcEIsTUFBYSxnQkFBZ0I7SUFNM0IsWUFBWSxJQUFnQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQStCO1FBQ25ELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdEIsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQWhFRCw0Q0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFjdFVzQ29tbWFuZEludGVyZmFjZSB7XG4gIFwic3B1aVwiPzogc3RyaW5nO1xuICBcImNoYXRCb3RTZXNzaW9uSWRcIj86IHN0cmluZztcbiAgXCJpbnRlcmFjdGlvblNlc3Npb25JZFwiPzogc3RyaW5nO1xuICBcInNjcmlwdFVybFwiPzogc3RyaW5nO1xuICBcImlkXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250YWN0VXNDb21tYW5kIGltcGxlbWVudHMgQ29udGFjdFVzQ29tbWFuZEludGVyZmFjZSB7XG4gIFwic3B1aVwiOiBzdHJpbmc7XG4gIFwiY2hhdEJvdFNlc3Npb25JZFwiOiBzdHJpbmc7XG4gIFwiaW50ZXJhY3Rpb25TZXNzaW9uSWRcIjogc3RyaW5nO1xuICBcInNjcmlwdFVybFwiOiBzdHJpbmc7XG4gIFwiaWRcIjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogQ29udGFjdFVzQ29tbWFuZEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQ29udGFjdFVzQ29tbWFuZGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDb250YWN0VXNDb21tYW5kXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ29udGFjdFVzQ29tbWFuZCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBDb250YWN0VXNDb21tYW5kSW50ZXJmYWNlKTogQ29udGFjdFVzQ29tbWFuZHtcbiAgICByZXR1cm4gbmV3IENvbnRhY3RVc0NvbW1hbmQoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdDb250YWN0VXNDb21tYW5kJyxcbiAgICAgIHBsdXJhbDogJ0NvbnRhY3RVc0NvbW1hbmRzJyxcbiAgICAgIHBhdGg6ICdDb250YWN0VXNDb21tYW5kcycsXG4gICAgICBpZE5hbWU6ICdpZCcsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwic3B1aVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3NwdWknLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2hhdEJvdFNlc3Npb25JZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NoYXRCb3RTZXNzaW9uSWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaW50ZXJhY3Rpb25TZXNzaW9uSWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpbnRlcmFjdGlvblNlc3Npb25JZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzY3JpcHRVcmxcIjoge1xuICAgICAgICAgIG5hbWU6ICdzY3JpcHRVcmwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==