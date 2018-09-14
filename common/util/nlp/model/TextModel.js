"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class TextModel extends BaseModel_1.default {
    constructor(text = '') {
        super(TextModel.name);
        this.text = text;
    }
}
exports.default = TextModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGV4dE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLE1BQXFCLFNBQVUsU0FBUSxtQkFBUztJQUk1QyxZQUFZLE9BQWUsRUFBRTtRQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FFSjtBQVRELDRCQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVse1xuXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nID0gJycpIHtcbiAgICAgICAgc3VwZXIoVGV4dE1vZGVsLm5hbWUpO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIH1cblxufSJdfQ==