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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQXR0YWNobWVudE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0dBRUc7QUFDSCw0REFBb0M7QUFHcEMsTUFBcUIsZUFBZ0IsU0FBUSxtQkFBUztJQVVsRCxZQUFZLE9BQVksRUFBRSxjQUFtQixFQUFFLFlBQW1CLEVBQUUsR0FBVTtRQUMxRSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0NBRUo7QUFuQkQsa0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDbGFzcyB0byB0cmFuc2Zvcm0gdGhlIHJlc3BvbnNlIGZyb20gaW50ZXJhY3QgdG8gVUkgbW9kZWwuXG4gKi9cbmltcG9ydCBCYXNlTW9kZWwgZnJvbSBcIi4vQmFzZU1vZGVsXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0YWNobWVudE1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIGF0dGFjaGVkVHlwZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdHJpZ2dlck5hdmlnYXRpb246IGJvb2xlYW47XG4gICAgcGFnZU5hdmlnYXRpb246IGFueTtcblxuXG5cbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uOiBhbnksIHBhZ2VOYXZpZ2F0aW9uOiBhbnksIGF0dGFjaGVkVHlwZTpzdHJpbmcsIHVybDpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoQXR0YWNobWVudE1vZGVsLm5hbWUsIHNlY3Rpb24pO1xuICAgICAgICB0aGlzLmxhYmVsID0gc2VjdGlvbi5zZWN0aW9uTGFiZWw7XG4gICAgICAgIHRoaXMudHJpZ2dlck5hdmlnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2VOYXZpZ2F0aW9uID0gcGFnZU5hdmlnYXRpb247XG4gICAgICAgIHRoaXMuYXR0YWNoZWRUeXBlID0gYXR0YWNoZWRUeXBlO1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICB9XG5cbn1cbiJdfQ==