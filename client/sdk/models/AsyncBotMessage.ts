/* tslint:disable */

declare var Object: any;
export interface AsyncBotMessageInterface {
  "chatBotInternalSessionId": string;
  "textMessages"?: Array<any>;
  "interactBotMessages"?: Array<any>;
  "id"?: string;
}

export class AsyncBotMessage implements AsyncBotMessageInterface {
  "chatBotInternalSessionId": string;
  "textMessages": Array<any>;
  "interactBotMessages": Array<any>;
  "id": string;
  constructor(data?: AsyncBotMessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AsyncBotMessage`.
   */
  public static getModelName() {
    return "AsyncBotMessage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AsyncBotMessage for dynamic purposes.
  **/
  public static factory(data: AsyncBotMessageInterface): AsyncBotMessage{
    return new AsyncBotMessage(data);
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
      relations: {
      }
    }
  }
}
