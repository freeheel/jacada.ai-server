/* tslint:disable */

declare var Object: any;
export interface MaintainanceInterface {
  "id"?: string;
}

export class Maintainance implements MaintainanceInterface {
  "id": string;
  constructor(data?: MaintainanceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Maintainance`.
   */
  public static getModelName() {
    return "Maintainance";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Maintainance for dynamic purposes.
  **/
  public static factory(data: MaintainanceInterface): Maintainance{
    return new Maintainance(data);
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
      name: 'Maintainance',
      plural: 'Maintainances',
      path: 'Maintainances',
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
