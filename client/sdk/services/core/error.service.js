"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
/**
 * Default error handler
 */
let ErrorHandler = class ErrorHandler {
    handleError(errorResponse) {
        return rxjs_1.throwError(errorResponse.error.error || 'Server error');
    }
};
ErrorHandler = __decorate([
    core_1.Injectable()
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0NBQTJDO0FBRTNDLCtCQUE4QztBQUM5Qzs7R0FFRztBQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFDaEIsV0FBVyxDQUFDLGFBQWdDO1FBQ2pELE9BQU8saUJBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBQ0YsQ0FBQTtBQUpZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTtHQUNBLFlBQVksQ0FJeEI7QUFKWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbi8qKlxuICogRGVmYXVsdCBlcnJvciBoYW5kbGVyXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvckhhbmRsZXIge1xuICBwdWJsaWMgaGFuZGxlRXJyb3IoZXJyb3JSZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXNwb25zZS5lcnJvci5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gIH1cbn1cbiJdfQ==