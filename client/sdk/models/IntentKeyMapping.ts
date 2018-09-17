/* tslint:disable */

declare var Object: any;
export interface IntentKeyMappingInterface {
  "name"?: string;
  "clientAccessKey"?: string;
  "developerAccessKey"?: string;
  "id"?: any;
}

export class IntentKeyMapping implements IntentKeyMappingInterface {
  "name": string;
  "clientAccessKey": string;
  "developerAccessKey": string;
  "id": any;
  constructor(data?: IntentKeyMappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IntentKeyMapping`.
   */
  public static getModelName() {
    return "IntentKeyMapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IntentKeyMapping for dynamic purposes.
  **/
  public static factory(data: IntentKeyMappingInterface): IntentKeyMapping{
    return new IntentKeyMapping(data);
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
      name: 'IntentKeyMapping',
      plural: 'IntentKeyMappings',
      path: 'IntentKeyMappings',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "clientAccessKey": {
          name: 'clientAccessKey',
          type: 'string'
        },
        "developerAccessKey": {
          name: 'developerAccessKey',
          type: 'string'
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
