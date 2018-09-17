"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class IntentChangeRequest {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `IntentChangeRequest`.
     */
    static getModelName() {
        return "IntentChangeRequest";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of IntentChangeRequest for dynamic purposes.
    **/
    static factory(data) {
        return new IntentChangeRequest(data);
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
            name: 'IntentChangeRequest',
            plural: 'IntentChangeRequests',
            path: 'IntentChangeRequests',
            idName: 'id',
            properties: {
                "clientAccessKey": {
                    name: 'clientAccessKey',
                    type: 'string'
                },
                "chatSessionId": {
                    name: 'chatSessionId',
                    type: 'string'
                },
                "intent": {
                    name: 'intent',
                    type: 'any'
                },
                "shouldTriggerSuggestion": {
                    name: 'shouldTriggerSuggestion',
                    type: 'string'
                },
                "requestedFrom": {
                    name: 'requestedFrom',
                    type: 'string'
                },
                "handled": {
                    name: 'handled',
                    type: 'boolean',
                    default: false
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
            },
            relations: {}
        };
    }
}
exports.IntentChangeRequest = IntentChangeRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZW50Q2hhbmdlUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVudENoYW5nZVJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFhcEIsTUFBYSxtQkFBbUI7SUFROUIsWUFBWSxJQUFtQztRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQWtDO1FBQ3RELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsaUJBQWlCLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELHlCQUF5QixFQUFFO29CQUN6QixJQUFJLEVBQUUseUJBQXlCO29CQUMvQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQTNFRCxrREEyRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSW50ZW50Q2hhbmdlUmVxdWVzdEludGVyZmFjZSB7XG4gIFwiY2xpZW50QWNjZXNzS2V5XCI/OiBzdHJpbmc7XG4gIFwiY2hhdFNlc3Npb25JZFwiPzogc3RyaW5nO1xuICBcImludGVudFwiPzogYW55O1xuICBcInNob3VsZFRyaWdnZXJTdWdnZXN0aW9uXCI/OiBzdHJpbmc7XG4gIFwicmVxdWVzdGVkRnJvbVwiPzogc3RyaW5nO1xuICBcImhhbmRsZWRcIj86IGJvb2xlYW47XG4gIFwiaWRcIj86IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEludGVudENoYW5nZVJlcXVlc3QgaW1wbGVtZW50cyBJbnRlbnRDaGFuZ2VSZXF1ZXN0SW50ZXJmYWNlIHtcbiAgXCJjbGllbnRBY2Nlc3NLZXlcIjogc3RyaW5nO1xuICBcImNoYXRTZXNzaW9uSWRcIjogc3RyaW5nO1xuICBcImludGVudFwiOiBhbnk7XG4gIFwic2hvdWxkVHJpZ2dlclN1Z2dlc3Rpb25cIjogc3RyaW5nO1xuICBcInJlcXVlc3RlZEZyb21cIjogc3RyaW5nO1xuICBcImhhbmRsZWRcIjogYm9vbGVhbjtcbiAgXCJpZFwiOiBhbnk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbnRlbnRDaGFuZ2VSZXF1ZXN0SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbnRlbnRDaGFuZ2VSZXF1ZXN0YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkludGVudENoYW5nZVJlcXVlc3RcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbnRlbnRDaGFuZ2VSZXF1ZXN0IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEludGVudENoYW5nZVJlcXVlc3RJbnRlcmZhY2UpOiBJbnRlbnRDaGFuZ2VSZXF1ZXN0e1xuICAgIHJldHVybiBuZXcgSW50ZW50Q2hhbmdlUmVxdWVzdChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0ludGVudENoYW5nZVJlcXVlc3QnLFxuICAgICAgcGx1cmFsOiAnSW50ZW50Q2hhbmdlUmVxdWVzdHMnLFxuICAgICAgcGF0aDogJ0ludGVudENoYW5nZVJlcXVlc3RzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJjbGllbnRBY2Nlc3NLZXlcIjoge1xuICAgICAgICAgIG5hbWU6ICdjbGllbnRBY2Nlc3NLZXknLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2hhdFNlc3Npb25JZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NoYXRTZXNzaW9uSWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaW50ZW50XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaW50ZW50JyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInNob3VsZFRyaWdnZXJTdWdnZXN0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2hvdWxkVHJpZ2dlclN1Z2dlc3Rpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWVzdGVkRnJvbVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3JlcXVlc3RlZEZyb20nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaGFuZGxlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2hhbmRsZWQnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=