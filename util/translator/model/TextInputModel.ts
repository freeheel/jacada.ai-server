/**
 * Class to transform the response from interact to UI model.
 */
import BaseModel from "./BaseModel";

export default class TextInputModel extends BaseModel {

    constructor(section: any) {
        super(TextInputModel.name, section)
    }

}