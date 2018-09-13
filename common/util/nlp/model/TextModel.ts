import BaseModel from "./BaseModel";

export default class TextModel extends BaseModel{

    text: string;

    constructor(text: string = '') {
        super(TextModel.name);
        this.text = text;
    }

}