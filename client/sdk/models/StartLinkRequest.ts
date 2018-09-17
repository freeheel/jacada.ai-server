/* tslint:disable */

declare var Object: any;
export interface StartLinkRequestInterface {
  "chatBotInternalSessionId"?: string;
  "link"?: string;
  "options"?: any;
  "id"?: string;
}

export class StartLinkRequest implements StartLinkRequestInterface {
  "chatBotInternalSessionId": string;
  "link": string;
  "options": any;
  "id": string;
  constructor(data?: StartLinkRequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StartLinkRequest`.
   */
  public static getModelName() {
    return "StartLinkRequest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StartLinkRequest for dynamic purposes.
  **/
  public static factory(data: StartLinkRequestInterface): StartLinkRequest{
    return new StartLinkRequest(data);
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
      relations: {
      }
    }
  }
}
