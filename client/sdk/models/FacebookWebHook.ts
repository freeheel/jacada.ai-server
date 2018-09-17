/* tslint:disable */

declare var Object: any;
export interface FacebookWebHookInterface {
  "id"?: number;
}

export class FacebookWebHook implements FacebookWebHookInterface {
  "id": number;
  constructor(data?: FacebookWebHookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacebookWebHook`.
   */
  public static getModelName() {
    return "FacebookWebHook";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacebookWebHook for dynamic purposes.
  **/
  public static factory(data: FacebookWebHookInterface): FacebookWebHook{
    return new FacebookWebHook(data);
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
      name: 'FacebookWebHook',
      plural: 'FacebookWebHooks',
      path: 'FacebookWebHooks',
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
