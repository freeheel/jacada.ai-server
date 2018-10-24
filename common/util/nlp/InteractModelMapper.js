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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3RNb2RlbE1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludGVyYWN0TW9kZWxNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsc0VBQThDO0FBQzlDLDhFQUFzRDtBQUN0RCw0RUFBb0Q7QUFDcEQsTUFBcUIsbUJBQW1CO0lBRXRDO0lBQ0EsQ0FBQztJQUVPLG1CQUFtQixDQUFDLFFBQWE7UUFFdkMsSUFBSSxvQkFBb0IsR0FBVSxFQUFFLENBQUM7UUFFckMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFFbkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtZQUVyQyxPQUFPLG9CQUFvQixDQUFDO1NBRTdCO1FBQ0QsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1FBRW5GLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUU1QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEtBQUssMEJBQTBCLEVBQUU7Z0JBQ3RELG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUMzRztpQkFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pFLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUV2Qyw0REFBNEQ7b0JBRTVELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7d0JBQ3ZDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFjLENBQUMsT0FB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ZWwvVGV4dE1vZGVsXCI7XG5pbXBvcnQgQ2hvaWNlTW9kZWwgZnJvbSBcIi4vbW9kZWwvQ2hvaWNlTW9kZWxcIjtcbmltcG9ydCBBdHRhY2htZW50TW9kZWwgZnJvbSBcIi4vbW9kZWwvQXR0YWNobWVudE1vZGVsXCI7XG5pbXBvcnQgVGV4dElucHV0TW9kZWwgZnJvbSBcIi4vbW9kZWwvVGV4dElucHV0TW9kZWxcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0TW9kZWxNYXBwZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcmFjdFJlc3BvbnNlKHJlc3BvbnNlOiBhbnkpOiBhbnlbXSB7XG5cbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBjb25zdCBpbnRlcmFjdFJlc3BvbnNlID0gcmVzcG9uc2UuaW50ZXJhY3RSZXNwb25zZTtcblxuICAgIGlmICghaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UpIHtcblxuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkUmVzcG9uc2VzO1xuXG4gICAgfVxuICAgIGNvbnN0IHNlY3Rpb25zID0gaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlQ29udGVudC5jb250ZW50U2VjdGlvbnM7XG5cbiAgICBzZWN0aW9ucy5tYXAoKHNlY3Rpb246IGFueSkgPT4ge1xuXG4gICAgICBpZiAoc2VjdGlvbi5lbGVtZW50VHlwZSA9PT0gJ1FVRVNUSU9OX0NIT0lDRVNfRUxFTUVOVCcpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgQ2hvaWNlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgfSBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkNob2ljZXNbMF0uaWQpIHtcbiAgICAgICAgaWYgKHNlY3Rpb24uc2VjdGlvbkNob2ljZXMubGVuZ3RoID09PSAxKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIFJ5YW4gLSBhZGQgc3VwcG9ydCBmb3IgaW5wdXQgYW5kIG90aGVyIHJpY2ggb3V0cHV0cy5cblxuICAgICAgICAgIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dElucHV0TW9kZWwoc2VjdGlvbikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qXG5cbiAgICAgICAgICBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzWzBdLnVwbG9hZEltYWdlTGlzdCkge1xuXG4gICAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IEltYWdlTW9kZWwoc2VjdGlvbiwgaW50ZXJhY3RSZXNwb25zZS5lbGVtZW50UmVzcG9uc2UucGFnZS5wYWdlTmF2aWdhdGlvbikpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IENob2ljZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgKi9cbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBlbHNlIGlmIChzZWN0aW9uLnNlY3Rpb25DaG9pY2VzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUmVzcG9uc2VzLnB1c2gobmV3IENob2ljZU1vZGVsKHNlY3Rpb24sIGludGVyYWN0UmVzcG9uc2UuZWxlbWVudFJlc3BvbnNlLnBhZ2UucGFnZU5hdmlnYXRpb24pKTtcbiAgICAgICAgfSovXG4gICAgICB9IGVsc2UgaWYgKCFzZWN0aW9uLnNlY3Rpb25DaG9pY2VzICYmIHNlY3Rpb24uc2VjdGlvbkhlYWRlcikge1xuICAgICAgICAvLyBUT0RPIFJ5YW4gLSB0cmFuc2Zvcm0gaXQgdG8gd2hhdCBtYWtlcyBzZW5zZSBmb3IgRmFjZWJvb2tcbiAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMucHVzaChuZXcgVGV4dE1vZGVsKHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWwpKTtcbiAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi5zZWN0aW9uQ2hvaWNlcyAmJiBzZWN0aW9uLnNlY3Rpb25IZWFkZXIpIHtcblxuICAgICAgICAgIC8vSWYgdGhlcmUgaXMgdGV4dCB0byBzZW5kIHdpdGggYW4gYXR0YWNobWVudCwgd2UgbmVlZCB0byBzZW5kIGluIGEgdGVtcGxhdGVcbiAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBUZXh0TW9kZWwoc2VjdGlvbi5zZWN0aW9uSGVhZGVyLmlubmVySHRtbCkpO1xuICAgICAgICAgIGxldCBpbm5lckhUTUwgOnN0cmluZyA9IHNlY3Rpb24uc2VjdGlvbkhlYWRlci5pbm5lckh0bWw7XG4gICAgICAgICAgbGV0IHR5cGU6c3RyaW5nO1xuICAgICAgICAgIGlmKGlubmVySFRNTC5pbmNsdWRlcygnPGltZycpKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2ltYWdlJztcbiAgICAgICAgICAgIGxldCBpbWdVcmwgPSBzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sLnNwbGl0KCc8aW1nJylbMV07XG4gICAgICAgICAgICBpbWdVcmwgPSBpbWdVcmwuc3BsaXQoXCJcXFwiXCIpWzFdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKCBuZXcgQXR0YWNobWVudE1vZGVsKHNlY3Rpb24sICcnLCB0eXBlLCBpbWdVcmwpKTtcblxuICAgICAgICAgIH1lbHNlIGlmKGlubmVySFRNTC5pbmNsdWRlcygnPGlmcmFtZScpICYmIGlubmVySFRNTC5pbmNsdWRlcygnc3JjJykpe1xuICAgICAgICAgICAgdHlwZSA9ICd2aWRlbyc7XG4gICAgICAgICAgICBsZXQgdmlkZW9VcmwgPSBzZWN0aW9uLnNlY3Rpb25IZWFkZXIuaW5uZXJIdG1sLnNwbGl0KCdzcmMnKTtcbiAgICAgICAgICAgIHZpZGVvVXJsID0gdmlkZW9VcmxbMV0uc3BsaXQoJ1wiJyk7XG4gICAgICAgICAgICB2aWRlb1VybCA9IHZpZGVvVXJsWzFdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbik7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcy5wdXNoKG5ldyBBdHRhY2htZW50TW9kZWwoc2VjdGlvbiwgJycsIHR5cGUsIHZpZGVvVXJsKSk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TmxwUmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IGFueVtdIHtcbiAgICBsZXQgdHJhbnNmb3JtZWRSZXNwb25zZXM6IGFueVtdID0gW107XG5cbiAgICBsZXQgYm90UmVzcG9uc2UgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZTtcblxuICAgIGlmICghYm90UmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFJlc3BvbnNlcztcbiAgICB9XG5cbiAgICBsZXQgYWlWZW5kb3IgPSAnTmFOJztcblxuICAgIC8vIGNoZWNrIHdoaWNoIHZlbmRvclxuICAgIGlmICghcmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UpIHtcbiAgICAgIGFpVmVuZG9yID0gJ05hTic7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS5ubHBFbmdpbmVUeXBlID09PSAnRElBTE9HRkxPVycpIHtcbiAgICAgIGFpVmVuZG9yID0gJ2RpYWxvZ2Zsb3cnO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UubmxwRW5naW5lUmVzcG9uc2UubmxwRW5naW5lVHlwZSA9PT0gJ1dBVFNPTicpIHtcbiAgICAgIGFpVmVuZG9yID0gJ3dhdHNvbic7XG4gICAgfVxuXG4gICAgaWYgKGFpVmVuZG9yID09PSAnZGlhbG9nZmxvdycpIHtcblxuICAgICAgbGV0IHRleHRSZXNwb25lcyA9IHJlc3BvbnNlLm5scEVuZ2luZVJlc3BvbnNlLnZlbmRvclJlc3BvbnNlLnF1ZXJ5UmVzdWx0LmZ1bGZpbGxtZW50TWVzc2FnZXMubWFwKChtZXNzYWdlOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IHRleHQgPSAnJztcblxuICAgICAgICBtZXNzYWdlLnRleHQudGV4dC5tYXAoKHRleHRNZXNzYWdlKSA9PiB7XG4gICAgICAgICB0ZXh0ICs9IHRleHRNZXNzYWdlICsgJyAnO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgIH0pO1xuXG4gICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlcyA9IHRleHRSZXNwb25lcy5tYXAoKHRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRNb2RlbCh0ZXh0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChhaVZlbmRvciA9PT0gJ3dhdHNvbicpIHtcbiAgICAgIGxldCB0ZXh0UmVzcG9uZXMgPSByZXNwb25zZS5ubHBFbmdpbmVSZXNwb25zZS52ZW5kb3JSZXNwb25zZS5vdXRwdXQudGV4dDtcblxuICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZXMgPSB0ZXh0UmVzcG9uZXMubWFwKCh0ZXh0OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBUZXh0TW9kZWwodGV4dCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRSZXNwb25zZXM7XG5cbiAgfTtcblxuICB0cmFuc2xhdGUocmVzcG9uc2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVyYWN0OiB0aGlzLmdldEludGVyYWN0UmVzcG9uc2UocmVzcG9uc2UpLFxuICAgICAgbmxwOiB0aGlzLmdldE5scFJlc3BvbnNlKHJlc3BvbnNlKVxuICAgIH1cbiAgfVxuXG5cbn1cbiJdfQ==