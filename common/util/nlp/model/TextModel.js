"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = require("./BaseModel");
class TextModel extends BaseModel_1.default {
    constructor(text = '') {
        super(TextModel.name);
        this.text = text;
    }
}
exports.default = TextModel;
//# sourceMappingURL=TextModel.js.map