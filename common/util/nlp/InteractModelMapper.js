"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextModel_1 = __importDefault(require("./model/TextModel"));
const ChoiceModel_1 = __importDefault(require("./model/ChoiceModel"));
const AttachmentModel_1 = __importDefault(require("./model/AttachmentModel"));
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
                //If there is text to send with an attachment, we need to send in a template
                //transformedResponses.push(new TextModel(section.sectionHeader.innerHtml));
                let innerHTML = section.sectionHeader.innerHtml;
                let type;
                if (innerHTML.includes('<img')) {
                    type = 'image';
                    let imgUrl = section.sectionHeader.innerHtml.split('<img')[1];
                    imgUrl = imgUrl.split("\"")[1];
                    console.log(section);
                    transformedResponses.push(new AttachmentModel_1.default(section, '', type, imgUrl));
                }
                else if (innerHTML.includes('<iframe') && innerHTML.includes('src')) {
                    type = 'video';
                    let videoUrl = section.sectionHeader.innerHtml.split('src');
                    videoUrl = videoUrl[1].split('"');
                    videoUrl = videoUrl[1];
                    console.log(section);
                    transformedResponses.push(new AttachmentModel_1.default(section, '', type, videoUrl));
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFFMUMsc0VBQThDO0FBQzlDLDhFQUFzRDtBQUV0RCxNQUFxQixtQkFBbUI7SUFFdEM7SUFDQSxDQUFDO0lBRU8sbUJBQW1CLENBQUMsUUFBYTtRQUV2QyxJQUFJLG9CQUFvQixHQUFVLEVBQUUsQ0FBQztRQUVyQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUVuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1lBQ3JDLGdEQUFnRDtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7UUFFbkYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBRTVCLElBQUksT0FBTyxDQUFDLFdBQVcsS0FBSywwQkFBMEIsRUFBRTtnQkFDdEQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzNHO2lCQUFNLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBRXZDLDREQUE0RDtpQkFFN0Q7Z0JBQ0Q7OzttQkFHRzthQUNKO2lCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7Z0JB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LEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7U0FFSjthQUFNLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFNUUsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNwRCxPQUFPLElBQUksbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxvQkFBb0IsQ0FBQztJQUU5QixDQUFDO0lBQUEsQ0FBQztJQUVGLFNBQVMsQ0FBQyxRQUFhO1FBQ3JCLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQztZQUM1QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7U0FDbkMsQ0FBQTtJQUNILENBQUM7Q0FHRjtBQXJIRCxzQ0FxSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGV4dE1vZGVsIGZyb20gXCIuL21vZGVsL1RleHRNb2RlbFwiO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuL21vZGVsL1RleHRJbnB1dE1vZGVsXCI7XG5pbXBvcnQgQ2hvaWNlTW9kZWwgZnJvbSBcIi4vbW9kZWwvQ2hvaWNlTW9kZWxcIjtcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSBcIi4vbW9kZWwvQXR0YWNobWVudE1vZGVsXCI7XG5pbXBvcnQgVGVtcGxhdGVNb2RlbCBmcm9tIFwiLi9tb2RlbC9UZW1wbGF0ZU1vZGVsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdE1vZGVsTWFwcGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJhY3RSZXNwb25zZShyZXNwb25zZTogYW55KTogYW55W10ge1xuXG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3QgaW50ZXJhY3RSZXNwb25zZSA9IHJlc3BvbnNlLmludGVyYWN0UmVzcG9uc2U7XG5cbiAgICBpZiAoIWludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlKSB7XG4gICAgICAvLyBUaGlzIGlzIGFuIGlucHV0LiB3aGljaCB3ZSBkb27CtHQgc3VwcG9ydCB5ZXQuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNlY3Rpb25zID0gaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlQ29udGVudC5jb250ZW50U2VjdGlvbnM7XG5cbiAgICBzZWN0aW9ucy5tYXAoKHNlY3Rpb246IGFueSkgPT4ge1xuXG4gICAgICBpZiAoc2VjdGlvbi5lbGVtZW50VHlwZSA9PT0gJ1FVRVNUSU9OX0NIT0lDRVNfRUxFTUVOVCcpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uaWQpIHtcbiAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMubGVuZ3RoID09PSAxKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIFJ5YW4gLSBhZGQgc3VwcG9ydCBmb3IgaW5wdXQgYW5kIG90aGVyIHJpY2ggb3V0cHV0cy5cblxuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgICB9Ki9cbiAgICAgIH0gZWxzZSBpZiAoIXNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uSGVhZGVyKSB7XG4gICAgICAgIC8vIFRPRE8gUnlhbiAtIHRyYW5zZm9ybSBpdCB0byB3aGF0IG1ha2VzIHNlbnNlIGZvciBGYWNlYm9va1xuICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0TW9kZWwoc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbCkpO1xuICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkhlYWRlcikge1xuXG4gICAgICAgICAgLy9JZiB0aGVyZSBpcyB0ZXh0IHRvIHNlbmQgd2l0aCBhbiBhdHRhY2htZW50LCB3ZSBuZWVkIHRvIHNlbmQgaW4gYSB0ZW1wbGF0ZVxuICAgICAgICAgIC8vdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dE1vZGVsKHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWwpKTtcbiAgICAgICAgICBsZXQgaW5uZXJIVE1MIDpzdHJpbmcgPSBzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sO1xuICAgICAgICAgIGxldCB0eXBlOnN0cmluZztcbiAgICAgICAgICBpZihpbm5lckhUTUwuaW5jbHVkZXMoJzxpbWcnKSkge1xuICAgICAgICAgICAgdHlwZSA9ICdpbWFnZSc7XG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbC5zcGxpdCgnPGltZycpWzFdO1xuICAgICAgICAgICAgaW1nVXJsID0gaW1nVXJsLnNwbGl0KFwiXFxcIlwiKVsxXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaCggbmV3IEF0dGFjaG1lbnRNb2RlbChzZWN0aW9uLCAnJywgdHlwZSwgaW1nVXJsKSk7XG5cbiAgICAgICAgICB9ZWxzZSBpZihpbm5lckhUTUwuaW5jbHVkZXMoJzxpZnJhbWUnKSAmJiBpbm5lckhUTUwuaW5jbHVkZXMoJ3NyYycpKXtcbiAgICAgICAgICAgIHR5cGUgPSAndmlkZW8nO1xuICAgICAgICAgICAgbGV0IHZpZGVvVXJsID0gc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbC5zcGxpdCgnc3JjJyk7XG4gICAgICAgICAgICB2aWRlb1VybCA9IHZpZGVvVXJsWzFdLnNwbGl0KCdcIicpO1xuICAgICAgICAgICAgdmlkZW9VcmwgPSB2aWRlb1VybFsxXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQXR0YWNobWVudE1vZGVsKHNlY3Rpb24sICcnLCB0eXBlLCB2aWRlb1VybCkpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gIH1cblxuICBwcml2YXRlIGdldE5scFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGV0IGJvdFJlc3BvbnNlID0gcmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2U7XG5cbiAgICBpZiAoIWJvdFJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG4gICAgfVxuXG4gICAgbGV0IGFpVmVuZG9yID0gJ05hTic7XG5cbiAgICAvLyBjaGVjayB3aGljaCB2ZW5kb3JcbiAgICBpZiAoIWJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlKSB7XG4gICAgICBhaVZlbmRvciA9ICdOYU4nO1xuICAgIH0gZWxzZSBpZiAoYm90UmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UubmxwRW5naW5lVHlwZSA9PT0gJ0RJQUxPR0ZMT1cnKSB7XG4gICAgICBhaVZlbmRvciA9ICdkaWFsb2dmbG93JztcbiAgICB9IGVsc2UgaWYgKGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLm5scEVuZ2luZVR5cGUgPT09ICdXQVRTT04nKSB7XG4gICAgICBhaVZlbmRvciA9ICd3YXRzb24nO1xuICAgIH1cblxuICAgIGlmIChhaVZlbmRvciA9PT0gJ2RpYWxvZ2Zsb3cnKSB7XG5cbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSBib3RSZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5yZXN1bHQuZnVsZmlsbG1lbnQubWVzc2FnZXMubWFwKChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2Uuc3BlZWNoO1xuICAgICAgfSk7XG5cbiAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzID0gdGV4dFJlc3BvbmVzLm1hcCgodGV4dDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgVGV4dE1vZGVsKHRleHQpO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKGFpVmVuZG9yID09PSAnd2F0c29uJykge1xuICAgICAgbGV0IHRleHRSZXNwb25lcyA9IGJvdFJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLnZlbmRvclJlc3BvbnNlLm91dHB1dC50ZXh0O1xuXG4gICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcyA9IHRleHRSZXNwb25lcy5tYXAoKHRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRNb2RlbCh0ZXh0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFJlc3BvbnNlcztcblxuICB9O1xuXG4gIHRyYW5zbGF0ZShyZXNwb25zZTogYW55KTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgaW50ZXJhY3Q6IHRoaXMuZ2V0SW50ZXJhY3RSZXNwb25zZShyZXNwb25zZSksXG4gICAgICBubHA6IHRoaXMuZ2V0TmxwUmVzcG9uc2UocmVzcG9uc2UpXG4gICAgfVxuICB9XG5cblxufVxuIl19