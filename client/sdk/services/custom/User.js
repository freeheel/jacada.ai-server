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
const operators_1 = require("rxjs/operators");
/**
 * Api services for the `User` model.
 */
let UserApi = class UserApi extends base_service_1.BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        super(http, models, auth, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find a related item by id for accessTokens.
     *
     * @param {any} id User id
     *
     * @param {any} fk Foreign key for accessTokens
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    findByIdAccessTokens(id, fk, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Delete a related item by id for accessTokens.
     *
     * @param {any} id User id
     *
     * @param {any} fk Foreign key for accessTokens
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdAccessTokens(id, fk, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Update a related item by id for accessTokens.
     *
     * @param {any} id User id
     *
     * @param {any} fk Foreign key for accessTokens
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    updateByIdAccessTokens(id, fk, data = {}, customHeaders) {
        let _method = "PUT";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens/:fk";
        let _routeParams = {
            id: id,
            fk: fk
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Queries accessTokens of User.
     *
     * @param {any} id User id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    getAccessTokens(id, filter = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in accessTokens of this model.
     *
     * @param {any} id User id
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
     * This usually means the response is a `User` object.)
     * </em>
     */
    createAccessTokens(id, data = {}, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Deletes all accessTokens of this model.
     *
     * @param {any} id User id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteAccessTokens(id, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts accessTokens of User.
     *
     * @param {any} id User id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    countAccessTokens(id, where = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens/count";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Login a user with username/email and password.
     *
     * @param {string} include Related objects to include in the response. See the description of return value for more details.
     *   Default value: `user`.
     *
     *  - `rememberMe` - `boolean` - Whether the authentication credentials
     *     should be remembered in localStorage across app/browser restarts.
     *     Default: `true`.
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * The response body contains properties of the AccessToken created on login.
     * Depending on the value of `include` parameter, the body may contain additional properties:
     *
     *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
     *
     *
     */
    login(credentials, include = 'user', rememberMe = true, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/login";
        let _routeParams = {};
        let _postBody = {
            credentials: credentials
        };
        let _urlParams = {};
        if (typeof include !== 'undefined' && include !== null)
            _urlParams.include = include;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders)
            .pipe(operators_1.map((response) => {
            response.ttl = parseInt(response.ttl);
            response.rememberMe = rememberMe;
            this.auth.setToken(response);
            return response;
        }));
        return result;
    }
    /**
     * Logout a user with access token.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    logout(customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/logout";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        _urlParams.access_token = this.auth.getAccessTokenId();
        this.auth.clear();
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Confirm a user registration with email verification token.
     *
     * @param {string} uid
     *
     * @param {string} token
     *
     * @param {string} redirect
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    confirm(uid, token, redirect = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/confirm";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof uid !== 'undefined' && uid !== null)
            _urlParams.uid = uid;
        if (typeof token !== 'undefined' && token !== null)
            _urlParams.token = token;
        if (typeof redirect !== 'undefined' && redirect !== null)
            _urlParams.redirect = redirect;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Reset password for a user with email.
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    resetPassword(options, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/reset";
        let _routeParams = {};
        let _postBody = {
            options: options
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in accessTokens of this model.
     *
     * @param {any} id User id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    createManyAccessTokens(id, data = [], customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/Users/:id/accessTokens";
        let _routeParams = {
            id: id
        };
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * @ngdoc method
     * @name sdk.User#getCurrent
     * @methodOf sdk.User
     *
     * @description
     *
     * Get data of the currently logged user. Fail with HTTP result 401
     * when there is no user logged in.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     */
    getCurrent(filter = {}) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() + "/Users" + "/:id";
        let id = this.auth.getCurrentUserId();
        if (id == null)
            id = '__anonymous__';
        let _routeParams = { id: id };
        let _urlParams = {};
        let _postBody = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request(_method, _url, _routeParams, _urlParams, _postBody);
    }
    /**
     * Get data of the currently logged user that was returned by the last
     * call to {@link sdk.User#login} or
     * {@link sdk.User#getCurrent}. Return null when there
     * is no user logged in or the data of the current user were not fetched
     * yet.
     *
     * @returns object An Account instance.
     */
    getCachedCurrent() {
        return this.auth.getCurrentUserData();
    }
    /**
     * Get data of the currently logged access tokern that was returned by the last
     * call to {@link sdk.User#login}
     *
     * @returns object An AccessToken instance.
     */
    getCurrentToken() {
        return this.auth.getToken();
    }
    /**
     * @name sdk.User#isAuthenticated
     *
     * @returns {boolean} True if the current user is authenticated (logged in).
     */
    isAuthenticated() {
        return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
    }
    /**
     * @name sdk.User#getCurrentId
     *
     * @returns object Id of the currently logged-in user or null.
     */
    getCurrentId() {
        return this.auth.getCurrentUserId();
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    getModelName() {
        return "User";
    }
};
UserApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], UserApi);
exports.UserApi = UserApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0NBQTZEO0FBQzdELCtDQUFnRTtBQUNoRSwyQ0FBd0M7QUFDeEMsdURBQXVEO0FBQ3ZELCtDQUFpRDtBQUNqRCx1REFBb0Q7QUFFcEQseURBQXFEO0FBRXJELDhDQUFxQztBQUlyQzs7R0FFRztBQUVILElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQVEsU0FBUSw4QkFBZTtJQUUxQyxZQUNnQyxJQUFnQixFQUNqQixNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFFdEUsS0FBSyxDQUFDLElBQUksRUFBRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBTFgsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNOLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBR3hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSxvQkFBb0IsQ0FBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLGFBQXdCO1FBQ3BFLElBQUksT0FBTyxHQUFXLEtBQUssQ0FBQztRQUM1QixJQUFJLElBQUksR0FBVywwQkFBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRywwQkFBYyxDQUFDLGFBQWEsRUFBRTtZQUNsRiw2QkFBNkIsQ0FBQztRQUM5QixJQUFJLFlBQVksR0FBUTtZQUN0QixFQUFFLEVBQUUsRUFBRTtZQUNOLEVBQUUsRUFBRSxFQUFFO1NBQ1AsQ0FBQztRQUNGLElBQUksU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFV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USxFQUFFLENBQUEsRUFBRSxXQUFBLGFBQU0sQ0FBQyw0QkFBWSxDQUFDLENBQUE7R0FOeEIsT0FBTyxDQXVjbkI7QUF2Y1ksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsIFNES1Rva2VuLCBBY2Nlc3NUb2tlbiB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1VzZXInO1xuXG5cbi8qKlxuICogQXBpIHNlcnZpY2VzIGZvciB0aGUgYFVzZXJgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwQ2xpZW50KSBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KFNES01vZGVscykgcHJvdGVjdGVkIG1vZGVsczogU0RLTW9kZWxzLFxuICAgIEBJbmplY3QoTG9vcEJhY2tBdXRoKSBwcm90ZWN0ZWQgYXV0aDogTG9vcEJhY2tBdXRoLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgIG1vZGVscywgYXV0aCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBhY2Nlc3NUb2tlbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBmayBGb3JlaWduIGtleSBmb3IgYWNjZXNzVG9rZW5zXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgVXNlcmAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZEFjY2Vzc1Rva2VucyhpZDogYW55LCBmazogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vucy86ZmtcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHJlbGF0ZWQgaXRlbSBieSBpZCBmb3IgYWNjZXNzVG9rZW5zLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgVXNlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZmsgRm9yZWlnbiBrZXkgZm9yIGFjY2Vzc1Rva2Vuc1xuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveUJ5SWRBY2Nlc3NUb2tlbnMoaWQ6IGFueSwgZms6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL1VzZXJzLzppZC9hY2Nlc3NUb2tlbnMvOmZrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGFjY2Vzc1Rva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIFVzZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGZrIEZvcmVpZ24ga2V5IGZvciBhY2Nlc3NUb2tlbnNcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQnlJZEFjY2Vzc1Rva2VucyhpZDogYW55LCBmazogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL1VzZXJzLzppZC9hY2Nlc3NUb2tlbnMvOmZrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWVyaWVzIGFjY2Vzc1Rva2VucyBvZiBVc2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgVXNlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZmlsdGVyIFxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgVXNlcmAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBnZXRBY2Nlc3NUb2tlbnMoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vuc1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiBmaWx0ZXIgIT09IG51bGwpIF91cmxQYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBpbiBhY2Nlc3NUb2tlbnMgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIFVzZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQWNjZXNzVG9rZW5zKGlkOiBhbnksIGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL1VzZXJzLzppZC9hY2Nlc3NUb2tlbnNcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGFjY2Vzc1Rva2VucyBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgVXNlciBpZFxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQWNjZXNzVG9rZW5zKGlkOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9Vc2Vycy86aWQvYWNjZXNzVG9rZW5zXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgYWNjZXNzVG9rZW5zIG9mIFVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnRBY2Nlc3NUb2tlbnMoaWQ6IGFueSwgd2hlcmU6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vucy9jb3VudFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2Ygd2hlcmUgIT09ICd1bmRlZmluZWQnICYmIHdoZXJlICE9PSBudWxsKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dpbiBhIHVzZXIgd2l0aCB1c2VybmFtZS9lbWFpbCBhbmQgcGFzc3dvcmQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpbmNsdWRlIFJlbGF0ZWQgb2JqZWN0cyB0byBpbmNsdWRlIGluIHRoZSByZXNwb25zZS4gU2VlIHRoZSBkZXNjcmlwdGlvbiBvZiByZXR1cm4gdmFsdWUgZm9yIG1vcmUgZGV0YWlscy5cbiAgICogICBEZWZhdWx0IHZhbHVlOiBgdXNlcmAuXG4gICAqXG4gICAqICAtIGByZW1lbWJlck1lYCAtIGBib29sZWFuYCAtIFdoZXRoZXIgdGhlIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzXG4gICAqICAgICBzaG91bGQgYmUgcmVtZW1iZXJlZCBpbiBsb2NhbFN0b3JhZ2UgYWNyb3NzIGFwcC9icm93c2VyIHJlc3RhcnRzLlxuICAgKiAgICAgRGVmYXVsdDogYHRydWVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSByZXNwb25zZSBib2R5IGNvbnRhaW5zIHByb3BlcnRpZXMgb2YgdGhlIEFjY2Vzc1Rva2VuIGNyZWF0ZWQgb24gbG9naW4uXG4gICAqIERlcGVuZGluZyBvbiB0aGUgdmFsdWUgb2YgYGluY2x1ZGVgIHBhcmFtZXRlciwgdGhlIGJvZHkgbWF5IGNvbnRhaW4gYWRkaXRpb25hbCBwcm9wZXJ0aWVzOlxuICAgKiBcbiAgICogICAtIGB1c2VyYCAtIGBVKzAwN0JVc2VyVSswMDdEYCAtIERhdGEgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlci4gKGBpbmNsdWRlPXVzZXJgKVxuICAgKiBcbiAgICpcbiAgICovXG4gIHB1YmxpYyBsb2dpbihjcmVkZW50aWFsczogYW55LCBpbmNsdWRlOiBhbnkgPSAndXNlcicsIHJlbWVtYmVyTWU6IGJvb2xlYW4gPSB0cnVlLCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL1VzZXJzL2xvZ2luXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgY3JlZGVudGlhbHM6IGNyZWRlbnRpYWxzXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHR5cGVvZiBpbmNsdWRlICE9PSAndW5kZWZpbmVkJyAmJiBpbmNsdWRlICE9PSBudWxsKSBfdXJsUGFyYW1zLmluY2x1ZGUgPSBpbmNsdWRlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIHJlc3BvbnNlLnR0bCA9IHBhcnNlSW50KHJlc3BvbnNlLnR0bCk7XG4gICAgICAgICAgcmVzcG9uc2UucmVtZW1iZXJNZSA9IHJlbWVtYmVyTWU7XG4gICAgICAgICAgdGhpcy5hdXRoLnNldFRva2VuKHJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgXG4gIH1cblxuICAvKipcbiAgICogTG9nb3V0IGEgdXNlciB3aXRoIGFjY2VzcyB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhY2NlcHQgYW55IGRhdGEuIFN1cHBseSBhbiBlbXB0eSBvYmplY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBsb2dvdXQoY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9Vc2Vycy9sb2dvdXRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgICAgX3VybFBhcmFtcy5hY2Nlc3NfdG9rZW4gPSB0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpO1xuICAgIHRoaXMuYXV0aC5jbGVhcigpOyBcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpcm0gYSB1c2VyIHJlZ2lzdHJhdGlvbiB3aXRoIGVtYWlsIHZlcmlmaWNhdGlvbiB0b2tlbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVpZCBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuIFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVkaXJlY3QgXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBjb25maXJtKHVpZDogYW55LCB0b2tlbjogYW55LCByZWRpcmVjdDogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9Vc2Vycy9jb25maXJtXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgdWlkICE9PSAndW5kZWZpbmVkJyAmJiB1aWQgIT09IG51bGwpIF91cmxQYXJhbXMudWlkID0gdWlkO1xuICAgIGlmICh0eXBlb2YgdG9rZW4gIT09ICd1bmRlZmluZWQnICYmIHRva2VuICE9PSBudWxsKSBfdXJsUGFyYW1zLnRva2VuID0gdG9rZW47XG4gICAgaWYgKHR5cGVvZiByZWRpcmVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVkaXJlY3QgIT09IG51bGwpIF91cmxQYXJhbXMucmVkaXJlY3QgPSByZWRpcmVjdDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHBhc3N3b3JkIGZvciBhIHVzZXIgd2l0aCBlbWFpbC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgcmVzZXRQYXNzd29yZChvcHRpb25zOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvVXNlcnMvcmVzZXRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGluIGFjY2Vzc1Rva2VucyBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgVXNlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBVc2VyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZU1hbnlBY2Nlc3NUb2tlbnMoaWQ6IGFueSwgZGF0YTogYW55W10gPSBbXSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9Vc2Vycy86aWQvYWNjZXNzVG9rZW5zXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogQG5nZG9jIG1ldGhvZFxuICAgKiBAbmFtZSBzZGsuVXNlciNnZXRDdXJyZW50XG4gICAqIEBtZXRob2RPZiBzZGsuVXNlclxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICpcbiAgICogR2V0IGRhdGEgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgdXNlci4gRmFpbCB3aXRoIEhUVFAgcmVzdWx0IDQwMVxuICAgKiB3aGVuIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRDdXJyZW50KGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICsgXCIvVXNlcnNcIiArIFwiLzppZFwiO1xuICAgIGxldCBpZDogYW55ID0gdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VySWQoKTtcbiAgICBpZiAoaWQgPT0gbnVsbClcbiAgICBpZCA9ICdfX2Fub255bW91c19fJztcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7IGlkOiBpZCB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyKSBfdXJsUGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5KTtcbiAgfVxuICAvKipcbiAgICogR2V0IGRhdGEgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgdXNlciB0aGF0IHdhcyByZXR1cm5lZCBieSB0aGUgbGFzdFxuICAgKiBjYWxsIHRvIHtAbGluayBzZGsuVXNlciNsb2dpbn0gb3JcbiAgICoge0BsaW5rIHNkay5Vc2VyI2dldEN1cnJlbnR9LiBSZXR1cm4gbnVsbCB3aGVuIHRoZXJlXG4gICAqIGlzIG5vIHVzZXIgbG9nZ2VkIGluIG9yIHRoZSBkYXRhIG9mIHRoZSBjdXJyZW50IHVzZXIgd2VyZSBub3QgZmV0Y2hlZFxuICAgKiB5ZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBBY2NvdW50IGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGdldENhY2hlZEN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aC5nZXRDdXJyZW50VXNlckRhdGEoKTtcbiAgfVxuICAvKipcbiAgICogR2V0IGRhdGEgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgYWNjZXNzIHRva2VybiB0aGF0IHdhcyByZXR1cm5lZCBieSB0aGUgbGFzdFxuICAgKiBjYWxsIHRvIHtAbGluayBzZGsuVXNlciNsb2dpbn1cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIEFjY2Vzc1Rva2VuIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGdldEN1cnJlbnRUb2tlbigpOiBBY2Nlc3NUb2tlbiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aC5nZXRUb2tlbigpO1xuICB9XG4gIC8qKlxuICAgKiBAbmFtZSBzZGsuVXNlciNpc0F1dGhlbnRpY2F0ZWRcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGN1cnJlbnQgdXNlciBpcyBhdXRoZW50aWNhdGVkIChsb2dnZWQgaW4pLlxuICAgKi9cbiAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICByZXR1cm4gISh0aGlzLmdldEN1cnJlbnRJZCgpID09PSAnJyB8fCB0aGlzLmdldEN1cnJlbnRJZCgpID09IG51bGwgfHwgdGhpcy5nZXRDdXJyZW50SWQoKSA9PSAnbnVsbCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lIHNkay5Vc2VyI2dldEN1cnJlbnRJZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgSWQgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQtaW4gdXNlciBvciBudWxsLlxuICAgKi9cbiAgcHVibGljIGdldEN1cnJlbnRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoLmdldEN1cnJlbnRVc2VySWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFVzZXJgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJVc2VyXCI7XG4gIH1cbn1cbiJdfQ==