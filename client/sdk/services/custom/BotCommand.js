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
 * Api services for the `BotCommand` model.
 */
let BotCommandApi = class BotCommandApi extends base_service_1.BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        super(http, models, auth, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `BotCommand`.
     */
    getModelName() {
        return "BotCommand";
    }
};
BotCommandApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], BotCommandApi);
exports.BotCommandApi = BotCommandApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90Q29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvdENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0NBQTZEO0FBQzdELCtDQUFnRTtBQUNoRSwyQ0FBd0M7QUFDeEMsdURBQXVEO0FBRXZELHVEQUFvRDtBQUVwRCx5REFBcUQ7QUFNckQ7O0dBRUc7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsOEJBQWU7SUFFaEQsWUFDZ0MsSUFBZ0IsRUFDakIsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUxYLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUd4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksWUFBWTtRQUNqQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0YsQ0FBQTtBQWxCWSxhQUFhO0lBRHpCLGlCQUFVLEVBQUU7SUFJUixXQUFBLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLENBQUE7SUFDbEIsV0FBQSxhQUFNLENBQUMscUJBQVMsQ0FBQyxDQUFBO0lBQ2pCLFdBQUEsYUFBTSxDQUFDLDJCQUFZLENBQUMsQ0FBQTtJQUNwQixXQUFBLGVBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxhQUFNLENBQUMsNEJBQVksQ0FBQyxDQUFBO0dBTnhCLGFBQWEsQ0FrQnpCO0FBbEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4vU0RLTW9kZWxzJztcbmltcG9ydCB7IEJhc2VMb29wQmFja0FwaSB9IGZyb20gJy4uL2NvcmUvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4uL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCAgfSBmcm9tICcuLi8uLi9tb2RlbHMvQmFzZU1vZGVscyc7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9jb3JlL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm90Q29tbWFuZCB9IGZyb20gJy4uLy4uL21vZGVscy9Cb3RDb21tYW5kJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBCb3RDb21tYW5kYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJvdENvbW1hbmRBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cENsaWVudCkgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChTREtNb2RlbHMpIHByb3RlY3RlZCBtb2RlbHM6IFNES01vZGVscyxcbiAgICBASW5qZWN0KExvb3BCYWNrQXV0aCkgcHJvdGVjdGVkIGF1dGg6IExvb3BCYWNrQXV0aCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsICBtb2RlbHMsIGF1dGgsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBCb3RDb21tYW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQm90Q29tbWFuZFwiO1xuICB9XG59XG4iXX0=