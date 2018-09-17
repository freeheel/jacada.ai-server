"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class FacebookWebHook {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `FacebookWebHook`.
     */
    static getModelName() {
        return "FacebookWebHook";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of FacebookWebHook for dynamic purposes.
    **/
    static factory(data) {
        return new FacebookWebHook(data);
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
            name: 'FacebookWebHook',
            plural: 'FacebookWebHooks',
            path: 'FacebookWebHooks',
            idName: 'id',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}
exports.FacebookWebHook = FacebookWebHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tXZWJIb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmFjZWJvb2tXZWJIb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7O0FBT3BCLE1BQWEsZUFBZTtJQUUxQixZQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUE1Q0QsMENBNENDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEZhY2Vib29rV2ViSG9va0ludGVyZmFjZSB7XG4gIFwiaWRcIj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEZhY2Vib29rV2ViSG9vayBpbXBsZW1lbnRzIEZhY2Vib29rV2ViSG9va0ludGVyZmFjZSB7XG4gIFwiaWRcIjogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRmFjZWJvb2tXZWJIb29rSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBGYWNlYm9va1dlYkhvb2tgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRmFjZWJvb2tXZWJIb29rXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRmFjZWJvb2tXZWJIb29rIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEZhY2Vib29rV2ViSG9va0ludGVyZmFjZSk6IEZhY2Vib29rV2ViSG9va3tcbiAgICByZXR1cm4gbmV3IEZhY2Vib29rV2ViSG9vayhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0ZhY2Vib29rV2ViSG9vaycsXG4gICAgICBwbHVyYWw6ICdGYWNlYm9va1dlYkhvb2tzJyxcbiAgICAgIHBhdGg6ICdGYWNlYm9va1dlYkhvb2tzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJpZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19