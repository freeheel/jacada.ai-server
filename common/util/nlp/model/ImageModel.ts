/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";


export default class ImageModel extends BaseModel {

    label: string;
    triggerNavigation: boolean;
    pageNavigation: any;

    constructor(section: any, pageNavigation: any) {
        super(ImageModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
    }

}