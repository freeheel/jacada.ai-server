/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";


export default class AttachmentModel extends BaseModel {

    type: string;
    url: string;
    label: string;
    triggerNavigation: boolean;
    pageNavigation: any;



    constructor(section: any, pageNavigation: any, type:string, url:string) {
        super(AttachmentModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
        this.type = type;
        this.url = url;
    }

}
