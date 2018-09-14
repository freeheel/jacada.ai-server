/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";

export default class TextInputModel extends BaseModel {

    questionLabel:any;
    parameterId: string;
    parameterType: string;

    constructor(section: any) {
        super(TextInputModel.name, section);

        this.questionLabel = section.sectionLabel;
        this.parameterId = section.sectionChoices[0].id;
        this.parameterType = section.sectionChoices[0].textInput.textInputFormat;

    }

}
