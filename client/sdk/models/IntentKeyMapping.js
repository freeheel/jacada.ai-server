"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class IntentKeyMapping {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `IntentKeyMapping`.
     */
    static getModelName() {
        return "IntentKeyMapping";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of IntentKeyMapping for dynamic purposes.
    **/
    static factory(data) {
        return new IntentKeyMapping(data);
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
            name: 'IntentKeyMapping',
            plural: 'IntentKeyMappings',
            path: 'IntentKeyMappings',
            idName: 'id',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "clientAccessKey": {
                    name: 'clientAccessKey',
                    type: 'string'
                },
                "developerAccessKey": {
                    name: 'developerAccessKey',
                    type: 'string'
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
exports.IntentKeyMapping = IntentKeyMapping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZW50S2V5TWFwcGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVudEtleU1hcHBpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFVcEIsTUFBYSxnQkFBZ0I7SUFLM0IsWUFBWSxJQUFnQztRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQStCO1FBQ25ELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxvQkFBb0IsRUFBRTtvQkFDcEIsSUFBSSxFQUFFLG9CQUFvQjtvQkFDMUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUEzREQsNENBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEludGVudEtleU1hcHBpbmdJbnRlcmZhY2Uge1xuICBcIm5hbWVcIj86IHN0cmluZztcbiAgXCJjbGllbnRBY2Nlc3NLZXlcIj86IHN0cmluZztcbiAgXCJkZXZlbG9wZXJBY2Nlc3NLZXlcIj86IHN0cmluZztcbiAgXCJpZFwiPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgSW50ZW50S2V5TWFwcGluZyBpbXBsZW1lbnRzIEludGVudEtleU1hcHBpbmdJbnRlcmZhY2Uge1xuICBcIm5hbWVcIjogc3RyaW5nO1xuICBcImNsaWVudEFjY2Vzc0tleVwiOiBzdHJpbmc7XG4gIFwiZGV2ZWxvcGVyQWNjZXNzS2V5XCI6IHN0cmluZztcbiAgXCJpZFwiOiBhbnk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbnRlbnRLZXlNYXBwaW5nSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbnRlbnRLZXlNYXBwaW5nYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkludGVudEtleU1hcHBpbmdcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbnRlbnRLZXlNYXBwaW5nIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEludGVudEtleU1hcHBpbmdJbnRlcmZhY2UpOiBJbnRlbnRLZXlNYXBwaW5ne1xuICAgIHJldHVybiBuZXcgSW50ZW50S2V5TWFwcGluZyhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0ludGVudEtleU1hcHBpbmcnLFxuICAgICAgcGx1cmFsOiAnSW50ZW50S2V5TWFwcGluZ3MnLFxuICAgICAgcGF0aDogJ0ludGVudEtleU1hcHBpbmdzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGllbnRBY2Nlc3NLZXlcIjoge1xuICAgICAgICAgIG5hbWU6ICdjbGllbnRBY2Nlc3NLZXknLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGV2ZWxvcGVyQWNjZXNzS2V5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGV2ZWxvcGVyQWNjZXNzS2V5JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=