/* tslint:disable */

declare var Object: any;
export interface ContactUsCommandInterface {
  "spui"?: string;
  "chatBotSessionId"?: string;
  "interactionSessionId"?: string;
  "scriptUrl"?: string;
  "id"?: string;
}

export class ContactUsCommand implements ContactUsCommandInterface {
  "spui": string;
  "chatBotSessionId": string;
  "interactionSessionId": string;
  "scriptUrl": string;
  "id": string;
  constructor(data?: ContactUsCommandInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ContactUsCommand`.
   */
  public static getModelName() {
    return "ContactUsCommand";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ContactUsCommand for dynamic purposes.
  **/
  public static factory(data: ContactUsCommandInterface): ContactUsCommand{
    return new ContactUsCommand(data);
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
      name: 'ContactUsCommand',
      plural: 'ContactUsCommands',
      path: 'ContactUsCommands',
      idName: 'id',
      properties: {
        "spui": {
          name: 'spui',
          type: 'string'
        },
        "chatBotSessionId": {
          name: 'chatBotSessionId',
          type: 'string'
        },
        "interactionSessionId": {
          name: 'interactionSessionId',
          type: 'string'
        },
        "scriptUrl": {
          name: 'scriptUrl',
          type: 'string'
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
