/* tslint:disable */

declare var Object: any;
export interface IntentChangeRequestInterface {
  "clientAccessKey"?: string;
  "chatSessionId"?: string;
  "intent"?: any;
  "shouldTriggerSuggestion"?: string;
  "requestedFrom"?: string;
  "handled"?: boolean;
  "id"?: any;
}

export class IntentChangeRequest implements IntentChangeRequestInterface {
  "clientAccessKey": string;
  "chatSessionId": string;
  "intent": any;
  "shouldTriggerSuggestion": string;
  "requestedFrom": string;
  "handled": boolean;
  "id": any;
  constructor(data?: IntentChangeRequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IntentChangeRequest`.
   */
  public static getModelName() {
    return "IntentChangeRequest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IntentChangeRequest for dynamic purposes.
  **/
  public static factory(data: IntentChangeRequestInterface): IntentChangeRequest{
    return new IntentChangeRequest(data);
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
      relations: {
      }
    }
  }
}
