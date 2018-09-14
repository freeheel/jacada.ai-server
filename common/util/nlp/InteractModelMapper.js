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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsNEVBQW9EO0FBRXBELE1BQXFCLG1CQUFtQjtJQUV0QztJQUNBLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxRQUFhO1FBRXZDLElBQUksb0JBQW9CLEdBQVUsRUFBRSxDQUFDO1FBRXJDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBRW5ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7WUFDckMsZ0RBQWdEO1lBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMvQztRQUNELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztRQUVuRixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFFNUIsSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMxRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFFdkMsNERBQTREO29CQUc1RCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO3dCQUN2QyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUJBQ3hEO29CQUVEOzs7Ozs7OztzQkFRRTtpQkFDSDtnQkFDRDs7O21CQUdHO2FBQ0o7aUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDM0QsNERBQTREO2dCQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMzRTtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDMUQsNERBQTREO2dCQUM1RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMzRTtRQUVILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQztJQUU5QixDQUFDO0lBRU8sY0FBYyxDQUFDLFFBQWE7UUFDbEMsSUFBSSxvQkFBb0IsR0FBVSxFQUFFLENBQUM7UUFFckMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixDQUFDO1FBRTdDLElBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDZixPQUFPLG9CQUFvQixDQUFDO1NBQzdCO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO1lBQ2xDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDbEI7YUFBTSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEtBQUssWUFBWSxFQUFFO1lBQ3ZFLFFBQVEsR0FBRyxZQUFZLENBQUM7U0FDekI7YUFBTSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO1lBQ25FLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDckI7UUFFRCxJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFFN0IsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDL0csT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNwRCxPQUFPLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUVKO2FBQU0sSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLElBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU1RSxvQkFBb0IsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3BELE9BQU8sSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLG9CQUFvQixDQUFDO0lBRTlCLENBQUM7SUFBQSxDQUFDO0lBRUYsU0FBUyxDQUFDLFFBQWE7UUFDckIsT0FBTztZQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDO1lBQzVDLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztTQUNuQyxDQUFBO0lBQ0gsQ0FBQztDQUdGO0FBM0dELHNDQTJHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZXh0TW9kZWwgZnJvbSBcIi4vbW9kZWwvVGV4dE1vZGVsXCI7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4vbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RNb2RlbE1hcHBlciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwcml2YXRlIGdldEludGVyYWN0UmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IGFueVtdIHtcblxuICAgIGxldCB0cmFuc2Zvcm1lZFJlc3BvbnNlczogYW55W10gPSBbXTtcblxuICAgIGNvbnN0IGludGVyYWN0UmVzcG9uc2UgPSByZXNwb25zZS5pbnRlcmFjdFJlc3BvbnNlO1xuXG4gICAgaWYgKCFpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZSkge1xuICAgICAgLy8gVGhpcyBpcyBhbiBpbnB1dC4gd2hpY2ggd2UgZG9uwrR0IHN1cHBvcnQgeWV0LlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBpcyBub3Qgc3VwcG9ydGVkIHlldCcpO1xuICAgIH1cbiAgICBjb25zdCBzZWN0aW9ucyA9IGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZUNvbnRlbnQuY29udGVudFNlY3Rpb25zO1xuXG4gICAgc2VjdGlvbnMubWFwKChzZWN0aW9uOiBhbnkpID0+IHtcblxuICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS5pZCkge1xuICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcy5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICAgIC8vIFRPRE8gUnlhbiAtIGFkZCBzdXBwb3J0IGZvciBpbnB1dCBhbmQgb3RoZXIgcmljaCBvdXRwdXRzLlxuXG5cbiAgICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS50ZXh0SW5wdXQpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRJbnB1dE1vZGVsKHNlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxuXG4gICAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS51cGxvYWRJbWFnZUxpc3QpIHtcblxuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBJbWFnZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgIH0qL1xuICAgICAgfSBlbHNlIGlmICghc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25IZWFkZXIpIHtcbiAgICAgICAgLy8gVE9ETyBSeWFuIC0gdHJhbnNmb3JtIGl0IHRvIHdoYXQgbWFrZXMgc2Vuc2UgZm9yIEZhY2Vib29rXG4gICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRNb2RlbChzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uSGVhZGVyKSB7XG4gICAgICAgIC8vIFRPRE8gUnlhbiAtIHRyYW5zZm9ybSBpdCB0byB3aGF0IG1ha2VzIHNlbnNlIGZvciBGYWNlYm9va1xuICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0TW9kZWwoc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbCkpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmxwUmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IGFueVtdIHtcbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBsZXQgYm90UmVzcG9uc2UgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZTtcblxuICAgIGlmKCFib3RSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuICAgIH1cblxuICAgIGxldCBhaVZlbmRvciA9ICdOYU4nO1xuXG4gICAgLy8gY2hlY2sgd2hpY2ggdmVuZG9yXG4gICAgaWYgKCFib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZSkge1xuICAgICAgYWlWZW5kb3IgPSAnTmFOJztcbiAgICB9IGVsc2UgaWYgKGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLm5scEVuZ2luZVR5cGUgPT09ICdESUFMT0dGTE9XJykge1xuICAgICAgYWlWZW5kb3IgPSAnZGlhbG9nZmxvdyc7XG4gICAgfSBlbHNlIGlmIChib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS5ubHBFbmdpbmVUeXBlID09PSAnV0FUU09OJykge1xuICAgICAgYWlWZW5kb3IgPSAnd2F0c29uJztcbiAgICB9XG5cbiAgICBpZiAoYWlWZW5kb3IgPT09ICdkaWFsb2dmbG93Jykge1xuXG4gICAgICBsZXQgdGV4dFJlc3BvbmVzID0gYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UudmVuZG9yUmVzcG9uc2UucmVzdWx0LmZ1bGZpbGxtZW50Lm1lc3NhZ2VzLm1hcCgobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLnNwZWVjaDtcbiAgICAgIH0pO1xuXG4gICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcyA9IHRleHRSZXNwb25lcy5tYXAoKHRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRNb2RlbCh0ZXh0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChhaVZlbmRvciA9PT0gJ3dhdHNvbicpIHtcbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSBib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5vdXRwdXQudGV4dDtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfTtcblxuICB0cmFuc2xhdGUocmVzcG9uc2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVyYWN0OiB0aGlzLmdldEludGVyYWN0UmVzcG9uc2UocmVzcG9uc2UpLFxuICAgICAgbmxwOiB0aGlzLmdldE5scFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG5cbn1cbiJdfQ==