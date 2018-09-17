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
const error_service_1 = require("./error.service");
const auth_service_1 = require("./auth.service");
const lb_config_1 = require("../../lb.config");
const SDKModels_1 = require("../custom/SDKModels");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class CustomQueryEncoderHelper {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}
/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
let BaseLoopBackApi = class BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    request(method, url, routeParams = {}, urlParams = {}, postBody = {}, pubsub = false, customHeaders) {
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            console.info('SDK: PubSub functionality is disabled, generate SDK using -io enabled');
        }
        else {
            let httpParams = new http_1.HttpParams({ encoder: new CustomQueryEncoderHelper() });
            // Headers to be sent
            let headers = new http_1.HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            // Authenticate request
            headers = this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            let body;
            let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            let queryString = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (lb_config_1.LoopBackConfig.isHeadersFilteringSet()) {
                    headers = headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    queryString = `?filter=${encodeURIComponent(JSON.stringify(urlParams.filter))}`;
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            if (urlParams.where) {
                if (lb_config_1.LoopBackConfig.isHeadersWhereSet()) {
                    /**
                    CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
                    - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
                    **/
                    headers = headers.append('where', JSON.stringify(urlParams.where));
                }
                else {
                    queryString = `?where=${encodeURIComponent(JSON.stringify(urlParams.where))}`;
                }
                delete urlParams.where;
            }
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            /* enhancement/configure-where-headers
                  this.searchParams.setJSON(urlParams);
                  let request: Request = new Request(
                    new RequestOptions({
                      headers        : headers,
                      method         : method,
                      url            : `${url}${queryString}`,
                      search         : Object.keys(urlParams).length > 0 ? this.searchParams.getURLSearchParams() : null,
                      body           : body ? JSON.stringify(body) : undefined,
                      withCredentials: LoopBackConfig.getRequestOptionsCredentials()
                    })
                  );
            TODO Fix Merge Conflict */
            Object.keys(urlParams).forEach(paramKey => {
                let paramValue = urlParams[paramKey];
                paramValue = typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
                httpParams = httpParams.append(paramKey, paramValue);
            });
            let request = new http_1.HttpRequest(method, `${url}${queryString}`, body, {
                headers: headers,
                params: httpParams,
                withCredentials: lb_config_1.LoopBackConfig.getRequestOptionsCredentials()
            });
            return this.http.request(request).pipe(operators_1.filter(event => event instanceof http_1.HttpResponse), operators_1.map((res) => res.body), operators_1.catchError((e) => this.errorHandler.handleError(e)));
        }
    }
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    authenticate(url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers = headers.append('Authorization', lb_config_1.LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId());
        }
        return headers;
    }
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    create(data, customHeaders) {
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    createMany(data, customHeaders) {
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    findById(id, filter = {}, customHeaders) {
        let _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, _urlParams, undefined, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    find(filter = {}, customHeaders) {
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(operators_1.map((datum) => datum.map((data) => this.model.factory(data))));
    }
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    exists(id, customHeaders) {
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id }, undefined, undefined, null, customHeaders);
    }
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    findOne(filter = {}, customHeaders) {
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter }, undefined, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    updateAll(where = {}, data, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders);
    }
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    deleteById(id, customHeaders) {
        return this.request('DELETE', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, undefined, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    count(where = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    }
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    updateAttributes(id, data, customHeaders) {
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    upsert(data = {}, customHeaders) {
        return this.request('PUT', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    upsertPatch(data = {}, customHeaders) {
        return this.request('PATCH', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    upsertWithWhere(where = {}, data = {}, customHeaders) {
        let _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    replaceOrCreate(data = {}, customHeaders) {
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    replaceById(id, data = {}, customHeaders) {
        return this.request('POST', [
            lb_config_1.LoopBackConfig.getPath(),
            lb_config_1.LoopBackConfig.getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id }, undefined, { data }, null, customHeaders)
            .pipe(operators_1.map((data) => this.model.factory(data)));
    }
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    createChangeStream() {
        let subject = new rxjs_1.Subject();
        if (typeof EventSource !== 'undefined') {
            let emit = (msg) => subject.next(JSON.parse(msg.data));
            var source = new EventSource([
                lb_config_1.LoopBackConfig.getPath(),
                lb_config_1.LoopBackConfig.getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }
};
BaseLoopBackApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], BaseLoopBackApi);
exports.BaseLoopBackApi = BaseLoopBackApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdDQUE2RDtBQUM3RCwrQ0FBMEg7QUFFMUgsbURBQStDO0FBQy9DLGlEQUE4QztBQUM5QywrQ0FBaUQ7QUFFakQsbURBQWdEO0FBQ2hELCtCQUEyQztBQUMzQyw4Q0FBeUQ7QUFHekQsTUFBTSx3QkFBd0I7SUFDNUIsU0FBUyxDQUFDLENBQVM7UUFDZixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUztRQUNqQixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxTQUFTLENBQUMsQ0FBUztRQUNmLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFTO1FBQ2pCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBQ0Q7Ozs7Ozs7Ozs7R0FVRztBQUVILElBQXNCLGVBQWUsR0FBckMsTUFBc0IsZUFBZTtJQUtuQyxZQUNnQyxJQUFnQixFQUNqQixNQUFpQixFQUNkLElBQWtCLEVBQ04sWUFBMEI7UUFIeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBYztRQUNOLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRXRFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNEOzs7Ozs7Ozs7OztRQVdJO0lBQ0csT0FBTyxDQUNaLE1BQXVCLEVBQ3ZCLEdBQXVCLEVBQ3ZCLGNBQXVC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bEIsV0FBQSxhQUFNLENBQUMscUJBQVMsQ0FBQyxDQUFBO0lBQ2pCLFdBQUEsYUFBTSxDQUFDLDJCQUFZLENBQUMsQ0FBQTtJQUNwQixXQUFBLGVBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxhQUFNLENBQUMsNEJBQVksQ0FBQyxDQUFBO0dBVGYsZUFBZSxDQThhcEM7QUE5YXFCLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVxdWVzdCwgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlLCBIdHRwUGFyYW1ldGVyQ29kZWMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQXV0aCB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BCYWNrQ29uZmlnIH0gZnJvbSAnLi4vLi4vbGIuY29uZmlnJztcbmltcG9ydCB7IExvb3BCYWNrRmlsdGVyLCBBY2Nlc3NUb2tlbiB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IFNES01vZGVscyB9IGZyb20gJy4uL2N1c3RvbS9TREtNb2RlbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4vLyBNYWtpbmcgU3VyZSBFdmVudFNvdXJjZSBUeXBlIGlzIGF2YWlsYWJsZSB0byBhdm9pZCBjb21waWxhdGlvbiBpc3N1ZXMuXG5kZWNsYXJlIHZhciBFdmVudFNvdXJjZTogYW55O1xuY2xhc3MgQ3VzdG9tUXVlcnlFbmNvZGVySGVscGVyIGltcGxlbWVudHMgSHR0cFBhcmFtZXRlckNvZGVjIHtcbiAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspO1xuICB9XG5cbiAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodik7XG4gIH1cblxuICBkZWNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoayk7XG4gIH1cblxuICBkZWNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgfVxufVxuLyoqXG4qIEBtb2R1bGUgQmFzZUxvb3BCYWNrQXBpXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPEBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6am9uYXRoYW4tY2FzYXJydWJpYXM+XG4qIEBhdXRob3IgTmlrb2xheSBNYXRpdXNoZW5rb3YgPGh0dHBzOi8vZ2l0aHViLmNvbS9tbnZ4PlxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIEFic3RyYWN0IGNsYXNzIHRoYXQgd2lsbCBiZSBpbXBsZW1lbnRlZCBpbiBldmVyeSBjdXN0b20gc2VydmljZSBhdXRvbWF0aWNhbGx5IGJ1aWx0XG4qIGJ5IHRoZSBzZGsgYnVpbGRlci5cbiogSXQgcHJvdmlkZXMgdGhlIGNvcmUgZnVuY3Rpb25hbGxpdHkgZm9yIGV2ZXJ5IEFQSSBjYWxsLCBlaXRoZXIgYnkgSFRUUCBDYWxscyBvciBieVxuKiBXZWJTb2NrZXRzLlxuKiovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBwcm90ZWN0ZWQgcGF0aDogc3RyaW5nO1xuICBwcm90ZWN0ZWQgbW9kZWw6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHRoaXMuZ2V0TW9kZWxOYW1lKCkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlcXVlc3RcbiAgICogQHBhcmFtIHtzdHJpbmd9ICBtZXRob2QgICAgICBSZXF1ZXN0IG1ldGhvZCAoR0VULCBQT1NULCBQVVQpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgdXJsICAgICAgICAgUmVxdWVzdCB1cmwgKG15LWhvc3QvbXktdXJsLzppZClcbiAgICogQHBhcmFtIHthbnl9ICAgICByb3V0ZVBhcmFtcyBWYWx1ZXMgb2YgdXJsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHthbnl9ICAgICB1cmxQYXJhbXMgICBQYXJhbWV0ZXJzIGZvciBidWlsZGluZyB1cmwgKGZpbHRlciBhbmQgb3RoZXIpXG4gICAqIEBwYXJhbSB7YW55fSAgICAgcG9zdEJvZHkgICAgUmVxdWVzdCBwb3N0Qm9keVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIGlzIGEgY29yZSBtZXRob2QsIGV2ZXJ5IEhUVFAgQ2FsbCB3aWxsIGJlIGRvbmUgZnJvbSBoZXJlLCBldmVyeSBBUEkgU2VydmljZSB3aWxsXG4gICAqIGV4dGVuZCB0aGlzIGNsYXNzIGFuZCB1c2UgdGhpcyBtZXRob2QgdG8gZ2V0IFJFU1RmdWwgY29tbXVuaWNhdGlvbi5cbiAgICoqL1xuICBwdWJsaWMgcmVxdWVzdChcbiAgICBtZXRob2QgICAgICAgICA6IHN0cmluZyxcbiAgICB1cmwgICAgICAgICAgICA6IHN0cmluZyxcbiAgICByb3V0ZVBhcmFtcyAgICA6IGFueSA9IHt9LFxuICAgIHVybFBhcmFtcyAgICAgIDogYW55ID0ge30sXG4gICAgcG9zdEJvZHkgICAgICAgOiBhbnkgPSB7fSxcbiAgICBwdWJzdWIgICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBjdXN0b21IZWFkZXJzPyA6IEZ1bmN0aW9uXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgLy8gVHJhbnNwaWxlIHJvdXRlIHZhcmlhYmxlcyB0byB0aGUgYWN0dWFsIHJlcXVlc3QgVmFsdWVzXG4gICAgT2JqZWN0LmtleXMocm91dGVQYXJhbXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICB1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKFwiOlwiICsga2V5ICsgXCIoXFwvfCQpXCIsIFwiZ1wiKSwgcm91dGVQYXJhbXNba2V5XSArIFwiJDFcIilcbiAgICB9KTtcbiAgICBpZiAocHVic3ViKSB7XG4gICAgICBjb25zb2xlLmluZm8oJ1NESzogUHViU3ViIGZ1bmN0aW9uYWxpdHkgaXMgZGlzYWJsZWQsIGdlbmVyYXRlIFNESyB1c2luZyAtaW8gZW5hYmxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHsgZW5jb2RlcjogbmV3IEN1c3RvbVF1ZXJ5RW5jb2RlckhlbHBlcigpIH0pO1xuICAgICAgLy8gSGVhZGVycyB0byBiZSBzZW50XG4gICAgICBsZXQgaGVhZGVyczogSHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIC8vIEF1dGhlbnRpY2F0ZSByZXF1ZXN0XG4gICAgICBoZWFkZXJzID0gdGhpcy5hdXRoZW50aWNhdGUodXJsLCBoZWFkZXJzKTtcbiAgICAgIC8vIEJvZHkgZml4IGZvciBidWlsdCBpbiByZW1vdGUgbWV0aG9kcyB1c2luZyBcImRhdGFcIiwgXCJvcHRpb25zXCIgb3IgXCJjcmVkZW50aWFsc1xuICAgICAgLy8gdGhhdCBhcmUgdGhlIGFjdHVhbCBib2R5LCBDdXN0b20gcmVtb3RlIG1ldGhvZCBwcm9wZXJ0aWVzIGFyZSBkaWZmZXJlbnQgYW5kIG5lZWRcbiAgICAgIC8vIHRvIGJlIHdyYXBwZWQgaW50byBhIGJvZHkgb2JqZWN0XG4gICAgICBsZXQgYm9keTogYW55O1xuICAgICAgbGV0IHBvc3RCb2R5S2V5cyA9IHR5cGVvZiBwb3N0Qm9keSA9PT0gJ29iamVjdCcgPyBPYmplY3Qua2V5cyhwb3N0Qm9keSkgOiBbXVxuICAgICAgaWYgKHBvc3RCb2R5S2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYm9keSA9IHBvc3RCb2R5W3Bvc3RCb2R5S2V5cy5zaGlmdCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvZHkgPSBwb3N0Qm9keTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSAnJztcblxuICAgICAgLy8gU2VwYXJhdGUgZmlsdGVyIG9iamVjdCBmcm9tIHVybCBwYXJhbXMgYW5kIGFkZCB0byBzZWFyY2ggcXVlcnlcbiAgICAgIGlmICh1cmxQYXJhbXMuZmlsdGVyKSB7XG4gICAgICAgIGlmIChMb29wQmFja0NvbmZpZy5pc0hlYWRlcnNGaWx0ZXJpbmdTZXQoKSkge1xuICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZCgnZmlsdGVyJywgSlNPTi5zdHJpbmdpZnkodXJsUGFyYW1zLmZpbHRlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gYD9maWx0ZXI9JHtlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodXJsUGFyYW1zLmZpbHRlcikpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHVybFBhcmFtcy5maWx0ZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcGFyYXRlIHdoZXJlIG9iamVjdCBmcm9tIHVybCBwYXJhbXMgYW5kIGFkZCB0byBzZWFyY2ggcXVlcnlcbiAgICAgIGlmICh1cmxQYXJhbXMud2hlcmUpIHtcbiAgICAgICAgaWYgKExvb3BCYWNrQ29uZmlnLmlzSGVhZGVyc1doZXJlU2V0KCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICBDT0RFIEJFTE9XIFdJTEwgR0VORVJBVEUgVEhFIEZPTExPV0lORyBJU1NVRVM6XG4gICAgICAgICAgLSBodHRwczovL2dpdGh1Yi5jb20vbWVhbi1leHBlcnQtb2ZmaWNpYWwvbG9vcGJhY2stc2RrLWJ1aWxkZXIvaXNzdWVzLzM1NlxuICAgICAgICAgIC0gaHR0cHM6Ly9naXRodWIuY29tL21lYW4tZXhwZXJ0LW9mZmljaWFsL2xvb3BiYWNrLXNkay1idWlsZGVyL2lzc3Vlcy8zMjggXG4gICAgICAgICAgKiovXG4gICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuYXBwZW5kKCd3aGVyZScsIEpTT04uc3RyaW5naWZ5KHVybFBhcmFtcy53aGVyZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gYD93aGVyZT0ke2VuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh1cmxQYXJhbXMud2hlcmUpKX1gO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB1cmxQYXJhbXMud2hlcmU7XG4gICAgICB9XG4gICAgXG4gICAgICBpZiAodHlwZW9mIGN1c3RvbUhlYWRlcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGVhZGVycyA9IGN1c3RvbUhlYWRlcnMoaGVhZGVycyk7XG4gICAgICB9XG4vKiBlbmhhbmNlbWVudC9jb25maWd1cmUtd2hlcmUtaGVhZGVyc1xuICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuc2V0SlNPTih1cmxQYXJhbXMpO1xuICAgICAgbGV0IHJlcXVlc3Q6IFJlcXVlc3QgPSBuZXcgUmVxdWVzdChcbiAgICAgICAgbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgICAgICBoZWFkZXJzICAgICAgICA6IGhlYWRlcnMsXG4gICAgICAgICAgbWV0aG9kICAgICAgICAgOiBtZXRob2QsXG4gICAgICAgICAgdXJsICAgICAgICAgICAgOiBgJHt1cmx9JHtxdWVyeVN0cmluZ31gLFxuICAgICAgICAgIHNlYXJjaCAgICAgICAgIDogT2JqZWN0LmtleXModXJsUGFyYW1zKS5sZW5ndGggPiAwID8gdGhpcy5zZWFyY2hQYXJhbXMuZ2V0VVJMU2VhcmNoUGFyYW1zKCkgOiBudWxsLFxuICAgICAgICAgIGJvZHkgICAgICAgICAgIDogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogTG9vcEJhY2tDb25maWcuZ2V0UmVxdWVzdE9wdGlvbnNDcmVkZW50aWFscygpXG4gICAgICAgIH0pXG4gICAgICApO1xuVE9ETyBGaXggTWVyZ2UgQ29uZmxpY3QgKi9cbiAgICAgIE9iamVjdC5rZXlzKHVybFBhcmFtcykuZm9yRWFjaChwYXJhbUtleSA9PiB7XG4gICAgICAgIGxldCBwYXJhbVZhbHVlID0gdXJsUGFyYW1zW3BhcmFtS2V5XTtcbiAgICAgICAgcGFyYW1WYWx1ZSA9IHR5cGVvZiBwYXJhbVZhbHVlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHBhcmFtVmFsdWUpIDogcGFyYW1WYWx1ZTtcbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKHBhcmFtS2V5LCBwYXJhbVZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QobWV0aG9kLCBgJHt1cmx9JHtxdWVyeVN0cmluZ31gLCBib2R5LCB7XG4gICAgICAgIGhlYWRlcnMgICAgICAgIDogaGVhZGVycyxcbiAgICAgICAgcGFyYW1zICAgICAgICAgOiBodHRwUGFyYW1zLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IExvb3BCYWNrQ29uZmlnLmdldFJlcXVlc3RPcHRpb25zQ3JlZGVudGlhbHMoKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdCkucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSxcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiByZXMuYm9keSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGUpKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgYXV0aGVudGljYXRlXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBTZXJ2ZXIgVVJMXG4gICAqIEBwYXJhbSB7SGVhZGVyc30gaGVhZGVycyBIVFRQIEhlYWRlcnNcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdHJ5IHRvIGF1dGhlbnRpY2F0ZSB1c2luZyBlaXRoZXIgYW4gYWNjZXNzX3Rva2VuIG9yIGJhc2ljIGh0dHAgYXV0aFxuICAgKi9cbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUPih1cmw6IHN0cmluZywgaGVhZGVyczogSHR0cEhlYWRlcnMpOiBIdHRwSGVhZGVycyB7XG4gICAgaWYgKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbklkKCkpIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmFwcGVuZChcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nLFxuICAgICAgICBMb29wQmFja0NvbmZpZy5nZXRBdXRoUHJlZml4KCkgKyB0aGlzLmF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7VH0gZGF0YSBHZW5lcmljIGRhdGEgdHlwZVxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBjcmVhdGUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlPFQ+KGRhdGE6IFQsIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgY3JlYXRlTWFueVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7VFtdfSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlIGFycmF5XG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgY3JlYXRlIG1hbnkgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueTxUPihkYXRhOiBUW10sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBmaW5kQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEBwYXJhbSB7YW55fSBkYXRhIEdlbmVyaWMgZGF0YSB0eXBlXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGZpbmRCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkPFQ+KGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIpIF91cmxQYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0dFVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgX3VybFBhcmFtcywgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgZmluZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VFsrPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgZmluZCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBmaW5kPFQ+KGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGhcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXR1bTogVFtdKSA9PiBkYXR1bS5tYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBleGlzdHNcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGV4aXN0cyBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBleGlzdHM8VD4oaWQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZC9leGlzdHMnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGZpbmRPbmVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBmaW5kT25lIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGZpbmRPbmU8VD4oZmlsdGVyOiBMb29wQmFja0ZpbHRlciA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnZmluZE9uZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB7IGZpbHRlciB9LCB1bmRlZmluZWQsIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVBbGxcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHVwZGF0ZUFsbCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGw8VD4od2hlcmU6IGFueSA9IHt9LCBkYXRhOiBULCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPHsgY291bnQ6ICdudW1iZXInIH0+IHtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlKSBfdXJsUGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICd1cGRhdGUnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlbGV0ZUJ5SWRcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyBkZWxldGVCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQ8VD4oaWQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCdcbiAgICBdLmpvaW4oJy8nKSwgeyBpZCB9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvdW50XG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTx7IGNvdW50OiBudW1iZXIgfT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGNvdW50IG1ldGhvZFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTx7IGNvdW50OiBudW1iZXIgfT4ge1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAnY291bnQnXG4gICAgXS5qb2luKCcvJyksIHVuZGVmaW5lZCwgX3VybFBhcmFtcywgdW5kZWZpbmVkLCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVBdHRyaWJ1dGVzXG4gICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6IGpvaG5jYXNhcnJ1YmlhcywgZ2g6IG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuICAgKiBAbGljZW5zZSBNSVRcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEdlbmVyaWMgdXBkYXRlQXR0cmlidXRlcyBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzPFQ+KGlkOiBhbnksIGRhdGE6IFQsIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICc6aWQnXG4gICAgXS5qb2luKCcvJyksIHsgaWQgfSwgdW5kZWZpbmVkLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwc2VydFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHVwc2VydCBtZXRob2RcbiAgICovXG4gIHB1YmxpYyB1cHNlcnQ8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BVVCcsIFtcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSxcbiAgICAgIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSxcbiAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgZGF0YSB9LCBudWxsLCBjdXN0b21IZWFkZXJzKVxuICAgIC5waXBlKG1hcCgoZGF0YTogVCkgPT4gdGhpcy5tb2RlbC5mYWN0b3J5KGRhdGEpKSk7XG4gIH1cbiAgLyoqXG4gICAqIEBtZXRob2QgdXBzZXJ0UGF0Y2hcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyB1cHNlcnQgbWV0aG9kIHVzaW5nIHBhdGNoIGh0dHAgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0UGF0Y2g8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCB1cHNlcnRXaXRoV2hlcmVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogR2VuZXJpYyB1cHNlcnRXaXRoV2hlcmUgbWV0aG9kXG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0V2l0aFdoZXJlPFQ+KHdoZXJlOiBhbnkgPSB7fSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUpIF91cmxQYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJ3Vwc2VydFdpdGhXaGVyZSdcbiAgICBdLmpvaW4oJy8nKSwgdW5kZWZpbmVkLCBfdXJsUGFyYW1zLCB7IGRhdGEgfSwgbnVsbCwgY3VzdG9tSGVhZGVycylcbiAgICAucGlwZShtYXAoKGRhdGE6IFQpID0+IHRoaXMubW9kZWwuZmFjdG9yeShkYXRhKSkpO1xuICB9XG4gIC8qKlxuICAgKiBAbWV0aG9kIHJlcGxhY2VPckNyZWF0ZVxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHJlcGxhY2VPckNyZWF0ZSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyByZXBsYWNlT3JDcmVhdGU8VD4oZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCBbXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCksXG4gICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICB0aGlzLm1vZGVsLmdldE1vZGVsRGVmaW5pdGlvbigpLnBhdGgsXG4gICAgICAncmVwbGFjZU9yQ3JlYXRlJ1xuICAgIF0uam9pbignLycpLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCByZXBsYWNlQnlJZFxuICAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiAgICogQGxpY2Vuc2UgTUlUXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIHJlcGxhY2VCeUlkIG1ldGhvZFxuICAgKi9cbiAgcHVibGljIHJlcGxhY2VCeUlkPFQ+KGlkOiBhbnksIGRhdGE6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQT1NUJywgW1xuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpLFxuICAgICAgdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5wYXRoLFxuICAgICAgJzppZCcsICdyZXBsYWNlJ1xuICAgIF0uam9pbignLycpLCB7IGlkIH0sIHVuZGVmaW5lZCwgeyBkYXRhIH0sIG51bGwsIGN1c3RvbUhlYWRlcnMpXG4gICAgLnBpcGUobWFwKChkYXRhOiBUKSA9PiB0aGlzLm1vZGVsLmZhY3RvcnkoZGF0YSkpKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBjcmVhdGVDaGFuZ2VTdHJlYW1cbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBHZW5lcmljIGNyZWF0ZUNoYW5nZVN0cmVhbSBtZXRob2RcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgaWYgKHR5cGVvZiBFdmVudFNvdXJjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxldCBlbWl0ICAgPSAobXNnOiBhbnkpID0+IHN1YmplY3QubmV4dChKU09OLnBhcnNlKG1zZy5kYXRhKSk7XG4gICAgICB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKFtcbiAgICAgICAgTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpLFxuICAgICAgICBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCksXG4gICAgICAgIHRoaXMubW9kZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCkucGF0aCxcbiAgICAgICAgJ2NoYW5nZS1zdHJlYW0nXG4gICAgICBdLmpvaW4oJy8nKSk7XG4gICAgICBzb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZGF0YScsIGVtaXQpO1xuICAgICAgc291cmNlLm9uZXJyb3IgPSBlbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NESyBCdWlsZGVyOiBFdmVudFNvdXJjZSBpcyBub3Qgc3VwcG9ydGVkJyk7IFxuICAgIH1cbiAgICByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgfVxuICAvKipcbiAgICogQG1ldGhvZCBnZXRNb2RlbE5hbWVcbiAgICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4gICAqIEBsaWNlbnNlIE1JVFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBYnN0cmFjdCBnZXRNb2RlbE5hbWUgbWV0aG9kXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb2RlbE5hbWUoKTogc3RyaW5nO1xufVxuIl19