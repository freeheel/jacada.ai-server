"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class to transform the response from interact to UI model.
 */
const BaseModel_1 = __importDefault(require("./BaseModel"));
class ImageModel extends BaseModel_1.default {
    constructor(section, pageNavigation) {
        super(ImageModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
    }
}
exports.default = ImageModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VNb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkltYWdlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7R0FFRztBQUNILDREQUFvQztBQUdwQyxNQUFxQixVQUFXLFNBQVEsbUJBQVM7SUFNN0MsWUFBWSxPQUFZLEVBQUUsY0FBbUI7UUFDekMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztDQUVKO0FBYkQsNkJBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENsYXNzIHRvIHRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgZnJvbSBpbnRlcmFjdCB0byBVSSBtb2RlbC5cbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZU1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHJpZ2dlck5hdmlnYXRpb246IGJvb2xlYW47XG4gICAgcGFnZU5hdmlnYXRpb246IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb246IGFueSwgcGFnZU5hdmlnYXRpb246IGFueSkge1xuICAgICAgICBzdXBlcihJbWFnZU1vZGVsLm5hbWUsIHNlY3Rpb24pO1xuICAgICAgICB0aGlzLmxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XG4gICAgICAgIHRoaXMudHJpZ2dlck5hdmlnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2VOYXZpZ2F0aW9uID0gcGFnZU5hdmlnYXRpb247XG4gICAgfVxuXG59Il19