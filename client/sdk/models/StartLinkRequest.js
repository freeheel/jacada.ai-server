"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class StartLinkRequest {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `StartLinkRequest`.
     */
    static getModelName() {
        return "StartLinkRequest";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of StartLinkRequest for dynamic purposes.
    **/
    static factory(data) {
        return new StartLinkRequest(data);
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
            name: 'StartLinkRequest',
            plural: 'StartLinkRequests',
            path: 'StartLinkRequests',
            idName: 'id',
            properties: {
                "chatBotInternalSessionId": {
                    name: 'chatBotInternalSessionId',
                    type: 'string'
                },
                "link": {
                    name: 'link',
                    type: 'string'
                },
                "options": {
                    name: 'options',
                    type: 'any'
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
exports.StartLinkRequest = StartLinkRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhcnRMaW5rUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN0YXJ0TGlua1JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFVcEIsTUFBYSxnQkFBZ0I7SUFLM0IsWUFBWSxJQUFnQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQStCO1FBQ25ELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsMEJBQTBCLEVBQUU7b0JBQzFCLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUEzREQsNENBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFN0YXJ0TGlua1JlcXVlc3RJbnRlcmZhY2Uge1xuICBcImNoYXRCb3RJbnRlcm5hbFNlc3Npb25JZFwiPzogc3RyaW5nO1xuICBcImxpbmtcIj86IHN0cmluZztcbiAgXCJvcHRpb25zXCI/OiBhbnk7XG4gIFwiaWRcIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFN0YXJ0TGlua1JlcXVlc3QgaW1wbGVtZW50cyBTdGFydExpbmtSZXF1ZXN0SW50ZXJmYWNlIHtcbiAgXCJjaGF0Qm90SW50ZXJuYWxTZXNzaW9uSWRcIjogc3RyaW5nO1xuICBcImxpbmtcIjogc3RyaW5nO1xuICBcIm9wdGlvbnNcIjogYW55O1xuICBcImlkXCI6IHN0cmluZztcbiAgY29uc3RydWN0b3IoZGF0YT86IFN0YXJ0TGlua1JlcXVlc3RJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFN0YXJ0TGlua1JlcXVlc3RgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU3RhcnRMaW5rUmVxdWVzdFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN0YXJ0TGlua1JlcXVlc3QgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU3RhcnRMaW5rUmVxdWVzdEludGVyZmFjZSk6IFN0YXJ0TGlua1JlcXVlc3R7XG4gICAgcmV0dXJuIG5ldyBTdGFydExpbmtSZXF1ZXN0KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnU3RhcnRMaW5rUmVxdWVzdCcsXG4gICAgICBwbHVyYWw6ICdTdGFydExpbmtSZXF1ZXN0cycsXG4gICAgICBwYXRoOiAnU3RhcnRMaW5rUmVxdWVzdHMnLFxuICAgICAgaWROYW1lOiAnaWQnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImNoYXRCb3RJbnRlcm5hbFNlc3Npb25JZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NoYXRCb3RJbnRlcm5hbFNlc3Npb25JZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJsaW5rXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGluaycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcHRpb25zXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3B0aW9ucycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19