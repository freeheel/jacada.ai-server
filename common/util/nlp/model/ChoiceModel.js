"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Choice {
    constructor(choice) {
        this.label = choice.choiceOption.buttonLabel;
        this.parameterId = choice.choiceOption.id;
    }
}
exports.Choice = Choice;
class ChoiceModel extends BaseModel_1.default {
    /**
     *
     * @Note: important
     *
     * We need to have the pageNavigation since sometimes we would continue a flow, but other times we would like to
     * give some options to the user which should be treeted as text input.
     *
     * So if triggerNavigation === true, we have to continue the flow, if not we will treat it as a text message!
     *
     * @param section
     * @param pageNavigation
     */
    constructor(section, pageNavigation) {
        super(ChoiceModel.name, section);
        this.triggerNavigation = false;
        this.matrixLayout = false;
        this.choices = [];
        this.questionLabel = section.sectionLabel;
        this.triggerNavigation = false;
        this.parameterId = section.id;
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
        section.sectionChoices.map((item) => {
            this.choices.push(new Choice(item));
        });
    }
}
exports.default = ChoiceModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hvaWNlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaG9pY2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUFvQztBQUVwQyxNQUFhLE1BQU07SUFJakIsWUFBWSxNQUFXO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBRUY7QUFURCx3QkFTQztBQUVELE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQVVoRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksT0FBWSxFQUFFLGNBQW1CO1FBQ3ZDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBbkJyQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQWlCcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBRzlCLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUNqQzthQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsRUFBRTtZQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxjQUFjLENBQUMsZUFBZSxJQUFJLGNBQWMsQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLGVBQWUsRUFBRTtZQUMxRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztDQUVKO0FBNUNELDhCQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwgZnJvbSBcIi4vQmFzZU1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hvaWNlIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBhcmFtZXRlcklkOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNob2ljZTogYW55KSB7XHJcbiAgICB0aGlzLmxhYmVsID0gY2hvaWNlLmNob2ljZU9wdGlvbi5idXR0b25MYWJlbDtcclxuICAgIHRoaXMucGFyYW1ldGVySWQgPSBjaG9pY2UuY2hvaWNlT3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob2ljZU1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcclxuXHJcblxyXG4gICAgcXVlc3Rpb25MYWJlbDogc3RyaW5nO1xyXG4gICAgdHJpZ2dlck5hdmlnYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIG1hdHJpeExheW91dDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcGFyYW1ldGVySWQ6IHN0cmluZztcclxuICAgIGNob2ljZXMgOiBDaG9pY2VbXSA9IFtdO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBATm90ZTogaW1wb3J0YW50XHJcbiAgICpcclxuICAgKiBXZSBuZWVkIHRvIGhhdmUgdGhlIHBhZ2VOYXZpZ2F0aW9uIHNpbmNlIHNvbWV0aW1lcyB3ZSB3b3VsZCBjb250aW51ZSBhIGZsb3csIGJ1dCBvdGhlciB0aW1lcyB3ZSB3b3VsZCBsaWtlIHRvXHJcbiAgICogZ2l2ZSBzb21lIG9wdGlvbnMgdG8gdGhlIHVzZXIgd2hpY2ggc2hvdWxkIGJlIHRyZWV0ZWQgYXMgdGV4dCBpbnB1dC5cclxuICAgKlxyXG4gICAqIFNvIGlmIHRyaWdnZXJOYXZpZ2F0aW9uID09PSB0cnVlLCB3ZSBoYXZlIHRvIGNvbnRpbnVlIHRoZSBmbG93LCBpZiBub3Qgd2Ugd2lsbCB0cmVhdCBpdCBhcyBhIHRleHQgbWVzc2FnZSFcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWN0aW9uXHJcbiAgICogQHBhcmFtIHBhZ2VOYXZpZ2F0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc2VjdGlvbjogYW55LCBwYWdlTmF2aWdhdGlvbjogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoQ2hvaWNlTW9kZWwubmFtZSwgc2VjdGlvbik7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVySWQgPSBzZWN0aW9uLmlkO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uY2xpY2tUb0NvbnRpbnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlck5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS5jbGlja1RvQ29udGludWVNYXRyaXhMYXlvdXQpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4TGF5b3V0ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhZ2VOYXZpZ2F0aW9uLm5hdmlnYXRpb25SaWdodCAmJiBwYWdlTmF2aWdhdGlvbi5uYXZpZ2F0aW9uUmlnaHQuYnV0dG9uQWN0aW9uID09PSAnQ09OVElOVUVfRkxPVycpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLm1hcCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNob2ljZXMucHVzaChuZXcgQ2hvaWNlKGl0ZW0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==