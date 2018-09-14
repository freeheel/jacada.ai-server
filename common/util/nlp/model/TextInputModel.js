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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dElucHV0TW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXh0SW5wdXRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztHQUVHO0FBQ0gsNERBQW9DO0FBRXBDLE1BQXFCLGNBQWUsU0FBUSxtQkFBUztJQU1qRCxZQUFZLE9BQVk7UUFDcEIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFFN0UsQ0FBQztDQUVKO0FBZkQsaUNBZUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ2xhc3MgdG8gdHJhbnNmb3JtIHRoZSByZXNwb25zZSBmcm9tIGludGVyYWN0IHRvIFVJIG1vZGVsLlxyXG4gKi9cclxuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRJbnB1dE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcclxuXHJcbiAgICBxdWVzdGlvbkxhYmVsOmFueTtcclxuICAgIHBhcmFtZXRlcklkOiBzdHJpbmc7XHJcbiAgICBwYXJhbWV0ZXJUeXBlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoVGV4dElucHV0TW9kZWwubmFtZSwgc2VjdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMucXVlc3Rpb25MYWJlbCA9IHNlY3Rpb24uc2VjdGlvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVySWQgPSBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLmlkO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVyVHlwZSA9IHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0udGV4dElucHV0LnRleHRJbnB1dEZvcm1hdDtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==