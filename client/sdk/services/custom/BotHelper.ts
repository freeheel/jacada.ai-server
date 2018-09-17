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
import { BotHelper } from '../../models/BotHelper';


/**
 * Api services for the `BotHelper` model.
 */
@Injectable()
export class BotHelperApi extends BaseLoopBackApi {

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
   * @param {string} spui 
   *
   * @param {string} conversationId 
   *
   * @param {string} reason 
   *
   * @param {string} reasonDetails 
   *
   * @param {string} script 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `BotHelper` object.)
   * </em>
   */
  public requestBotAssistant(spui: any = {}, conversationId: any = {}, reason: any = {}, reasonDetails: any = {}, script: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/BotHelpers/requestBotAssistant";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof spui !== 'undefined' && spui !== null) _urlParams.spui = spui;
    if (typeof conversationId !== 'undefined' && conversationId !== null) _urlParams.conversationId = conversationId;
    if (typeof reason !== 'undefined' && reason !== null) _urlParams.reason = reason;
    if (typeof reasonDetails !== 'undefined' && reasonDetails !== null) _urlParams.reasonDetails = reasonDetails;
    if (typeof script !== 'undefined' && script !== null) _urlParams.script = script;
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
   * This usually means the response is a `BotHelper` object.)
   * </em>
   */
  public sendBotCommand(botCommand: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/BotHelpers/sendBotCommand";
    let _routeParams: any = {};
    let _postBody: any = {
      botCommand: botCommand
    };
    let _urlParams: any = {};
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `BotHelper`.
   */
  public getModelName() {
    return "BotHelper";
  }
}
