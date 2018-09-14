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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsNEVBQW9EO0FBQ3BELHNFQUE4QztBQUU5QyxNQUFxQixtQkFBbUI7SUFFdEM7SUFDQSxDQUFDO0lBRU8sbUJBQW1CLENBQUMsUUFBYTtRQUV2QyxJQUFJLG9CQUFvQixHQUFVLEVBQUUsQ0FBQztRQUVyQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQ3JDLGdEQUFnRDtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFFbkYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBRTVCLElBQUksT0FBTyxDQUFDLFdBQVcsS0FBSywwQkFBMEIsRUFBRTtnQkFDdEQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzNHO2lCQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBRXZDLDREQUE0RDtvQkFHNUQsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTt3QkFDdkMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksd0JBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUN4RDtvQkFFRDs7Ozs7Ozs7c0JBUUU7aUJBQ0g7Z0JBQ0Q7OzttQkFHRzthQUNKO2lCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELDREQUE0RDtnQkFDNUQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDM0U7aUJBQU0sSUFBSSxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JBQzFELDREQUE0RDtnQkFDNUQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDM0U7UUFFSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sb0JBQW9CLENBQUM7SUFFOUIsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFhO1FBQ2xDLElBQUksb0JBQW9CLEdBQVUsRUFBRSxDQUFDO1FBRXJDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUU3QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE9BQU8sb0JBQW9CLENBQUM7U0FDN0I7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFckIscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7WUFDbEMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUNsQjthQUFNLElBQUksV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsS0FBSyxZQUFZLEVBQUU7WUFDdkUsUUFBUSxHQUFHLFlBQVksQ0FBQztTQUN6QjthQUFNLElBQUksV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDbkUsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNyQjtRQUVELElBQUksUUFBUSxLQUFLLFlBQVksRUFBRTtZQUU3QixJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO2dCQUMvRyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxvQkFBb0IsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQ3BELE9BQU8sSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1NBRUo7YUFBTSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTVFLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sb0JBQW9CLENBQUM7SUFFOUIsQ0FBQztJQUFBLENBQUM7SUFFRixTQUFTLENBQUMsUUFBYTtRQUNyQixPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7WUFDNUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO1NBQ25DLENBQUE7SUFDSCxDQUFDO0NBR0Y7QUE3R0Qsc0NBNkdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHRNb2RlbCBmcm9tIFwiLi9tb2RlbC9UZXh0TW9kZWxcIjtcbmltcG9ydCBUZXh0SW5wdXRNb2RlbCBmcm9tIFwiLi9tb2RlbC9UZXh0SW5wdXRNb2RlbFwiO1xuaW1wb3J0IENob2ljZU1vZGVsIGZyb20gXCIuL21vZGVsL0Nob2ljZU1vZGVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0TW9kZWxNYXBwZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcmFjdFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG5cbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBjb25zdCBpbnRlcmFjdFJlc3BvbnNlID0gcmVzcG9uc2UuaW50ZXJhY3RSZXNwb25zZTtcblxuICAgIGlmICghaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UpIHtcbiAgICAgIC8vIFRoaXMgaXMgYW4gaW5wdXQuIHdoaWNoIHdlIGRvbsK0dCBzdXBwb3J0IHlldC5cbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgaXMgbm90IHN1cHBvcnRlZCB5ZXQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2VjdGlvbnMgPSBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VDb250ZW50LmNvbnRlbnRTZWN0aW9ucztcblxuICAgIHNlY3Rpb25zLm1hcCgoc2VjdGlvbjogYW55KSA9PiB7XG5cbiAgICAgIGlmIChzZWN0aW9uLmVsZW1lbnRUeXBlID09PSAnUVVFU1RJT05fQ0hPSUNFU19FTEVNRU5UJykge1xuICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS5pZCkge1xuICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcy5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICAgIC8vIFRPRE8gUnlhbiAtIGFkZCBzdXBwb3J0IGZvciBpbnB1dCBhbmQgb3RoZXIgcmljaCBvdXRwdXRzLlxuXG5cbiAgICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS50ZXh0SW5wdXQpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRJbnB1dE1vZGVsKHNlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxuXG4gICAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS51cGxvYWRJbWFnZUxpc3QpIHtcblxuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBJbWFnZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgIH0qL1xuICAgICAgfSBlbHNlIGlmICghc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25IZWFkZXIpIHtcbiAgICAgICAgLy8gVE9ETyBSeWFuIC0gdHJhbnNmb3JtIGl0IHRvIHdoYXQgbWFrZXMgc2Vuc2UgZm9yIEZhY2Vib29rXG4gICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRNb2RlbChzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uSGVhZGVyKSB7XG4gICAgICAgIC8vIFRPRE8gUnlhbiAtIHRyYW5zZm9ybSBpdCB0byB3aGF0IG1ha2VzIHNlbnNlIGZvciBGYWNlYm9va1xuICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0TW9kZWwoc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbCkpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmxwUmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IGFueVtdIHtcbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBsZXQgYm90UmVzcG9uc2UgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZTtcblxuICAgIGlmICghYm90UmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFJlc3BvbnNlcztcbiAgICB9XG5cbiAgICBsZXQgYWlWZW5kb3IgPSAnTmFOJztcblxuICAgIC8vIGNoZWNrIHdoaWNoIHZlbmRvclxuICAgIGlmICghYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UpIHtcbiAgICAgIGFpVmVuZG9yID0gJ05hTic7XG4gICAgfSBlbHNlIGlmIChib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS5ubHBFbmdpbmVUeXBlID09PSAnRElBTE9HRkxPVycpIHtcbiAgICAgIGFpVmVuZG9yID0gJ2RpYWxvZ2Zsb3cnO1xuICAgIH0gZWxzZSBpZiAoYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UubmxwRW5naW5lVHlwZSA9PT0gJ1dBVFNPTicpIHtcbiAgICAgIGFpVmVuZG9yID0gJ3dhdHNvbic7XG4gICAgfVxuXG4gICAgaWYgKGFpVmVuZG9yID09PSAnZGlhbG9nZmxvdycpIHtcblxuICAgICAgbGV0IHRleHRSZXNwb25lcyA9IGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLnZlbmRvclJlc3BvbnNlLnJlc3VsdC5mdWxmaWxsbWVudC5tZXNzYWdlcy5tYXAoKG1lc3NhZ2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5zcGVlY2g7XG4gICAgICB9KTtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAoYWlWZW5kb3IgPT09ICd3YXRzb24nKSB7XG4gICAgICBsZXQgdGV4dFJlc3BvbmVzID0gYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UudmVuZG9yUmVzcG9uc2Uub3V0cHV0LnRleHQ7XG5cbiAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzID0gdGV4dFJlc3BvbmVzLm1hcCgodGV4dDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dE1vZGVsKHRleHQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gIH07XG5cbiAgdHJhbnNsYXRlKHJlc3BvbnNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnRlcmFjdDogdGhpcy5nZXRJbnRlcmFjdFJlc3BvbnNlKHJlc3BvbnNlKSxcbiAgICAgIG5scDogdGhpcy5nZXRObHBSZXNwb25zZShyZXNwb25zZSlcbiAgICB9XG4gIH1cblxuXG59XG4iXX0=