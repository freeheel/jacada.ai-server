"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = require("./BaseModel");
class ChoiceModel extends BaseModel_1.default {
    constructor(section, pageNavigation) {
        super(ChoiceModel.name, section);
        this.matrixLayout = false;
        this.label = section.sectionLabel;
        this.triggerNavigation = false;
        if (section.sectionChoices[0].clickToContinue) {
            this.triggerNavigation = true;
        }
        else if (section.sectionChoices[0].clickToContinueMatrixLayout) {
            this.triggerNavigation = true;
            this.matrixLayout = true;
        }
        else if (pageNavigation.navigationRight && pageNavigation.navigationRight.buttonAction === 'CONTINUE_FLOW') {
            this.triggerNavigation = true;
        }
    }
}
exports.default = ChoiceModel;
//# sourceMappingURL=ChoiceModel.js.map