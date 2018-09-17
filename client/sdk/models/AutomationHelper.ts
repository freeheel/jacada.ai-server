/* tslint:disable */

declare var Object: any;
export interface AutomationHelperInterface {
  "id"?: string;
}

export class AutomationHelper implements AutomationHelperInterface {
  "id": string;
  constructor(data?: AutomationHelperInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AutomationHelper`.
   */
  public static getModelName() {
    return "AutomationHelper";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AutomationHelper for dynamic purposes.
  **/
  public static factory(data: AutomationHelperInterface): AutomationHelper{
    return new AutomationHelper(data);
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
      name: 'AutomationHelper',
      plural: 'AutomationHelpers',
      path: 'AutomationHelpers',
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
