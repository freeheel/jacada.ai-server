"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
class FacebookConfig {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `FacebookConfig`.
     */
    static getModelName() {
        return "FacebookConfig";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of FacebookConfig for dynamic purposes.
    **/
    static factory(data) {
        return new FacebookConfig(data);
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
            name: 'FacebookConfig',
            plural: 'FacebookConfigs',
            path: 'FacebookConfigs',
            idName: 'id',
            properties: {
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "verificationToken": {
                    name: 'verificationToken',
                    type: 'string'
                },
                "recipientId": {
                    name: 'recipientId',
                    type: 'string'
                },
                "apiToken": {
                    name: 'apiToken',
                    type: 'string'
                },
                "tenantId": {
                    name: 'tenantId',
                    type: 'string'
                },
                "apiKey": {
                    name: 'apiKey',
                    type: 'string'
                },
                "environment": {
                    name: 'environment',
                    type: 'string'
                },
                "domainName": {
                    name: 'domainName',
                    type: 'string'
                },
                "sessionTimeout": {
                    name: 'sessionTimeout',
                    type: 'number',
                    default: 1800000
                },
                "spuiMapping": {
                    name: 'spuiMapping',
                    type: 'Array&lt;any&gt;'
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
exports.FacebookConfig = FacebookConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGYWNlYm9va0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9COztBQWlCcEIsTUFBYSxjQUFjO0lBWXpCLFlBQVksSUFBOEI7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUE2QjtRQUNqRCxPQUFPLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsSUFBSTtZQUNaLFVBQVUsRUFBRTtnQkFDVixhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtvQkFDZCxPQUFPLEVBQUUsT0FBTztpQkFDakI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsa0JBQWtCO2lCQUN6QjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQS9GRCx3Q0ErRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRmFjZWJvb2tDb25maWdJbnRlcmZhY2Uge1xuICBcImRlc2NyaXB0aW9uXCI/OiBzdHJpbmc7XG4gIFwidmVyaWZpY2F0aW9uVG9rZW5cIj86IHN0cmluZztcbiAgXCJyZWNpcGllbnRJZFwiPzogc3RyaW5nO1xuICBcImFwaVRva2VuXCI/OiBzdHJpbmc7XG4gIFwidGVuYW50SWRcIj86IHN0cmluZztcbiAgXCJhcGlLZXlcIj86IHN0cmluZztcbiAgXCJlbnZpcm9ubWVudFwiPzogc3RyaW5nO1xuICBcImRvbWFpbk5hbWVcIj86IHN0cmluZztcbiAgXCJzZXNzaW9uVGltZW91dFwiPzogbnVtYmVyO1xuICBcInNwdWlNYXBwaW5nXCI/OiBBcnJheTxhbnk+O1xuICBcImlkXCI/OiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBGYWNlYm9va0NvbmZpZyBpbXBsZW1lbnRzIEZhY2Vib29rQ29uZmlnSW50ZXJmYWNlIHtcbiAgXCJkZXNjcmlwdGlvblwiOiBzdHJpbmc7XG4gIFwidmVyaWZpY2F0aW9uVG9rZW5cIjogc3RyaW5nO1xuICBcInJlY2lwaWVudElkXCI6IHN0cmluZztcbiAgXCJhcGlUb2tlblwiOiBzdHJpbmc7XG4gIFwidGVuYW50SWRcIjogc3RyaW5nO1xuICBcImFwaUtleVwiOiBzdHJpbmc7XG4gIFwiZW52aXJvbm1lbnRcIjogc3RyaW5nO1xuICBcImRvbWFpbk5hbWVcIjogc3RyaW5nO1xuICBcInNlc3Npb25UaW1lb3V0XCI6IG51bWJlcjtcbiAgXCJzcHVpTWFwcGluZ1wiOiBBcnJheTxhbnk+O1xuICBcImlkXCI6IGFueTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEZhY2Vib29rQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBGYWNlYm9va0NvbmZpZ2AuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJGYWNlYm9va0NvbmZpZ1wiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEZhY2Vib29rQ29uZmlnIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEZhY2Vib29rQ29uZmlnSW50ZXJmYWNlKTogRmFjZWJvb2tDb25maWd7XG4gICAgcmV0dXJuIG5ldyBGYWNlYm9va0NvbmZpZyhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0ZhY2Vib29rQ29uZmlnJyxcbiAgICAgIHBsdXJhbDogJ0ZhY2Vib29rQ29uZmlncycsXG4gICAgICBwYXRoOiAnRmFjZWJvb2tDb25maWdzJyxcbiAgICAgIGlkTmFtZTogJ2lkJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInZlcmlmaWNhdGlvblRva2VuXCI6IHtcbiAgICAgICAgICBuYW1lOiAndmVyaWZpY2F0aW9uVG9rZW4nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVjaXBpZW50SWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdyZWNpcGllbnRJZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJhcGlUb2tlblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2FwaVRva2VuJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInRlbmFudElkXCI6IHtcbiAgICAgICAgICBuYW1lOiAndGVuYW50SWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiYXBpS2V5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnYXBpS2V5JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImVudmlyb25tZW50XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW52aXJvbm1lbnQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZG9tYWluTmFtZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RvbWFpbk5hbWUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vzc2lvblRpbWVvdXRcIjoge1xuICAgICAgICAgIG5hbWU6ICdzZXNzaW9uVGltZW91dCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgZGVmYXVsdDogMTgwMDAwMFxuICAgICAgICB9LFxuICAgICAgICBcInNwdWlNYXBwaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3B1aU1hcHBpbmcnLFxuICAgICAgICAgIHR5cGU6ICdBcnJheSZsdDthbnkmZ3Q7J1xuICAgICAgICB9LFxuICAgICAgICBcImlkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=