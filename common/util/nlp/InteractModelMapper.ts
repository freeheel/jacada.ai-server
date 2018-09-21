import TextModel from "./model/TextModel";
import ChoiceModel from "./model/ChoiceModel";
import AttachmentModel from "./model/AttachmentModel";
import TextInputModel from "./model/TextInputModel";
export default class InteractModelMapper {

  constructor() {
  }

  private getInteractResponse(response: any): any[] {

    let transformedResponses: any[] = [];

    const interactResponse = response.interactResponse;

    if (!interactResponse.elementResponse) {

      return transformedResponses;

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

          //If there is text to send with an attachment, we need to send in a template
          transformedResponses.push(new TextModel(section.sectionHeader.innerHtml));
          let innerHTML :string = section.sectionHeader.innerHtml;
          let type:string;
          if(innerHTML.includes('<img')) {
            type = 'image';
            let imgUrl = section.sectionHeader.innerHtml.split('<img')[1];
            imgUrl = imgUrl.split("\"")[1];
            console.log(section);
            transformedResponses.push( new AttachmentModel(section, '', type, imgUrl));

          }else if(innerHTML.includes('<iframe') && innerHTML.includes('src')){
            type = 'video';
            let videoUrl = section.sectionHeader.innerHtml.split('src');
            videoUrl = videoUrl[1].split('"');
            videoUrl = videoUrl[1];
            console.log(section);
            transformedResponses.push(new AttachmentModel(section, '', type, videoUrl));

        }



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
    if (!response.nlpEngineResponse) {
      aiVendor = 'NaN';
    } else if (response.nlpEngineResponse.nlpEngineType === 'DIALOGFLOW') {
      aiVendor = 'dialogflow';
    } else if (response.nlpEngineResponse.nlpEngineType === 'WATSON') {
      aiVendor = 'watson';
    }

    if (aiVendor === 'dialogflow') {

      let textRespones = response.nlpEngineResponse.vendorResponse.result.fulfillment.messages.map((message: any) => {
        return message.speech;
      });

      transformedResponses = textRespones.map((text: any) => {
        return new TextModel(text);
      });

    } else if (aiVendor === 'watson') {
      let textRespones = response.nlpEngineResponse.vendorResponse.output.text;

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
