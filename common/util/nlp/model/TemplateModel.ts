/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";


export default class AttachmentModel extends BaseModel {

  attachedType: string;
  url: string;
  label: string;
  triggerNavigation: boolean;
  pageNavigation: any;



  constructor(section: any, pageNavigation: any, attachedType:string, url:string) {
    super(AttachmentModel.name, section);
    this.label = section.sectionLabel;
    this.triggerNavigation = true;
    this.pageNavigation = pageNavigation;
    this.attachedType = attachedType;
    this.url = url;
  }

}
