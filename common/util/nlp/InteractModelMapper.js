"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextModel_1 = __importDefault(require("./model/TextModel"));
const TextInputModel_1 = __importDefault(require("./model/TextInputModel"));
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
            if (section.sectionChoices && section.sectionChoices[0].id) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsNEVBQW9EO0FBRXBELE1BQXFCLG1CQUFtQjtJQUV0QztJQUNBLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxRQUFhO1FBRXZDLElBQUksb0JBQW9CLEdBQVUsRUFBRSxDQUFDO1FBRXJDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBRW5ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7WUFDckMsZ0RBQWdEO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMvQztRQUNELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUVuRixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFFNUIsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFFdkMsNERBQTREO29CQUc1RCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO3dCQUN2QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUJBQ3hEO29CQUVEOzs7Ozs7OztzQkFRRTtpQkFDSDtnQkFDRDs7O21CQUdHO2FBQ0o7aUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsNERBQTREO2dCQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMzRTtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDMUQsNERBQTREO2dCQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMzRTtRQUVILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQztJQUU5QixDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWE7UUFDbEMsSUFBSSxvQkFBb0IsR0FBVSxFQUFFLENBQUM7UUFFckMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBRTdDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztRQUVyQixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTtZQUNsQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxLQUFLLFlBQVksRUFBRTtZQUN2RSxRQUFRLEdBQUcsWUFBWSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUNuRSxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxRQUFRLEtBQUssWUFBWSxFQUFFO1lBRTdCLElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7Z0JBQy9HLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVILG9CQUFvQixHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FFSjthQUFNLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUUsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNwRCxPQUFPLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxvQkFBb0IsQ0FBQztJQUU5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFNBQVMsQ0FBQyxRQUFhO1FBQ3JCLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztZQUM1QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7U0FDbkMsQ0FBQTtJQUNILENBQUM7Q0FHRjtBQXZHRCxzQ0F1R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dE1vZGVsIGZyb20gXCIuL21vZGVsL1RleHRNb2RlbFwiO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuL21vZGVsL1RleHRJbnB1dE1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0TW9kZWxNYXBwZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcmFjdFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG5cbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBjb25zdCBpbnRlcmFjdFJlc3BvbnNlID0gcmVzcG9uc2UuaW50ZXJhY3RSZXNwb25zZTtcblxuICAgIGlmICghaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UpIHtcbiAgICAgIC8vIFRoaXMgaXMgYW4gaW5wdXQuIHdoaWNoIHdlIGRvbsK0dCBzdXBwb3J0IHlldC5cbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2VjdGlvbnMgPSBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VDb250ZW50LmNvbnRlbnRTZWN0aW9ucztcblxuICAgIHNlY3Rpb25zLm1hcCgoc2VjdGlvbjogYW55KSA9PiB7XG5cbiAgICAgIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uaWQpIHtcbiAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMubGVuZ3RoID09PSAxKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIFJ5YW4gLSBhZGQgc3VwcG9ydCBmb3IgaW5wdXQgYW5kIG90aGVyIHJpY2ggb3V0cHV0cy5cblxuXG4gICAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0udGV4dElucHV0KSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0SW5wdXRNb2RlbChzZWN0aW9uKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLypcblxuICAgICAgICAgIGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0udXBsb2FkSW1hZ2VMaXN0KSB7XG5cbiAgICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgSW1hZ2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAqL1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgICB9Ki9cbiAgICAgIH0gZWxzZSBpZiAoIXNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uSGVhZGVyKSB7XG4gICAgICAgIC8vIFRPRE8gUnlhbiAtIHRyYW5zZm9ybSBpdCB0byB3aGF0IG1ha2VzIHNlbnNlIGZvciBGYWNlYm9va1xuICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0TW9kZWwoc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbCkpO1xuICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkhlYWRlcikge1xuICAgICAgICAvLyBUT0RPIFJ5YW4gLSB0cmFuc2Zvcm0gaXQgdG8gd2hhdCBtYWtlcyBzZW5zZSBmb3IgRmFjZWJvb2tcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dE1vZGVsKHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWwpKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gIH1cblxuICBwcml2YXRlIGdldE5scFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGV0IGJvdFJlc3BvbnNlID0gcmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2U7XG5cbiAgICBsZXQgYWlWZW5kb3IgPSAnTmFOJztcblxuICAgIC8vIGNoZWNrIHdoaWNoIHZlbmRvclxuICAgIGlmICghYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UpIHtcbiAgICAgIGFpVmVuZG9yID0gJ05hTic7XG4gICAgfSBlbHNlIGlmIChib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS5ubHBFbmdpbmVUeXBlID09PSAnRElBTE9HRkxPVycpIHtcbiAgICAgIGFpVmVuZG9yID0gJ2RpYWxvZ2Zsb3cnO1xuICAgIH0gZWxzZSBpZiAoYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UubmxwRW5naW5lVHlwZSA9PT0gJ1dBVFNPTicpIHtcbiAgICAgIGFpVmVuZG9yID0gJ3dhdHNvbic7XG4gICAgfVxuXG4gICAgaWYgKGFpVmVuZG9yID09PSAnZGlhbG9nZmxvdycpIHtcblxuICAgICAgbGV0IHRleHRSZXNwb25lcyA9IGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLnZlbmRvclJlc3BvbnNlLnJlc3VsdC5mdWxmaWxsbWVudC5tZXNzYWdlcy5tYXAoKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5zcGVlY2g7XG4gICAgICB9KTtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAoYWlWZW5kb3IgPT09ICd3YXRzb24nKSB7XG4gICAgICBsZXQgdGV4dFJlc3BvbmVzID0gYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UudmVuZG9yUmVzcG9uc2Uub3V0cHV0LnRleHQ7XG5cbiAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzID0gdGV4dFJlc3BvbmVzLm1hcCgodGV4dDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dE1vZGVsKHRleHQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gIH07XG5cbiAgdHJhbnNsYXRlKHJlc3BvbnNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcmFjdDogdGhpcy5nZXRJbnRlcmFjdFJlc3BvbnNlKHJlc3BvbnNlKSxcbiAgICAgIG5scDogdGhpcy5nZXRObHBSZXNwb25zZShyZXNwb25zZSlcbiAgICB9XG4gIH1cblxuXG59XG4iXX0=