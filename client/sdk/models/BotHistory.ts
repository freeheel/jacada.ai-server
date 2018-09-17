/* tslint:disable */

declare var Object: any;
export interface BotHistoryInterface {
  "data"?: any;
  "id"?: any;
}

export class BotHistory implements BotHistoryInterface {
  "data": any;
  "id": any;
  constructor(data?: BotHistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `BotHistory`.
   */
  public static getModelName() {
    return "BotHistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of BotHistory for dynamic purposes.
  **/
  public static factory(data: BotHistoryInterface): BotHistory{
    return new BotHistory(data);
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
      name: 'BotHistory',
      plural: 'BotHistories',
      path: 'BotHistories',
      idName: 'id',
      properties: {
        "data": {
          name: 'data',
          type: 'any'
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
