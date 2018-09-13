/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";


export default class ChoiceModel extends BaseModel {

    label: string;
    triggerNavigation: boolean;
    matrixLayout: boolean = false;

    constructor(section: any, pageNavigation: any) {
        super(ChoiceModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = false;

        if (section.sectionChoices[0].clickToContinue) {
            this.triggerNavigation = true;
        } else if (section.sectionChoices[0].clickToContinueMatrixLayout) {
            this.triggerNavigation = true;
            this.matrixLayout = true;
        } else if (pageNavigation.navigationRight && pageNavigation.navigationRight.buttonAction === 'CONTINUE_FLOW') {
            this.triggerNavigation = true;
        }
    }

}
