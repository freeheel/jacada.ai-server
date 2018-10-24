"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextModel_1 = __importDefault(require("./model/TextModel"));
const ChoiceModel_1 = __importDefault(require("./model/ChoiceModel"));
const AttachmentModel_1 = __importDefault(require("./model/AttachmentModel"));
const TextInputModel_1 = __importDefault(require("./model/TextInputModel"));
class InteractModelMapper {
    constructor() {
    }
    getInteractResponse(response) {
        let transformedResponses = [];
        const interactResponse = response.interactResponse;
        if (!interactResponse.elementResponse) {
            return transformedResponses;
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
                //If there is text to send with an attachment, we need to send in a template
                transformedResponses.push(new TextModel_1.default(section.sectionHeader.innerHtml));
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
        if (!response.nlpEngineResponse) {
            aiVendor = 'NaN';
        }
        else if (response.nlpEngineResponse.nlpEngineType === 'DIALOGFLOW') {
            aiVendor = 'dialogflow';
        }
        else if (response.nlpEngineResponse.nlpEngineType === 'WATSON') {
            aiVendor = 'watson';
        }
        if (aiVendor === 'dialogflow') {
            let textRespones = response.nlpEngineResponse.vendorResponse.queryResult.fulfillmentMessages.map((message) => {
                let text = '';
                message.text.text.map((textMessage) => {
                    text += textMessage + ' ';
                });
                return text;
            });
            transformedResponses = textRespones.map((text) => {
                return new TextModel_1.default(text);
            });
        }
        else if (aiVendor === 'watson') {
            let textRespones = response.nlpEngineResponse.vendorResponse.output.text;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsc0VBQThDO0FBQzlDLDhFQUFzRDtBQUN0RCw0RUFBb0Q7QUFDcEQsTUFBcUIsbUJBQW1CO0lBRXRDO0lBQ0EsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFFBQWE7UUFFdkMsSUFBSSxvQkFBb0IsR0FBVSxFQUFFLENBQUM7UUFFckMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFFbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtZQUVyQyxPQUFPLG9CQUFvQixDQUFDO1NBRTdCO1FBQ0QsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBRW5GLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUU1QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEtBQUssMEJBQTBCLEVBQUU7Z0JBQ3RELG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUMzRztpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pFLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUV2Qyw0REFBNEQ7b0JBRTVELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7d0JBQ3ZDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFjLENBQUMsT0FB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ZGVsL1RleHRNb2RlbFwiO1xuaW1wb3J0IENob2ljZU1vZGVsIGZyb20gXCIuL21vZGVsL0Nob2ljZU1vZGVsXCI7XG5pbXBvcnQgQXR0YWNobWVudE1vZGVsIGZyb20gXCIuL21vZGVsL0F0dGFjaG1lbnRNb2RlbFwiO1xuaW1wb3J0IFRleHRJbnB1dE1vZGVsIGZyb20gXCIuL21vZGVsL1RleHRJbnB1dE1vZGVsXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmFjdE1vZGVsTWFwcGVyIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJhY3RSZXNwb25zZShyZXNwb25zZTogYW55KTogYW55W10ge1xuXG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3QgaW50ZXJhY3RSZXNwb25zZSA9IHJlc3BvbnNlLmludGVyYWN0UmVzcG9uc2U7XG5cbiAgICBpZiAoIWludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlKSB7XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFJlc3BvbnNlcztcblxuICAgIH1cbiAgICBjb25zdCBzZWN0aW9ucyA9IGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZUNvbnRlbnQuY29udGVudFNlY3Rpb25zO1xuXG4gICAgc2VjdGlvbnMubWFwKChzZWN0aW9uOiBhbnkpID0+IHtcblxuICAgICAgaWYgKHNlY3Rpb24uZWxlbWVudFR5cGUgPT09ICdRVUVTVElPTl9DSE9JQ0VTX0VMRU1FTlQnKSB7XG4gICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IENob2ljZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLmlkKSB7XG4gICAgICAgIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgICAgLy8gVE9ETyBSeWFuIC0gYWRkIHN1cHBvcnQgZm9yIGlucHV0IGFuZCBvdGhlciByaWNoIG91dHB1dHMuXG5cbiAgICAgICAgICBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS50ZXh0SW5wdXQpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRJbnB1dE1vZGVsKHNlY3Rpb24pKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxuXG4gICAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlc1swXS51cGxvYWRJbWFnZUxpc3QpIHtcblxuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBJbWFnZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBDaG9pY2VNb2RlbChzZWN0aW9uLCBpbnRlcmFjdFJlc3BvbnNlLmVsZW1lbnRSZXNwb25zZS5wYWdlLnBhZ2VOYXZpZ2F0aW9uKSk7XG4gICAgICAgIH0qL1xuICAgICAgfSBlbHNlIGlmICghc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25IZWFkZXIpIHtcbiAgICAgICAgLy8gVE9ETyBSeWFuIC0gdHJhbnNmb3JtIGl0IHRvIHdoYXQgbWFrZXMgc2Vuc2UgZm9yIEZhY2Vib29rXG4gICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IFRleHRNb2RlbChzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sKSk7XG4gICAgICB9IGVsc2UgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMgJiYgc2VjdGlvbi5zZWN0aW9uSGVhZGVyKSB7XG5cbiAgICAgICAgICAvL0lmIHRoZXJlIGlzIHRleHQgdG8gc2VuZCB3aXRoIGFuIGF0dGFjaG1lbnQsIHdlIG5lZWQgdG8gc2VuZCBpbiBhIHRlbXBsYXRlXG4gICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dE1vZGVsKHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWwpKTtcbiAgICAgICAgICBsZXQgaW5uZXJIVE1MIDpzdHJpbmcgPSBzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sO1xuICAgICAgICAgIGxldCB0eXBlOnN0cmluZztcbiAgICAgICAgICBpZihpbm5lckhUTUwuaW5jbHVkZXMoJzxpbWcnKSkge1xuICAgICAgICAgICAgdHlwZSA9ICdpbWFnZSc7XG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbC5zcGxpdCgnPGltZycpWzFdO1xuICAgICAgICAgICAgaW1nVXJsID0gaW1nVXJsLnNwbGl0KFwiXFxcIlwiKVsxXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaCggbmV3IEF0dGFjaG1lbnRNb2RlbChzZWN0aW9uLCAnJywgdHlwZSwgaW1nVXJsKSk7XG5cbiAgICAgICAgICB9ZWxzZSBpZihpbm5lckhUTUwuaW5jbHVkZXMoJzxpZnJhbWUnKSAmJiBpbm5lckhUTUwuaW5jbHVkZXMoJ3NyYycpKXtcbiAgICAgICAgICAgIHR5cGUgPSAndmlkZW8nO1xuICAgICAgICAgICAgbGV0IHZpZGVvVXJsID0gc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbC5zcGxpdCgnc3JjJyk7XG4gICAgICAgICAgICB2aWRlb1VybCA9IHZpZGVvVXJsWzFdLnNwbGl0KCdcIicpO1xuICAgICAgICAgICAgdmlkZW9VcmwgPSB2aWRlb1VybFsxXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQXR0YWNobWVudE1vZGVsKHNlY3Rpb24sICcnLCB0eXBlLCB2aWRlb1VybCkpO1xuXG4gICAgICAgIH1cblxuXG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gIH1cblxuICBwcml2YXRlIGdldE5scFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG4gICAgbGV0IHRyYW5zZm9ybWVkUmVzcG9uc2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGV0IGJvdFJlc3BvbnNlID0gcmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2U7XG5cbiAgICBpZiAoIWJvdFJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG4gICAgfVxuXG4gICAgbGV0IGFpVmVuZG9yID0gJ05hTic7XG5cbiAgICAvLyBjaGVjayB3aGljaCB2ZW5kb3JcbiAgICBpZiAoIXJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlKSB7XG4gICAgICBhaVZlbmRvciA9ICdOYU4nO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UubmxwRW5naW5lVHlwZSA9PT0gJ0RJQUxPR0ZMT1cnKSB7XG4gICAgICBhaVZlbmRvciA9ICdkaWFsb2dmbG93JztcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLm5scEVuZ2luZVR5cGUgPT09ICdXQVRTT04nKSB7XG4gICAgICBhaVZlbmRvciA9ICd3YXRzb24nO1xuICAgIH1cblxuICAgIGlmIChhaVZlbmRvciA9PT0gJ2RpYWxvZ2Zsb3cnKSB7XG5cbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5xdWVyeVJlc3VsdC5mdWxmaWxsbWVudE1lc3NhZ2VzLm1hcCgobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGxldCB0ZXh0ID0gJyc7XG5cbiAgICAgICAgbWVzc2FnZS50ZXh0LnRleHQubWFwKCh0ZXh0TWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgICB0ZXh0ICs9IHRleHRNZXNzYWdlICsgJyAnO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0pO1xuXG4gICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcyA9IHRleHRSZXNwb25lcy5tYXAoKHRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRNb2RlbCh0ZXh0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChhaVZlbmRvciA9PT0gJ3dhdHNvbicpIHtcbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5vdXRwdXQudGV4dDtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfTtcblxuICB0cmFuc2xhdGUocmVzcG9uc2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVyYWN0OiB0aGlzLmdldEludGVyYWN0UmVzcG9uc2UocmVzcG9uc2UpLFxuICAgICAgbmxwOiB0aGlzLmdldE5scFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG5cbn1cbiJdfQ==