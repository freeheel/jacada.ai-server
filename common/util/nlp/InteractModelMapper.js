"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextModel_1 = __importDefault(require("./model/TextModel"));
const TextInputModel_1 = __importDefault(require("./model/TextInputModel"));
const ChoiceModel_1 = __importDefault(require("./model/ChoiceModel"));
class InteractModelMapper {
    constructor() {
    }
    getInteractResponse(response) {
        let transformedResponses = [];
        const interactResponse = response.interactResponse;
        if (!interactResponse.elementResponse) {
            // This is an input. which we don´t support yet.
            throw new Error('Input is not supported yet');
        }
        const sections = interactResponse.elementResponse.page.pageContent.contentSections;
        sections.map((section) => {
            console.log('Element Type ' + section.elementType);
            if (section.elementType === 'QUESTION_CHOICES_ELEMENT') {
                transformedResponses.push(new ChoiceModel_1.default(section, interactResponse.elementResponse.page.pageNavigation));
            }
            else if (section.sectionChoices && section.sectionChoices[0].id) {
                if (section.sectionChoices.length === 1) {
                    // TODO Ryan - add support for input and other rich outputs.
                    if (section.sectionChoices[0].textInput) {
                        transformedResponses.push(new TextInputModel_1.default(section));
                    }
                    /*
          
                    else if (section.sectionChoices[0].uploadImageList) {
          
                        transformedResponses.push(new ImageModel(section, interactResponse.elementResponse.page.pageNavigation));
                    } else {
                        transformedResponses.push(new ChoiceModel(section, interactResponse.elementResponse.page.pageNavigation));
                    }
                    */
                }
                /*
                else if (section.sectionChoices.length > 1) {
                    transformedResponses.push(new ChoiceModel(section, interactResponse.elementResponse.page.pageNavigation));
                }*/
            }
            else if (!section.sectionChoices && section.sectionHeader) {
                // TODO Ryan - transform it to what makes sense for Facebook
                transformedResponses.push(new TextModel_1.default(section.sectionHeader.innerHtml));
            }
            else if (section.sectionChoices && section.sectionHeader) {
                // TODO Ryan - transform it to what makes sense for Facebook
                transformedResponses.push(new TextModel_1.default(section.sectionHeader.innerHtml));
            }
        });
        return transformedResponses;
    }
    getNlpResponse(response) {
        let transformedResponses = [];
        let botResponse = response.nlpEngineResponse;
        if (!botResponse) {
            return transformedResponses;
        }
        let aiVendor = 'NaN';
        // check which vendor
        if (!botResponse.nlpEngineResponse) {
            aiVendor = 'NaN';
        }
        else if (botResponse.nlpEngineResponse.nlpEngineType === 'DIALOGFLOW') {
            aiVendor = 'dialogflow';
        }
        else if (botResponse.nlpEngineResponse.nlpEngineType === 'WATSON') {
            aiVendor = 'watson';
        }
        if (aiVendor === 'dialogflow') {
            let textRespones = botResponse.nlpEngineResponse.vendorResponse.result.fulfillment.messages.map((message) => {
                return message.speech;
            });
            transformedResponses = textRespones.map((text) => {
                return new TextModel_1.default(text);
            });
        }
        else if (aiVendor === 'watson') {
            let textRespones = botResponse.nlpEngineResponse.vendorResponse.output.text;
            transformedResponses = textRespones.map((text) => {
                return new TextModel_1.default(text);
            });
        }
        return transformedResponses;
    }
    ;
    translate(response) {
        return {
            interact: this.getInteractResponse(response),
            nlp: this.getNlpResponse(response)
        };
    }
}
exports.default = InteractModelMapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsNEVBQW9EO0FBQ3BELHNFQUE4QztBQUU5QyxNQUFxQixtQkFBbUI7SUFFdEM7SUFDQSxDQUFDO0lBRU8sbUJBQW1CLENBQUMsUUFBYTtRQUV2QyxJQUFJLG9CQUFvQixHQUFVLEVBQUUsQ0FBQztRQUVyQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQ3JDLGdEQUFnRDtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFFbkYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEtBQUssMEJBQTBCLEVBQUU7Z0JBQ3RELG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUMxRztpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xFLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUV2Qyw0REFBNEQ7b0JBRzVELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7d0JBQ3ZDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDeEQ7b0JBRUQ7Ozs7Ozs7O3NCQVFFO2lCQUNIO2dCQUNEOzs7bUJBR0c7YUFDSjtpQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUMzRCw0REFBNEQ7Z0JBQzVELG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO2dCQUMxRCw0REFBNEQ7Z0JBQzVELG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzNFO1FBRUgsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLG9CQUFvQixDQUFDO0lBRTlCLENBQUM7SUFFTyxjQUFjLENBQUMsUUFBYTtRQUNsQyxJQUFJLG9CQUFvQixHQUFVLEVBQUUsQ0FBQztRQUVyQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFFN0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPLG9CQUFvQixDQUFDO1NBQzdCO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO1lBQ2xDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDbEI7YUFBTSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEtBQUssWUFBWSxFQUFFO1lBQ3ZFLFFBQVEsR0FBRyxZQUFZLENBQUM7U0FDekI7YUFBTSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ25FLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDckI7UUFFRCxJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFFN0IsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDL0csT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNwRCxPQUFPLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUVKO2FBQU0sSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1RSxvQkFBb0IsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3BELE9BQU8sSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLG9CQUFvQixDQUFDO0lBRTlCLENBQUM7SUFBQSxDQUFDO0lBRUYsU0FBUyxDQUFDLFFBQWE7UUFDckIsT0FBTztZQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDO1lBQzVDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztTQUNuQyxDQUFBO0lBQ0gsQ0FBQztDQUdGO0FBN0dELHNDQTZHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0TW9kZWwgZnJvbSBcIi4vbW9kZWwvVGV4dE1vZGVsXCI7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4vbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcbmltcG9ydCBDaG9pY2VNb2RlbCBmcm9tIFwiLi9tb2RlbC9DaG9pY2VNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdE1vZGVsTWFwcGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJhY3RSZXNwb25zZShyZXNwb25zZTogYW55KTogYW55W10ge1xuXG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3QgaW50ZXJhY3RSZXNwb25zZSA9IHJlc3BvbnNlLmludGVyYWN0UmVzcG9uc2U7XG5cbiAgICBpZiAoIWludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlKSB7XG4gICAgICAvLyBUaGlzIGlzIGFuIGlucHV0LiB3aGljaCB3ZSBkb27CtHQgc3VwcG9ydCB5ZXQuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNlY3Rpb25zID0gaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlQ29udGVudC5jb250ZW50U2VjdGlvbnM7XG5cbiAgICBzZWN0aW9ucy5tYXAoKHNlY3Rpb246IGFueSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0VsZW1lbnQgVHlwZSAnICsgc2VjdGlvbi5lbGVtZW50VHlwZSk7XG4gICAgICBpZiAoc2VjdGlvbi5lbGVtZW50VHlwZSA9PT0gJ1FVRVNUSU9OX0NIT0lDRVNfRUxFTUVOVCcpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLmlkKSB7XG4gICAgICAgIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgICAgLy8gVE9ETyBSeWFuIC0gYWRkIHN1cHBvcnQgZm9yIGlucHV0IGFuZCBvdGhlciByaWNoIG91dHB1dHMuXG5cblxuICAgICAgICAgIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dElucHV0TW9kZWwoc2VjdGlvbikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qXG5cbiAgICAgICAgICBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLnVwbG9hZEltYWdlTGlzdCkge1xuXG4gICAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IEltYWdlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IENob2ljZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgKi9cbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IENob2ljZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgfSovXG4gICAgICB9IGVsc2UgaWYgKCFzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkhlYWRlcikge1xuICAgICAgICAvLyBUT0RPIFJ5YW4gLSB0cmFuc2Zvcm0gaXQgdG8gd2hhdCBtYWtlcyBzZW5zZSBmb3IgRmFjZWJvb2tcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dE1vZGVsKHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWwpKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25IZWFkZXIpIHtcbiAgICAgICAgLy8gVE9ETyBSeWFuIC0gdHJhbnNmb3JtIGl0IHRvIHdoYXQgbWFrZXMgc2Vuc2UgZm9yIEZhY2Vib29rXG4gICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRNb2RlbChzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sKSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFJlc3BvbnNlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBnZXRObHBSZXNwb25zZShyZXNwb25zZTogYW55KTogYW55W10ge1xuICAgIGxldCB0cmFuc2Zvcm1lZFJlc3BvbnNlczogYW55W10gPSBbXTtcblxuICAgIGxldCBib3RSZXNwb25zZSA9IHJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlO1xuXG4gICAgaWYgKCFib3RSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuICAgIH1cblxuICAgIGxldCBhaVZlbmRvciA9ICdOYU4nO1xuXG4gICAgLy8gY2hlY2sgd2hpY2ggdmVuZG9yXG4gICAgaWYgKCFib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZSkge1xuICAgICAgYWlWZW5kb3IgPSAnTmFOJztcbiAgICB9IGVsc2UgaWYgKGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLm5scEVuZ2luZVR5cGUgPT09ICdESUFMT0dGTE9XJykge1xuICAgICAgYWlWZW5kb3IgPSAnZGlhbG9nZmxvdyc7XG4gICAgfSBlbHNlIGlmIChib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS5ubHBFbmdpbmVUeXBlID09PSAnV0FUU09OJykge1xuICAgICAgYWlWZW5kb3IgPSAnd2F0c29uJztcbiAgICB9XG5cbiAgICBpZiAoYWlWZW5kb3IgPT09ICdkaWFsb2dmbG93Jykge1xuXG4gICAgICBsZXQgdGV4dFJlc3BvbmVzID0gYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UudmVuZG9yUmVzcG9uc2UucmVzdWx0LmZ1bGZpbGxtZW50Lm1lc3NhZ2VzLm1hcCgobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLnNwZWVjaDtcbiAgICAgIH0pO1xuXG4gICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcyA9IHRleHRSZXNwb25lcy5tYXAoKHRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRNb2RlbCh0ZXh0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChhaVZlbmRvciA9PT0gJ3dhdHNvbicpIHtcbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSBib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5vdXRwdXQudGV4dDtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfTtcblxuICB0cmFuc2xhdGUocmVzcG9uc2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVyYWN0OiB0aGlzLmdldEludGVyYWN0UmVzcG9uc2UocmVzcG9uc2UpLFxuICAgICAgbmxwOiB0aGlzLmdldE5scFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG5cbn1cbiJdfQ==