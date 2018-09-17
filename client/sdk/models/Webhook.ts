/* tslint:disable */

declare var Object: any;
export interface WebhookInterface {
  "id"?: number;
}

export class Webhook implements WebhookInterface {
  "id": number;
  constructor(data?: WebhookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Webhook`.
   */
  public static getModelName() {
    return "Webhook";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Webhook for dynamic purposes.
  **/
  public static factory(data: WebhookInterface): Webhook{
    return new Webhook(data);
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
      name: 'Webhook',
      plural: 'Webhooks',
      path: 'Webhooks',
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
