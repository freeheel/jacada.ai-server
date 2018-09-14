import BaseModel from "./BaseModel";

export class Choice {
  label: string;
  parameterId: string;

  constructor(choice: any) {
    this.label = choice.choiceOption.buttonLabel;
    this.parameterId = choice.choiceOption.id;
  }

}

export default class ChoiceModel extends BaseModel {


    questionLabel: string;
    triggerNavigation: boolean = false;
    matrixLayout: boolean = false;
    choices : Choice[] = [];


  /**
   *
   * @Note: important
   *
   * We need to have the pageNavigation since sometimes we would continue a flow, but other times we would like to
   * give some options to the user which should be treeted as text input.
   *
   * So if triggerNavigation === true, we have to continue the flow, if not we will treat it as a text message!
   *
   * @param section
   * @param pageNavigation
   */
  constructor(section: any, pageNavigation: any) {
        super(ChoiceModel.name, section);
        this.questionLabel = section.sectionLabel;
        this.triggerNavigation = false;

        if (section.sectionChoices[0].clickToContinue) {
            this.triggerNavigation = true;
        } else if (section.sectionChoices[0].clickToContinueMatrixLayout) {
            this.triggerNavigation = true;
            this.matrixLayout = true;
        } else if (pageNavigation.navigationRight && pageNavigation.navigationRight.buttonAction === 'CONTINUE_FLOW') {
            this.triggerNavigation = true;
        }

        section.sectionChoices.map((item: any) => {
          this.choices.push(new Choice(item));
        });

    }

}
