"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncBotMessage {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AsyncBotMessage`.
     */
    static getModelName() {
        return "AsyncBotMessage";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AsyncBotMessage for dynamic purposes.
    **/
    static factory(data) {
        return new AsyncBotMessage(data);
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
            name: 'AsyncBotMessage',
            plural: 'AsyncBotMessages',
            path: 'AsyncBotMessages',
            idName: 'id',
            properties: {
                "chatBotInternalSessionId": {
                    name: 'chatBotInternalSessionId',
                    type: 'string'
                },
                "textMessages": {
                    name: 'textMessages',
                    type: 'Array&lt;any&gt;'
                },
                "interactBotMessages": {
                    name: 'interactBotMessages',
                    type: 'Array&lt;any&gt;'
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
exports.AsyncBotMessage = AsyncBotMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNCb3RNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXN5bmNCb3RNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBVXBCLE1BQWEsZUFBZTtJQUsxQixZQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsMEJBQTBCLEVBQUU7b0JBQzFCLElBQUksRUFBRSwwQkFBMEI7b0JBQ2hDLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLGtCQUFrQjtpQkFDekI7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxrQkFBa0I7aUJBQ3pCO2dCQUNELElBQUksRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBM0RELDBDQTJEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBBc3luY0JvdE1lc3NhZ2VJbnRlcmZhY2Uge1xuICBcImNoYXRCb3RJbnRlcm5hbFNlc3Npb25JZFwiOiBzdHJpbmc7XG4gIFwidGV4dE1lc3NhZ2VzXCI/OiBBcnJheTxhbnk+O1xuICBcImludGVyYWN0Qm90TWVzc2FnZXNcIj86IEFycmF5PGFueT47XG4gIFwiaWRcIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFzeW5jQm90TWVzc2FnZSBpbXBsZW1lbnRzIEFzeW5jQm90TWVzc2FnZUludGVyZmFjZSB7XG4gIFwiY2hhdEJvdEludGVybmFsU2Vzc2lvbklkXCI6IHN0cmluZztcbiAgXCJ0ZXh0TWVzc2FnZXNcIjogQXJyYXk8YW55PjtcbiAgXCJpbnRlcmFjdEJvdE1lc3NhZ2VzXCI6IEFycmF5PGFueT47XG4gIFwiaWRcIjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogQXN5bmNCb3RNZXNzYWdlSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBBc3luY0JvdE1lc3NhZ2VgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQXN5bmNCb3RNZXNzYWdlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQXN5bmNCb3RNZXNzYWdlIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEFzeW5jQm90TWVzc2FnZUludGVyZmFjZSk6IEFzeW5jQm90TWVzc2FnZXtcbiAgICByZXR1cm4gbmV3IEFzeW5jQm90TWVzc2FnZShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0FzeW5jQm90TWVzc2FnZScsXG4gICAgICBwbHVyYWw6ICdBc3luY0JvdE1lc3NhZ2VzJyxcbiAgICAgIHBhdGg6ICdBc3luY0JvdE1lc3NhZ2VzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJjaGF0Qm90SW50ZXJuYWxTZXNzaW9uSWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdjaGF0Qm90SW50ZXJuYWxTZXNzaW9uSWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwidGV4dE1lc3NhZ2VzXCI6IHtcbiAgICAgICAgICBuYW1lOiAndGV4dE1lc3NhZ2VzJyxcbiAgICAgICAgICB0eXBlOiAnQXJyYXkmbHQ7YW55Jmd0OydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbnRlcmFjdEJvdE1lc3NhZ2VzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaW50ZXJhY3RCb3RNZXNzYWdlcycsXG4gICAgICAgICAgdHlwZTogJ0FycmF5Jmx0O2FueSZndDsnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==