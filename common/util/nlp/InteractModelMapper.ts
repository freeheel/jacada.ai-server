import TextModel from "./model/TextModel";
import TextInputModel from "./model/TextInputModel";
import ChoiceModel from "./model/ChoiceModel";

export default class InteractModelMapper {

  constructor() {
  }

  private getInteractResponse(response: any): any[] {

    let transformedResponses: any[] = [];

    const interactResponse = response.interactResponse;

    if (!interactResponse.elementResponse) {
      // This is an input. which we don´t support yet.
      throw new Error('Input is not supported yet');
    }
    const sections = interactResponse.elementResponse.page.pageContent.contentSections;

    sections.map((section: any) => {

      if (section.elementType === 'QUESTION_CHOICES_ELEMENT') {
        transformedResponses.push(new ChoiceModel(section, interactResponse.elementResponse.page.pageNavigation));
      } else if (section.sectionChoices && section.sectionChoices[0].id) {
        if (section.sectionChoices.length === 1) {

          // TODO Ryan - add support for input and other rich outputs.


          if (section.sectionChoices[0].textInput) {
            transformedResponses.push(new TextInputModel(section));
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
      } else if (!section.sectionChoices && section.sectionHeader) {
        // TODO Ryan - transform it to what makes sense for Facebook
        transformedResponses.push(new TextModel(section.sectionHeader.innerHtml));
      } else if (section.sectionChoices && section.sectionHeader) {
        // TODO Ryan - transform it to what makes sense for Facebook
        transformedResponses.push(new TextModel(section.sectionHeader.innerHtml));
      }

    });

    return transformedResponses;

  }

  private getNlpResponse(response: any): any[] {
    let transformedResponses: any[] = [];

    let botResponse = response.nlpEngineResponse;

    if (!botResponse) {
      return transformedResponses;
    }

    let aiVendor = 'NaN';

    // check which vendor
    if (!botResponse.nlpEngineResponse) {
      aiVendor = 'NaN';
    } else if (botResponse.nlpEngineResponse.nlpEngineType === 'DIALOGFLOW') {
      aiVendor = 'dialogflow';
    } else if (botResponse.nlpEngineResponse.nlpEngineType === 'WATSON') {
      aiVendor = 'watson';
    }

    if (aiVendor === 'dialogflow') {

      let textRespones = botResponse.nlpEngineResponse.vendorResponse.result.fulfillment.messages.map((message: any) => {
        return message.speech;
      });

      transformedResponses = textRespones.map((text: any) => {
        return new TextModel(text);
      });

    } else if (aiVendor === 'watson') {
      let textRespones = botResponse.nlpEngineResponse.vendorResponse.output.text;

      transformedResponses = textRespones.map((text: any) => {
        return new TextModel(text);
      });
    }

    return transformedResponses;

  };

  translate(response: any): any {
    return {
      interact: this.getInteractResponse(response),
      nlp: this.getNlpResponse(response)
    }
  }


}
