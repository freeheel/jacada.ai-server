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
const lb_config_1 = require("../../lb.config");
const auth_service_1 = require("../core/auth.service");
const error_service_1 = require("../core/error.service");
/**
 * Api services for the `FacebookWebHook` model.
 */
let FacebookWebHookApi = class FacebookWebHookApi extends base_service_1.BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        super(http, models, auth, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {string} hub.mode
     *
     * @param {string} hub.challenge
     *
     * @param {string} hub.verify_token
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `FacebookWebHook` object.)
     * </em>
     */
    verify(hub, mode = {}, hub, challenge = {}, hub, verify_token = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/FacebookWebHooks/webhook";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof hub.mode !== 'undefined' && hub.mode !== null)
            _urlParams.hub.mode = hub.mode;
        if (typeof hub.challenge !== 'undefined' && hub.challenge !== null)
            _urlParams.hub.challenge = hub.challenge;
        if (typeof hub.verify_token !== 'undefined' && hub.verify_token !== null)
            _urlParams.hub.verify_token = hub.verify_token;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `FacebookWebHook` object.)
     * </em>
     */
    receiveMessage(data = {}, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/FacebookWebHooks/webhook";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `FacebookWebHook`.
     */
    getModelName() {
        return "FacebookWebHook";
    }
};
FacebookWebHookApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], FacebookWebHookApi);
exports.FacebookWebHookApi = FacebookWebHookApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZWJvb2tXZWJIb29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmFjZWJvb2tXZWJIb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdDQUE2RDtBQUM3RCwrQ0FBZ0U7QUFDaEUsMkNBQXdDO0FBQ3hDLHVEQUF1RDtBQUN2RCwrQ0FBaUQ7QUFDakQsdURBQW9EO0FBRXBELHlEQUFxRDtBQU1yRDs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsOEJBQWU7SUFFckQsWUFDZ0MsSUFBZ0IsRUFDakIsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUxYLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSSxNQUFNLENBQUMsR0FBRyxFQUFDLE9BQVksRUFBRSxFQUFFLEdBQUcsRUFBQyxZQUFpQixFQUFFLEVBQUUsR0FBRyxFQUFDLGVBQW9CLEVBQUUsRUFBRSxhQUF3QjtRQUM3RyxJQUFJLE9BQU8sR0FBVyxLQUFLLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQVcsMEJBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsMEJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYsMkJBQTJCLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDekYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxTQUFTLEtBQUssV0FBVyxJQUFJLEdBQUcsQ0FBQyxTQUFTLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDN0csSUFBSSxPQUFPLEdBQUcsQ0FBQyxZQUFZLEtBQUssV0FBVyxJQUFJLEdBQUcsQ0FBQyxZQUFZLEtBQUssSUFBSTtZQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDekgsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuRyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0ksY0FBYyxDQUFDLE9BQVksRUFBRSxFQUFFLGFBQXdCO1FBQzVELElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQztRQUM3QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRiwyQkFBMkIsQ0FBQztRQUM1QixJQUFJLFlBQVksR0FBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQVE7WUFDbkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBQ0YsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkcsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFlBQVk7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0NBQ0YsQ0FBQTtBQW5GWSxrQkFBa0I7SUFEOUIsaUJBQVUsRUFBRTtJQUlSLFdBQUEsYUFBTSxDQUFDLGlCQUFVLENBQUMsQ0FBQTtJQUNsQixXQUFBLGFBQU0sQ0FBQyxxQkFBUyxDQUFDLENBQUE7SUFDakIsV0FBQSxhQUFNLENBQUMsMkJBQVksQ0FBQyxDQUFBO0lBQ3BCLFdBQUEsZUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQyw0QkFBWSxDQUFDLENBQUE7R0FOeEIsa0JBQWtCLENBbUY5QjtBQW5GWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGYWNlYm9va1dlYkhvb2sgfSBmcm9tICcuLi8uLi9tb2RlbHMvRmFjZWJvb2tXZWJIb29rJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBGYWNlYm9va1dlYkhvb2tgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tXZWJIb29rQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIDxlbT5cbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxuICAgICAgICAgKiA8L2VtPlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaHViLm1vZGUgXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBodWIuY2hhbGxlbmdlIFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaHViLnZlcmlmeV90b2tlbiBcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBGYWNlYm9va1dlYkhvb2tgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdmVyaWZ5KGh1Yi5tb2RlOiBhbnkgPSB7fSwgaHViLmNoYWxsZW5nZTogYW55ID0ge30sIGh1Yi52ZXJpZnlfdG9rZW46IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvRmFjZWJvb2tXZWJIb29rcy93ZWJob29rXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgaHViLm1vZGUgIT09ICd1bmRlZmluZWQnICYmIGh1Yi5tb2RlICE9PSBudWxsKSBfdXJsUGFyYW1zLmh1Yi5tb2RlID0gaHViLm1vZGU7XG4gICAgaWYgKHR5cGVvZiBodWIuY2hhbGxlbmdlICE9PSAndW5kZWZpbmVkJyAmJiBodWIuY2hhbGxlbmdlICE9PSBudWxsKSBfdXJsUGFyYW1zLmh1Yi5jaGFsbGVuZ2UgPSBodWIuY2hhbGxlbmdlO1xuICAgIGlmICh0eXBlb2YgaHViLnZlcmlmeV90b2tlbiAhPT0gJ3VuZGVmaW5lZCcgJiYgaHViLnZlcmlmeV90b2tlbiAhPT0gbnVsbCkgX3VybFBhcmFtcy5odWIudmVyaWZ5X3Rva2VuID0gaHViLnZlcmlmeV90b2tlbjtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIDxlbT5cbiAgICAgICAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uKVxuICAgICAgICAgKiA8L2VtPlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgRmFjZWJvb2tXZWJIb29rYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHJlY2VpdmVNZXNzYWdlKGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0ZhY2Vib29rV2ViSG9va3Mvd2ViaG9va1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRmFjZWJvb2tXZWJIb29rYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRmFjZWJvb2tXZWJIb29rXCI7XG4gIH1cbn1cbiJdfQ==