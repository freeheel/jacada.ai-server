/* tslint:disable */

declare var Object: any;
export interface ContactUsHelperInterface {
  "id"?: number;
}

export class ContactUsHelper implements ContactUsHelperInterface {
  "id": number;
  constructor(data?: ContactUsHelperInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ContactUsHelper`.
   */
  public static getModelName() {
    return "ContactUsHelper";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ContactUsHelper for dynamic purposes.
  **/
  public static factory(data: ContactUsHelperInterface): ContactUsHelper{
    return new ContactUsHelper(data);
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
      name: 'ContactUsHelper',
      plural: 'ContactUsHelpers',
      path: 'ContactUsHelpers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
