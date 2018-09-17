/* tslint:disable */

declare var Object: any;
export interface FacebookConfigInterface {
  "description"?: string;
  "verificationToken"?: string;
  "recipientId"?: string;
  "apiToken"?: string;
  "tenantId"?: string;
  "apiKey"?: string;
  "environment"?: string;
  "domainName"?: string;
  "sessionTimeout"?: number;
  "spuiMapping"?: Array<any>;
  "id"?: any;
}

export class FacebookConfig implements FacebookConfigInterface {
  "description": string;
  "verificationToken": string;
  "recipientId": string;
  "apiToken": string;
  "tenantId": string;
  "apiKey": string;
  "environment": string;
  "domainName": string;
  "sessionTimeout": number;
  "spuiMapping": Array<any>;
  "id": any;
  constructor(data?: FacebookConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacebookConfig`.
   */
  public static getModelName() {
    return "FacebookConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacebookConfig for dynamic purposes.
  **/
  public static factory(data: FacebookConfigInterface): FacebookConfig{
    return new FacebookConfig(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
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
      relations: {
      }
    }
  }
}
