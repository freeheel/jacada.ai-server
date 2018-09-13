export default class BaseModel{
    type: string;
    section: any;

    constructor(type: string, section?: any) {
        this.type = type;
        this.section = section;
    }
}