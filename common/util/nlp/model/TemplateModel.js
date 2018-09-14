"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = __importDefault(require("./BaseModel"));
class AttachmentModel extends BaseModel_1.default {
    constructor(section, pageNavigation, attachedType, url) {
        super(AttachmentModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
        this.attachedType = attachedType;
        this.url = url;
    }
}
exports.default = AttachmentModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVtcGxhdGVNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRlbXBsYXRlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7R0FFRztBQUNILDREQUFvQztBQUdwQyxNQUFxQixlQUFnQixTQUFRLG1CQUFTO0lBVXBELFlBQVksT0FBWSxFQUFFLGNBQW1CLEVBQUUsWUFBbUIsRUFBRSxHQUFVO1FBQzVFLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7Q0FFRjtBQW5CRCxrQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENsYXNzIHRvIHRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgZnJvbSBpbnRlcmFjdCB0byBVSSBtb2RlbC5cbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRhY2htZW50TW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gIGF0dGFjaGVkVHlwZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdHJpZ2dlck5hdmlnYXRpb246IGJvb2xlYW47XG4gIHBhZ2VOYXZpZ2F0aW9uOiBhbnk7XG5cblxuXG4gIGNvbnN0cnVjdG9yKHNlY3Rpb246IGFueSwgcGFnZU5hdmlnYXRpb246IGFueSwgYXR0YWNoZWRUeXBlOnN0cmluZywgdXJsOnN0cmluZykge1xuICAgIHN1cGVyKEF0dGFjaG1lbnRNb2RlbC5uYW1lLCBzZWN0aW9uKTtcbiAgICB0aGlzLmxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XG4gICAgdGhpcy50cmlnZ2VyTmF2aWdhdGlvbiA9IHRydWU7XG4gICAgdGhpcy5wYWdlTmF2aWdhdGlvbiA9IHBhZ2VOYXZpZ2F0aW9uO1xuICAgIHRoaXMuYXR0YWNoZWRUeXBlID0gYXR0YWNoZWRUeXBlO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG5cbn1cbiJdfQ==