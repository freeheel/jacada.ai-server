/* tslint:disable */

declare var Object: any;
export interface ChatSessionWrapperInterface {
  "sessionId": string;
  "apiKey"?: string;
  "interactions"?: any;
  "interactionStack"?: any;
  "asyncTasks"?: any;
  "id"?: any;
  "chatMessageList"?: Array<any>;
  "chatDataList"?: Array<any>;
  chatMassages?: any[];
  chatData?: any[];
}

export class ChatSessionWrapper implements ChatSessionWrapperInterface {
  "sessionId": string;
  "apiKey": string;
  "interactions": any;
  "interactionStack": any;
  "asyncTasks": any;
  "id": any;
  "chatMessageList": Array<any>;
  "chatDataList": Array<any>;
  chatMassages: any[];
  chatData: any[];
  constructor(data?: ChatSessionWrapperInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ChatSessionWrapper`.
   */
  public static getModelName() {
    return "ChatSessionWrapper";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ChatSessionWrapper for dynamic purposes.
  **/
  public static factory(data: ChatSessionWrapperInterface): ChatSessionWrapper{
    return new ChatSessionWrapper(data);
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
      name: 'ChatSessionWrapper',
      plural: 'ChatSessionWrappers',
      path: 'ChatSessionWrappers',
      idName: 'id',
      properties: {
        "sessionId": {
          name: 'sessionId',
          type: 'string'
        },
        "apiKey": {
          name: 'apiKey',
          type: 'string'
        },
        "interactions": {
          name: 'interactions',
          type: 'any'
        },
        "interactionStack": {
          name: 'interactionStack',
          type: 'any'
        },
        "asyncTasks": {
          name: 'asyncTasks',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "chatMessageList": {
          name: 'chatMessageList',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
        "chatDataList": {
          name: 'chatDataList',
          type: 'Array&lt;any&gt;',
          default: <any>[]
        },
      },
      relations: {
        chatMassages: {
          name: 'chatMassages',
          type: 'any[]',
          model: '',
          relationType: 'embedsMany',
                  keyFrom: 'chatMessageList',
          keyTo: 'id'
        },
        chatData: {
          name: 'chatData',
          type: 'any[]',
          model: '',
          relationType: 'embedsMany',
                  keyFrom: 'chatDataList',
          keyTo: 'id'
        },
      }
    }
  }
}
