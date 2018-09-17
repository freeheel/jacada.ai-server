"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const SDKModels_1 = require("./SDKModels");
const base_service_1 = require("../core/base.service");
const auth_service_1 = require("../core/auth.service");
const error_service_1 = require("../core/error.service");
/**
 * Api services for the `AutomationCommand` model.
 */
let AutomationCommandApi = class AutomationCommandApi extends base_service_1.BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        super(http, models, auth, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AutomationCommand`.
     */
    getModelName() {
        return "AutomationCommand";
    }
};
AutomationCommandApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], AutomationCommandApi);
exports.AutomationCommandApi = AutomationCommandApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0b21hdGlvbkNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBdXRvbWF0aW9uQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3Q0FBNkQ7QUFDN0QsK0NBQWdFO0FBQ2hFLDJDQUF3QztBQUN4Qyx1REFBdUQ7QUFFdkQsdURBQW9EO0FBRXBELHlEQUFxRDtBQU1yRDs7R0FFRztBQUVILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsOEJBQWU7SUFFdkQsWUFDZ0MsSUFBZ0IsRUFDakIsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUxYLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUd4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksWUFBWTtRQUNqQixPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFBO0FBbEJZLG9CQUFvQjtJQURoQyxpQkFBVSxFQUFFO0lBSVIsV0FBQSxhQUFNLENBQUMsaUJBQVUsQ0FBQyxDQUFBO0lBQ2xCLFdBQUEsYUFBTSxDQUFDLHFCQUFTLENBQUMsQ0FBQTtJQUNqQixXQUFBLGFBQU0sQ0FBQywyQkFBWSxDQUFDLENBQUE7SUFDcEIsV0FBQSxlQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsYUFBTSxDQUFDLDRCQUFZLENBQUMsQ0FBQTtHQU54QixvQkFBb0IsQ0FrQmhDO0FBbEJZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL1NES01vZGVscyc7XG5pbXBvcnQgeyBCYXNlTG9vcEJhY2tBcGkgfSBmcm9tICcuLi9jb3JlL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0NvbmZpZyB9IGZyb20gJy4uLy4uL2xiLmNvbmZpZyc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuLi9jb3JlL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0ZpbHRlciwgIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi4vY29yZS9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEF1dG9tYXRpb25Db21tYW5kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0F1dG9tYXRpb25Db21tYW5kJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBBdXRvbWF0aW9uQ29tbWFuZGAgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvbWF0aW9uQ29tbWFuZEFwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIG1vZGVscywgYXV0aCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEF1dG9tYXRpb25Db21tYW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQXV0b21hdGlvbkNvbW1hbmRcIjtcbiAgfVxufVxuIl19