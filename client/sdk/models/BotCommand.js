"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class BotCommand {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `BotCommand`.
     */
    static getModelName() {
        return "BotCommand";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of BotCommand for dynamic purposes.
    **/
    static factory(data) {
        return new BotCommand(data);
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
            name: 'BotCommand',
            plural: 'BotCommands',
            path: 'BotCommands',
            idName: 'id',
            properties: {
                "conversationId": {
                    name: 'conversationId',
                    type: 'string'
                },
                "command": {
                    name: 'command',
                    type: 'string'
                },
                "payload": {
                    name: 'payload',
                    type: 'any'
                },
                "transactionId": {
                    name: 'transactionId',
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
exports.BotCommand = BotCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFXcEIsTUFBYSxVQUFVO0lBTXJCLFlBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLFlBQVk7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQWhFRCxnQ0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgQm90Q29tbWFuZEludGVyZmFjZSB7XG4gIFwiY29udmVyc2F0aW9uSWRcIj86IHN0cmluZztcbiAgXCJjb21tYW5kXCI/OiBzdHJpbmc7XG4gIFwicGF5bG9hZFwiPzogYW55O1xuICBcInRyYW5zYWN0aW9uSWRcIj86IHN0cmluZztcbiAgXCJpZFwiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQm90Q29tbWFuZCBpbXBsZW1lbnRzIEJvdENvbW1hbmRJbnRlcmZhY2Uge1xuICBcImNvbnZlcnNhdGlvbklkXCI6IHN0cmluZztcbiAgXCJjb21tYW5kXCI6IHN0cmluZztcbiAgXCJwYXlsb2FkXCI6IGFueTtcbiAgXCJ0cmFuc2FjdGlvbklkXCI6IHN0cmluZztcbiAgXCJpZFwiOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBCb3RDb21tYW5kSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBCb3RDb21tYW5kYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkJvdENvbW1hbmRcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBCb3RDb21tYW5kIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEJvdENvbW1hbmRJbnRlcmZhY2UpOiBCb3RDb21tYW5ke1xuICAgIHJldHVybiBuZXcgQm90Q29tbWFuZChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0JvdENvbW1hbmQnLFxuICAgICAgcGx1cmFsOiAnQm90Q29tbWFuZHMnLFxuICAgICAgcGF0aDogJ0JvdENvbW1hbmRzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJjb252ZXJzYXRpb25JZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NvbnZlcnNhdGlvbklkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRcIjoge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBheWxvYWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdwYXlsb2FkJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInRyYW5zYWN0aW9uSWRcIjoge1xuICAgICAgICAgIG5hbWU6ICd0cmFuc2FjdGlvbklkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=