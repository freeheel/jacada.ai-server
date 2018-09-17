/* tslint:disable */

declare var Object: any;
export interface AutomationCommandInterface {
  "spui"?: string;
  "service"?: string;
  "serviceArguments"?: Array<any>;
  "transactionId"?: string;
  "id"?: string;
}

export class AutomationCommand implements AutomationCommandInterface {
  "spui": string;
  "service": string;
  "serviceArguments": Array<any>;
  "transactionId": string;
  "id": string;
  constructor(data?: AutomationCommandInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AutomationCommand`.
   */
  public static getModelName() {
    return "AutomationCommand";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AutomationCommand for dynamic purposes.
  **/
  public static factory(data: AutomationCommandInterface): AutomationCommand{
    return new AutomationCommand(data);
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
      name: 'AutomationCommand',
      plural: 'AutomationCommands',
      path: 'AutomationCommands',
      idName: 'id',
      properties: {
        "spui": {
          name: 'spui',
          type: 'string'
        },
        "service": {
          name: 'service',
          type: 'string'
        },
        "serviceArguments": {
          name: 'serviceArguments',
          type: 'Array&lt;any&gt;'
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
