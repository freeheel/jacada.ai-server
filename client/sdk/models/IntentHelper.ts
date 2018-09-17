/* tslint:disable */

declare var Object: any;
export interface IntentHelperInterface {
  "id"?: string;
}

export class IntentHelper implements IntentHelperInterface {
  "id": string;
  constructor(data?: IntentHelperInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IntentHelper`.
   */
  public static getModelName() {
    return "IntentHelper";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IntentHelper for dynamic purposes.
  **/
  public static factory(data: IntentHelperInterface): IntentHelper{
    return new IntentHelper(data);
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
      name: 'IntentHelper',
      plural: 'IntentHelpers',
      path: 'IntentHelpers',
      idName: 'id',
      properties: {
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
