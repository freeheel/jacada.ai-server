"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = __importDefault(require("./BaseModel"));
class TextInputModel extends BaseModel_1.default {
    constructor(section) {
        super(TextInputModel.name, section);
        this.questionLabel = section.sectionLabel;
        this.parameterId = section.sectionChoices[0].id;
        this.parameterType = section.sectionChoices[0].textInput.textInputFormat;
    }
}
exports.default = TextInputModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dElucHV0TW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXh0SW5wdXRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztHQUVHO0FBQ0gsNERBQW9DO0FBRXBDLE1BQXFCLGNBQWUsU0FBUSxtQkFBUztJQU1qRCxZQUFZLE9BQVk7UUFDcEIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFFN0UsQ0FBQztDQUVKO0FBZkQsaUNBZUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENsYXNzIHRvIHRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgZnJvbSBpbnRlcmFjdCB0byBVSSBtb2RlbC5cbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dElucHV0TW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgcXVlc3Rpb25MYWJlbDphbnk7XG4gICAgcGFyYW1ldGVySWQ6IHN0cmluZztcbiAgICBwYXJhbWV0ZXJUeXBlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoVGV4dElucHV0TW9kZWwubmFtZSwgc2VjdGlvbik7XG5cbiAgICAgICAgdGhpcy5xdWVzdGlvbkxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XG4gICAgICAgIHRoaXMucGFyYW1ldGVySWQgPSBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLmlkO1xuICAgICAgICB0aGlzLnBhcmFtZXRlclR5cGUgPSBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLnRleHRJbnB1dC50ZXh0SW5wdXRGb3JtYXQ7XG5cbiAgICB9XG5cbn1cbiJdfQ==