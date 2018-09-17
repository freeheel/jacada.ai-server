"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    static getModelName() {
        return "User";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    static factory(data) {
        return new User(data);
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
            name: 'User',
            plural: 'Users',
            path: 'Users',
            idName: 'id',
            properties: {
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "credentials": {
                    name: 'credentials',
                    type: 'any'
                },
                "challenges": {
                    name: 'challenges',
                    type: 'any'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "status": {
                    name: 'status',
                    type: 'string'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "lastUpdated": {
                    name: 'lastUpdated',
                    type: 'Date'
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'any[]',
                    model: '',
                    relationType: 'hasMany',
                    keyFrom: 'id',
                    keyTo: 'userId'
                },
            }
        };
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjs7QUFpQnBCLE1BQWEsSUFBSTtJQVlmLFlBQVksSUFBb0I7UUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBbUI7UUFDdkMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxNQUFNO2lCQUNiO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxFQUFFO29CQUNULFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxJQUFJO29CQUNyQixLQUFLLEVBQUUsUUFBUTtpQkFDaEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF0R0Qsb0JBc0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFVzZXJJbnRlcmZhY2Uge1xuICBcInJlYWxtXCI/OiBzdHJpbmc7XG4gIFwidXNlcm5hbWVcIj86IHN0cmluZztcbiAgXCJjaGFsbGVuZ2VzXCI/OiBhbnk7XG4gIFwiZW1haWxcIjogc3RyaW5nO1xuICBcImVtYWlsVmVyaWZpZWRcIj86IGJvb2xlYW47XG4gIFwic3RhdHVzXCI/OiBzdHJpbmc7XG4gIFwiY3JlYXRlZFwiPzogRGF0ZTtcbiAgXCJsYXN0VXBkYXRlZFwiPzogRGF0ZTtcbiAgXCJpZFwiPzogYW55O1xuICBcInBhc3N3b3JkXCI/OiBzdHJpbmc7XG4gIGFjY2Vzc1Rva2Vucz86IGFueVtdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlciBpbXBsZW1lbnRzIFVzZXJJbnRlcmZhY2Uge1xuICBcInJlYWxtXCI6IHN0cmluZztcbiAgXCJ1c2VybmFtZVwiOiBzdHJpbmc7XG4gIFwiY2hhbGxlbmdlc1wiOiBhbnk7XG4gIFwiZW1haWxcIjogc3RyaW5nO1xuICBcImVtYWlsVmVyaWZpZWRcIjogYm9vbGVhbjtcbiAgXCJzdGF0dXNcIjogc3RyaW5nO1xuICBcImNyZWF0ZWRcIjogRGF0ZTtcbiAgXCJsYXN0VXBkYXRlZFwiOiBEYXRlO1xuICBcImlkXCI6IGFueTtcbiAgXCJwYXNzd29yZFwiOiBzdHJpbmc7XG4gIGFjY2Vzc1Rva2VuczogYW55W107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBVc2VySW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBVc2VyYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlVzZXJcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBVc2VyIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFVzZXJJbnRlcmZhY2UpOiBVc2Vye1xuICAgIHJldHVybiBuZXcgVXNlcihkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1VzZXInLFxuICAgICAgcGx1cmFsOiAnVXNlcnMnLFxuICAgICAgcGF0aDogJ1VzZXJzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJyZWFsbVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3JlYWxtJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInVzZXJuYW1lXCI6IHtcbiAgICAgICAgICBuYW1lOiAndXNlcm5hbWUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlZGVudGlhbHNcIjoge1xuICAgICAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJjaGFsbGVuZ2VzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnY2hhbGxlbmdlcycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbWFpbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2VtYWlsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImVtYWlsVmVyaWZpZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdlbWFpbFZlcmlmaWVkJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdGF0dXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdGF0dXMnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiY3JlYXRlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2NyZWF0ZWQnLFxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xuICAgICAgICB9LFxuICAgICAgICBcImxhc3RVcGRhdGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGFzdFVwZGF0ZWQnLFxuICAgICAgICAgIHR5cGU6ICdEYXRlJ1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwicGFzc3dvcmRcIjoge1xuICAgICAgICAgIG5hbWU6ICdwYXNzd29yZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgYWNjZXNzVG9rZW5zOiB7XG4gICAgICAgICAgbmFtZTogJ2FjY2Vzc1Rva2VucycsXG4gICAgICAgICAgdHlwZTogJ2FueVtdJyxcbiAgICAgICAgICBtb2RlbDogJycsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnaWQnLFxuICAgICAgICAgIGtleVRvOiAndXNlcklkJ1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19