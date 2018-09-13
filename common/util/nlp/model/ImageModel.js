"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = require("./BaseModel");
class ImageModel extends BaseModel_1.default {
    constructor(section, pageNavigation) {
        super(ImageModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
    }
}
exports.default = ImageModel;
//# sourceMappingURL=ImageModel.js.map