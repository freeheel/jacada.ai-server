/* tslint:disable */

declare var Object: any;
export interface BotHelperInterface {
  "id"?: string;
}

export class BotHelper implements BotHelperInterface {
  "id": string;
  constructor(data?: BotHelperInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BotHelper`.
   */
  public static getModelName() {
    return "BotHelper";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BotHelper for dynamic purposes.
  **/
  public static factory(data: BotHelperInterface): BotHelper{
    return new BotHelper(data);
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
      name: 'BotHelper',
      plural: 'BotHelpers',
      path: 'BotHelpers',
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
