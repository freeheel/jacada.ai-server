/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { ErrorHandler } from '../core/error.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Maintainance } from '../../models/Maintainance';


/**
 * Api services for the `Maintainance` model.
 */
@Injectable()
export class MaintainanceApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  models, auth, errorHandler);
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} apiPassword 
   *
   * @param {string} newLevel 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Maintainance` object.)
   * </em>
   */
  public changeLoggingLevel(apiPassword: any = {}, newLevel: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Maintainances/changeLoggingLevel";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof apiPassword !== 'undefined' && apiPassword !== null) _urlParams.apiPassword = apiPassword;
    if (typeof newLevel !== 'undefined' && newLevel !== null) _urlParams.newLevel = newLevel;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} apiPassword 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Maintainance` object.)
   * </em>
   */
  public getLoggers(apiPassword: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Maintainances/getLoggers";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof apiPassword !== 'undefined' && apiPassword !== null) _urlParams.apiPassword = apiPassword;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} apiPassword 
   *
   * @param {string} loggerName 
   *
   * @param {string} newlevel 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Maintainance` object.)
   * </em>
   */
  public setLoglevel(apiPassword: any = {}, loggerName: any = {}, newlevel: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Maintainances/setLoglevel";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof apiPassword !== 'undefined' && apiPassword !== null) _urlParams.apiPassword = apiPassword;
    if (typeof loggerName !== 'undefined' && loggerName !== null) _urlParams.loggerName = loggerName;
    if (typeof newlevel !== 'undefined' && newlevel !== null) _urlParams.newlevel = newlevel;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Maintainance`.
   */
  public getModelName() {
    return "Maintainance";
  }
}
