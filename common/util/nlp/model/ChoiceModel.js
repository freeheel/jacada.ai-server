"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = __importDefault(require("./BaseModel"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hvaWNlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaG9pY2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztHQUVHO0FBQ0gsNERBQW9DO0FBR3BDLE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQU05QyxZQUFZLE9BQVksRUFBRSxjQUFtQjtRQUN6QyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUhyQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUkxQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFO1lBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDakM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNLElBQUksY0FBYyxDQUFDLGVBQWUsSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxlQUFlLEVBQUU7WUFDMUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUNqQztJQUNMLENBQUM7Q0FFSjtBQXJCRCw4QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENsYXNzIHRvIHRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgZnJvbSBpbnRlcmFjdCB0byBVSSBtb2RlbC5cbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaG9pY2VNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHRyaWdnZXJOYXZpZ2F0aW9uOiBib29sZWFuO1xuICAgIG1hdHJpeExheW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbjogYW55LCBwYWdlTmF2aWdhdGlvbjogYW55KSB7XG4gICAgICAgIHN1cGVyKENob2ljZU1vZGVsLm5hbWUsIHNlY3Rpb24pO1xuICAgICAgICB0aGlzLmxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XG4gICAgICAgIHRoaXMudHJpZ2dlck5hdmlnYXRpb24gPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS5jbGlja1RvQ29udGludWUpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlck5hdmlnYXRpb24gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uY2xpY2tUb0NvbnRpbnVlTWF0cml4TGF5b3V0KSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWF0cml4TGF5b3V0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWdlTmF2aWdhdGlvbi5uYXZpZ2F0aW9uUmlnaHQgJiYgcGFnZU5hdmlnYXRpb24ubmF2aWdhdGlvblJpZ2h0LmJ1dHRvbkFjdGlvbiA9PT0gJ0NPTlRJTlVFX0ZMT1cnKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19