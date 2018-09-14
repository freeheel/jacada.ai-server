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
    constructor(section, pageNavigation, type, url) {
        super(AttachmentModel.name, section);
        this.label = section.sectionLabel;
        this.triggerNavigation = true;
        this.pageNavigation = pageNavigation;
        this.type = type;
        this.url = url;
    }
}
exports.default = AttachmentModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXR0YWNobWVudE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0dBRUc7QUFDSCw0REFBb0M7QUFHcEMsTUFBcUIsZUFBZ0IsU0FBUSxtQkFBUztJQVVsRCxZQUFZLE9BQVksRUFBRSxjQUFtQixFQUFFLElBQVcsRUFBRSxHQUFVO1FBQ2xFLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7Q0FFSjtBQW5CRCxrQ0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENsYXNzIHRvIHRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgZnJvbSBpbnRlcmFjdCB0byBVSSBtb2RlbC5cbiAqL1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tIFwiLi9CYXNlTW9kZWxcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRhY2htZW50TW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHJpZ2dlck5hdmlnYXRpb246IGJvb2xlYW47XG4gICAgcGFnZU5hdmlnYXRpb246IGFueTtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBhbnksIHBhZ2VOYXZpZ2F0aW9uOiBhbnksIHR5cGU6c3RyaW5nLCB1cmw6c3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKEF0dGFjaG1lbnRNb2RlbC5uYW1lLCBzZWN0aW9uKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IHNlY3Rpb24uc2VjdGlvbkxhYmVsO1xuICAgICAgICB0aGlzLnRyaWdnZXJOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlTmF2aWdhdGlvbiA9IHBhZ2VOYXZpZ2F0aW9uO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG5cbn1cbiJdfQ==