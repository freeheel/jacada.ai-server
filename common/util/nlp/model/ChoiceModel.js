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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hvaWNlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaG9pY2VNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUFvQztBQUVwQyxNQUFhLE1BQU07SUFJakIsWUFBWSxNQUFXO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBRUY7QUFURCx3QkFTQztBQUVELE1BQXFCLFdBQVksU0FBUSxtQkFBUztJQVNoRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksT0FBWSxFQUFFLGNBQW1CO1FBQ3ZDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBbEJyQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQWlCcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFFL0IsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRTtZQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixFQUFFO1lBQzlELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBTSxJQUFJLGNBQWMsQ0FBQyxlQUFlLElBQUksY0FBYyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssZUFBZSxFQUFFO1lBQzFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDakM7UUFFRCxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0NBRUo7QUF6Q0QsOEJBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIENob2ljZSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBhcmFtZXRlcklkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2hvaWNlOiBhbnkpIHtcbiAgICB0aGlzLmxhYmVsID0gY2hvaWNlLmNob2ljZU9wdGlvbi5idXR0b25MYWJlbDtcbiAgICB0aGlzLnBhcmFtZXRlcklkID0gY2hvaWNlLmNob2ljZU9wdGlvbi5pZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob2ljZU1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuXG4gICAgcXVlc3Rpb25MYWJlbDogc3RyaW5nO1xuICAgIHRyaWdnZXJOYXZpZ2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgbWF0cml4TGF5b3V0OiBib29sZWFuID0gZmFsc2U7XG4gICAgY2hvaWNlcyA6IENob2ljZVtdID0gW107XG5cblxuICAvKipcbiAgICpcbiAgICogQE5vdGU6IGltcG9ydGFudFxuICAgKlxuICAgKiBXZSBuZWVkIHRvIGhhdmUgdGhlIHBhZ2VOYXZpZ2F0aW9uIHNpbmNlIHNvbWV0aW1lcyB3ZSB3b3VsZCBjb250aW51ZSBhIGZsb3csIGJ1dCBvdGhlciB0aW1lcyB3ZSB3b3VsZCBsaWtlIHRvXG4gICAqIGdpdmUgc29tZSBvcHRpb25zIHRvIHRoZSB1c2VyIHdoaWNoIHNob3VsZCBiZSB0cmVldGVkIGFzIHRleHQgaW5wdXQuXG4gICAqXG4gICAqIFNvIGlmIHRyaWdnZXJOYXZpZ2F0aW9uID09PSB0cnVlLCB3ZSBoYXZlIHRvIGNvbnRpbnVlIHRoZSBmbG93LCBpZiBub3Qgd2Ugd2lsbCB0cmVhdCBpdCBhcyBhIHRleHQgbWVzc2FnZSFcbiAgICpcbiAgICogQHBhcmFtIHNlY3Rpb25cbiAgICogQHBhcmFtIHBhZ2VOYXZpZ2F0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBhbnksIHBhZ2VOYXZpZ2F0aW9uOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoQ2hvaWNlTW9kZWwubmFtZSwgc2VjdGlvbik7XG4gICAgICAgIHRoaXMucXVlc3Rpb25MYWJlbCA9IHNlY3Rpb24uc2VjdGlvbkxhYmVsO1xuICAgICAgICB0aGlzLnRyaWdnZXJOYXZpZ2F0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uY2xpY2tUb0NvbnRpbnVlKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLmNsaWNrVG9Db250aW51ZU1hdHJpeExheW91dCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1hdHJpeExheW91dCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAocGFnZU5hdmlnYXRpb24ubmF2aWdhdGlvblJpZ2h0ICYmIHBhZ2VOYXZpZ2F0aW9uLm5hdmlnYXRpb25SaWdodC5idXR0b25BY3Rpb24gPT09ICdDT05USU5VRV9GTE9XJykge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5jaG9pY2VzLnB1c2gobmV3IENob2ljZShpdGVtKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG4iXX0=