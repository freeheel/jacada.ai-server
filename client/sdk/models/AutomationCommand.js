"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class AutomationCommand {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AutomationCommand`.
     */
    static getModelName() {
        return "AutomationCommand";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AutomationCommand for dynamic purposes.
    **/
    static factory(data) {
        return new AutomationCommand(data);
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
            name: 'AutomationCommand',
            plural: 'AutomationCommands',
            path: 'AutomationCommands',
            idName: 'id',
            properties: {
                "spui": {
                    name: 'spui',
                    type: 'string'
                },
                "service": {
                    name: 'service',
                    type: 'string'
                },
                "serviceArguments": {
                    name: 'serviceArguments',
                    type: 'Array&lt;any&gt;'
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
exports.AutomationCommand = AutomationCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b21hdGlvbkNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBdXRvbWF0aW9uQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9COztBQVdwQixNQUFhLGlCQUFpQjtJQU01QixZQUFZLElBQWlDO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBZ0M7UUFDcEQsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsa0JBQWtCO2lCQUN6QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBaEVELDhDQWdFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBBdXRvbWF0aW9uQ29tbWFuZEludGVyZmFjZSB7XG4gIFwic3B1aVwiPzogc3RyaW5nO1xuICBcInNlcnZpY2VcIj86IHN0cmluZztcbiAgXCJzZXJ2aWNlQXJndW1lbnRzXCI/OiBBcnJheTxhbnk+O1xuICBcInRyYW5zYWN0aW9uSWRcIj86IHN0cmluZztcbiAgXCJpZFwiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b21hdGlvbkNvbW1hbmQgaW1wbGVtZW50cyBBdXRvbWF0aW9uQ29tbWFuZEludGVyZmFjZSB7XG4gIFwic3B1aVwiOiBzdHJpbmc7XG4gIFwic2VydmljZVwiOiBzdHJpbmc7XG4gIFwic2VydmljZUFyZ3VtZW50c1wiOiBBcnJheTxhbnk+O1xuICBcInRyYW5zYWN0aW9uSWRcIjogc3RyaW5nO1xuICBcImlkXCI6IHN0cmluZztcbiAgY29uc3RydWN0b3IoZGF0YT86IEF1dG9tYXRpb25Db21tYW5kSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBBdXRvbWF0aW9uQ29tbWFuZGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJBdXRvbWF0aW9uQ29tbWFuZFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEF1dG9tYXRpb25Db21tYW5kIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEF1dG9tYXRpb25Db21tYW5kSW50ZXJmYWNlKTogQXV0b21hdGlvbkNvbW1hbmR7XG4gICAgcmV0dXJuIG5ldyBBdXRvbWF0aW9uQ29tbWFuZChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0F1dG9tYXRpb25Db21tYW5kJyxcbiAgICAgIHBsdXJhbDogJ0F1dG9tYXRpb25Db21tYW5kcycsXG4gICAgICBwYXRoOiAnQXV0b21hdGlvbkNvbW1hbmRzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJzcHVpXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3B1aScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXJ2aWNlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2VydmljZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXJ2aWNlQXJndW1lbnRzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2VydmljZUFyZ3VtZW50cycsXG4gICAgICAgICAgdHlwZTogJ0FycmF5Jmx0O2FueSZndDsnXG4gICAgICAgIH0sXG4gICAgICAgIFwidHJhbnNhY3Rpb25JZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3RyYW5zYWN0aW9uSWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==