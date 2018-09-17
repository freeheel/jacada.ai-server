/* tslint:disable */

declare var Object: any;
export interface BotCommandInterface {
  "conversationId"?: string;
  "command"?: string;
  "payload"?: any;
  "transactionId"?: string;
  "id"?: string;
}

export class BotCommand implements BotCommandInterface {
  "conversationId": string;
  "command": string;
  "payload": any;
  "transactionId": string;
  "id": string;
  constructor(data?: BotCommandInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BotCommand`.
   */
  public static getModelName() {
    return "BotCommand";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BotCommand for dynamic purposes.
  **/
  public static factory(data: BotCommandInterface): BotCommand{
    return new BotCommand(data);
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
      name: 'BotCommand',
      plural: 'BotCommands',
      path: 'BotCommands',
      idName: 'id',
      properties: {
        "conversationId": {
          name: 'conversationId',
          type: 'string'
        },
        "command": {
          name: 'command',
          type: 'string'
        },
        "payload": {
          name: 'payload',
          type: 'any'
        },
        "transactionId": {
          name: 'transactionId',
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
