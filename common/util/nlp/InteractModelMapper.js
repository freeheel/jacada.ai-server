"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextModel_1 = require("./model/TextModel");
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
                    /*
                    if(section.sectionChoices[0].textInput) {
                        transformedResponses.push(new TextInputModel(section));
                    }

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
//# sourceMappingURL=InteractModelMapper.js.map