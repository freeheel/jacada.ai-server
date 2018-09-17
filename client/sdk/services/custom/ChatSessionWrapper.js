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
 * Api services for the `ChatSessionWrapper` model.
 */
let ChatSessionWrapperApi = class ChatSessionWrapperApi extends base_service_1.BaseLoopBackApi {
    constructor(http, models, auth, errorHandler) {
        super(http, models, auth, errorHandler);
        this.http = http;
        this.models = models;
        this.auth = auth;
        this.errorHandler = errorHandler;
    }
    /**
     * Find a related item by id for chatMassages.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatMassages
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    findByIdChatMassages(id, fk, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages/:fk";
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
     * Delete a related item by id for chatMassages.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatMassages
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdChatMassages(id, fk, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages/:fk";
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
     * Update a related item by id for chatMassages.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatMassages
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    updateByIdChatMassages(id, fk, data = {}, customHeaders) {
        let _method = "PUT";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages/:fk";
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
     * Find a related item by id for chatData.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatData
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    findByIdChatData(id, fk, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData/:fk";
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
     * Delete a related item by id for chatData.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatData
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    destroyByIdChatData(id, fk, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData/:fk";
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
     * Update a related item by id for chatData.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {any} fk Foreign key for chatData
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    updateByIdChatData(id, fk, data = {}, customHeaders) {
        let _method = "PUT";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData/:fk";
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
     * Queries chatMassages of ChatSessionWrapper.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    getChatMassages(id, filter = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages";
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
     * Creates a new instance in chatMassages of this model.
     *
     * @param {any} id ChatSessionWrapper id
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    createChatMassages(id, data = {}, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages";
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
     * Deletes all chatMassages of this model.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteChatMassages(id, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts chatMassages of ChatSessionWrapper.
     *
     * @param {any} id ChatSessionWrapper id
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
    countChatMassages(id, where = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages/count";
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
     * Queries chatData of ChatSessionWrapper.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    getChatData(id, filter = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData";
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
     * Creates a new instance in chatData of this model.
     *
     * @param {any} id ChatSessionWrapper id
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    createChatData(id, data = {}, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData";
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
     * Deletes all chatData of this model.
     *
     * @param {any} id ChatSessionWrapper id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    deleteChatData(id, customHeaders) {
        let _method = "DELETE";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData";
        let _routeParams = {
            id: id
        };
        let _postBody = {};
        let _urlParams = {};
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Counts chatData of ChatSessionWrapper.
     *
     * @param {any} id ChatSessionWrapper id
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
    countChatData(id, where = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData/count";
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
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {string} sessionId
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    bySessionId(sessionId = {}, customHeaders) {
        let _method = "GET";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/bySessionId";
        let _routeParams = {};
        let _postBody = {};
        let _urlParams = {};
        if (typeof sessionId !== 'undefined' && sessionId !== null)
            _urlParams.sessionId = sessionId;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @param {string} sessionId
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    addData(sessionId = {}, data = {}, customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/addDataBySessionId";
        let _routeParams = {};
        let _postBody = {
            data: data
        };
        let _urlParams = {};
        if (typeof sessionId !== 'undefined' && sessionId !== null)
            _urlParams.sessionId = sessionId;
        let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    }
    /**
     * Creates a new instance in chatMassages of this model.
     *
     * @param {any} id ChatSessionWrapper id
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    createManyChatMassages(id, data = [], customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatMassages";
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
     * Creates a new instance in chatData of this model.
     *
     * @param {any} id ChatSessionWrapper id
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
     * This usually means the response is a `ChatSessionWrapper` object.)
     * </em>
     */
    createManyChatData(id, data = [], customHeaders) {
        let _method = "POST";
        let _url = lb_config_1.LoopBackConfig.getPath() + "/" + lb_config_1.LoopBackConfig.getApiVersion() +
            "/ChatSessionWrappers/:id/chatData";
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
     * The name of the model represented by this $resource,
     * i.e. `ChatSessionWrapper`.
     */
    getModelName() {
        return "ChatSessionWrapper";
    }
};
ChatSessionWrapperApi = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.HttpClient)),
    __param(1, core_1.Inject(SDKModels_1.SDKModels)),
    __param(2, core_1.Inject(auth_service_1.LoopBackAuth)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(error_service_1.ErrorHandler))
], ChatSessionWrapperApi);
exports.ChatSessionWrapperApi = ChatSessionWrapperApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhdFNlc3Npb25XcmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hhdFNlc3Npb25XcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdDQUE2RDtBQUM3RCwrQ0FBZ0U7QUFDaEUsMkNBQXdDO0FBQ3hDLHVEQUF1RDtBQUN2RCwrQ0FBaUQ7QUFDakQsdURBQW9EO0FBRXBELHlEQUFxRDtBQU1yRDs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsOEJBQWU7SUFFeEQsWUFDZ0MsSUFBZ0IsRUFDakIsTUFBaUIsRUFDZCxJQUFrQixFQUNOLFlBQTBCO1FBRXRFLEtBQUssQ0FBQyxJQUFJLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUxYLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNkLFNBQUksR0FBSixJQUFJLENBQWM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUd4RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0ksb0JBQW9CLENBQUMsRUFBTyxFQUFFLEVBQU8sRUFBRSxhQUF3QjtRQUNwRSxJQUFJLE9BQU8sR0FBVyxLQUFLLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQVcsMEJBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsMEJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYsMkNBQTJDLENBQUM7UUFDNUMsSUFBSSxZQUFZLEdBQVE7WUFDdEIsRUFBRSxFQUFFLEVBQUU7WUFDTixFQUFFLEVBQUUsRUFBRTtTQUNQLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFDeEIsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUks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QUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNJLGtCQUFrQixDQUFDLEVBQU8sRUFBRSxPQUFjLEVBQUUsRUFBRSxhQUF3QjtRQUMzRSxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQVcsMEJBQWMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEdBQUcsMEJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDbEYsbUNBQW1DLENBQUM7UUFDcEMsSUFBSSxZQUFZLEdBQVE7WUFDdEIsRUFBRSxFQUFFLEVBQUU7U0FDUCxDQUFDO1FBQ0YsSUFBSSxTQUFTLEdBQVE7WUFDbkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBQ0YsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkcsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFlBQVk7UUFDakIsT0FBTyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQXBqQlkscUJBQXFCO0lBRGpDLGlCQUFVLEVBQUU7SUFJUixXQUFBLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLENBQUE7SUFDbEIsV0FBQSxhQUFNLENBQUMscUJBQVMsQ0FBQyxDQUFBO0lBQ2pCLFdBQUEsYUFBTSxDQUFDLDJCQUFZLENBQUMsQ0FBQTtJQUNwQixXQUFBLGVBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxhQUFNLENBQUMsNEJBQVksQ0FBQyxDQUFBO0dBTnhCLHFCQUFxQixDQW9qQmpDO0FBcGpCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0RLTW9kZWxzIH0gZnJvbSAnLi9TREtNb2RlbHMnO1xuaW1wb3J0IHsgQmFzZUxvb3BCYWNrQXBpIH0gZnJvbSAnLi4vY29yZS9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tDb25maWcgfSBmcm9tICcuLi8uLi9sYi5jb25maWcnO1xuaW1wb3J0IHsgTG9vcEJhY2tBdXRoIH0gZnJvbSAnLi4vY29yZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsICB9IGZyb20gJy4uLy4uL21vZGVscy9CYXNlTW9kZWxzJztcbmltcG9ydCB7IEVycm9ySGFuZGxlciB9IGZyb20gJy4uL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGF0U2Vzc2lvbldyYXBwZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ2hhdFNlc3Npb25XcmFwcGVyJztcblxuXG4vKipcbiAqIEFwaSBzZXJ2aWNlcyBmb3IgdGhlIGBDaGF0U2Vzc2lvbldyYXBwZXJgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hhdFNlc3Npb25XcmFwcGVyQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHBDbGllbnQpIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoU0RLTW9kZWxzKSBwcm90ZWN0ZWQgbW9kZWxzOiBTREtNb2RlbHMsXG4gICAgQEluamVjdChMb29wQmFja0F1dGgpIHByb3RlY3RlZCBhdXRoOiBMb29wQmFja0F1dGgsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIHByb3RlY3RlZCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCAgbW9kZWxzLCBhdXRoLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGNoYXRNYXNzYWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZmsgRm9yZWlnbiBrZXkgZm9yIGNoYXRNYXNzYWdlc1xuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENoYXRTZXNzaW9uV3JhcHBlcmAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZENoYXRNYXNzYWdlcyhpZDogYW55LCBmazogYW55LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvQ2hhdFNlc3Npb25XcmFwcGVycy86aWQvY2hhdE1hc3NhZ2VzLzpma1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBjaGF0TWFzc2FnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGZrIEZvcmVpZ24ga2V5IGZvciBjaGF0TWFzc2FnZXNcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBubyBkYXRhLlxuICAgKi9cbiAgcHVibGljIGRlc3Ryb3lCeUlkQ2hhdE1hc3NhZ2VzKGlkOiBhbnksIGZrOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0TWFzc2FnZXMvOmZrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7fTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGNoYXRNYXNzYWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZmsgRm9yZWlnbiBrZXkgZm9yIGNoYXRNYXNzYWdlc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUJ5SWRDaGF0TWFzc2FnZXMoaWQ6IGFueSwgZms6IGFueSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0TWFzc2FnZXMvOmZrXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcbiAgICBsZXQgX3Bvc3RCb2R5OiBhbnkgPSB7XG4gICAgICBkYXRhOiBkYXRhXG4gICAgfTtcbiAgICBsZXQgX3VybFBhcmFtczogYW55ID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChfbWV0aG9kLCBfdXJsLCBfcm91dGVQYXJhbXMsIF91cmxQYXJhbXMsIF9wb3N0Qm9keSwgbnVsbCwgY3VzdG9tSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBjaGF0RGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZmsgRm9yZWlnbiBrZXkgZm9yIGNoYXREYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkQ2hhdERhdGEoaWQ6IGFueSwgZms6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0NoYXRTZXNzaW9uV3JhcHBlcnMvOmlkL2NoYXREYXRhLzpma1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBjaGF0RGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gZmsgRm9yZWlnbiBrZXkgZm9yIGNoYXREYXRhXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBkZXN0cm95QnlJZENoYXREYXRhKGlkOiBhbnksIGZrOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0RGF0YS86ZmtcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIHJlbGF0ZWQgaXRlbSBieSBpZCBmb3IgY2hhdERhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGZrIEZvcmVpZ24ga2V5IGZvciBjaGF0RGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUJ5SWRDaGF0RGF0YShpZDogYW55LCBmazogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0NoYXRTZXNzaW9uV3JhcHBlcnMvOmlkL2NoYXREYXRhLzpma1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge1xuICAgICAgZGF0YTogZGF0YVxuICAgIH07XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUXVlcmllcyBjaGF0TWFzc2FnZXMgb2YgQ2hhdFNlc3Npb25XcmFwcGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgQ2hhdFNlc3Npb25XcmFwcGVyIGlkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBmaWx0ZXIgXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDaGF0U2Vzc2lvbldyYXBwZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZ2V0Q2hhdE1hc3NhZ2VzKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0NoYXRTZXNzaW9uV3JhcHBlcnMvOmlkL2NoYXRNYXNzYWdlc1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiBmaWx0ZXIgIT09IG51bGwpIF91cmxQYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBpbiBjaGF0TWFzc2FnZXMgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYXRNYXNzYWdlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0TWFzc2FnZXNcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGNoYXRNYXNzYWdlcyBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgQ2hhdFNlc3Npb25XcmFwcGVyIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVDaGF0TWFzc2FnZXMoaWQ6IGFueSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcbiAgICBsZXQgX3VybDogc3RyaW5nID0gTG9vcEJhY2tDb25maWcuZ2V0UGF0aCgpICsgXCIvXCIgKyBMb29wQmFja0NvbmZpZy5nZXRBcGlWZXJzaW9uKCkgK1xuICAgIFwiL0NoYXRTZXNzaW9uV3JhcHBlcnMvOmlkL2NoYXRNYXNzYWdlc1wiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGNoYXRNYXNzYWdlcyBvZiBDaGF0U2Vzc2lvbldyYXBwZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjb3VudGAg4oCTIGB7bnVtYmVyfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjb3VudENoYXRNYXNzYWdlcyhpZDogYW55LCB3aGVyZTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0TWFzc2FnZXMvY291bnRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHdoZXJlICE9PSAndW5kZWZpbmVkJyAmJiB3aGVyZSAhPT0gbnVsbCkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUXVlcmllcyBjaGF0RGF0YSBvZiBDaGF0U2Vzc2lvbldyYXBwZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGZpbHRlciBcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdFtdfSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENoYXRTZXNzaW9uV3JhcHBlcmAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBnZXRDaGF0RGF0YShpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVyID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0RGF0YVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiBmaWx0ZXIgIT09IG51bGwpIF91cmxQYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBpbiBjaGF0RGF0YSBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0ge2FueX0gaWQgQ2hhdFNlc3Npb25XcmFwcGVyIGlkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDaGF0U2Vzc2lvbldyYXBwZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhdERhdGEoaWQ6IGFueSwgZGF0YTogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvQ2hhdFNlc3Npb25XcmFwcGVycy86aWQvY2hhdERhdGFcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGNoYXREYXRhIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBubyBkYXRhLlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUNoYXREYXRhKGlkOiBhbnksIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0RGF0YVwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGNoYXREYXRhIG9mIENoYXRTZXNzaW9uV3JhcHBlci5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIGNvdW50Q2hhdERhdGEoaWQ6IGFueSwgd2hlcmU6IGFueSA9IHt9LCBjdXN0b21IZWFkZXJzPzogRnVuY3Rpb24pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBfbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvQ2hhdFNlc3Npb25XcmFwcGVycy86aWQvY2hhdERhdGEvY291bnRcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHt9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHdoZXJlICE9PSAndW5kZWZpbmVkJyAmJiB3aGVyZSAhPT0gbnVsbCkgX3VybFBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogPGVtPlxuICAgICAgICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi4pXG4gICAgICAgICAqIDwvZW0+XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXNzaW9uSWQgXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGJ5U2Vzc2lvbklkKHNlc3Npb25JZDogYW55ID0ge30sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzL2J5U2Vzc2lvbklkXCI7XG4gICAgbGV0IF9yb3V0ZVBhcmFtczogYW55ID0ge307XG4gICAgbGV0IF9wb3N0Qm9keTogYW55ID0ge307XG4gICAgbGV0IF91cmxQYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2Ygc2Vzc2lvbklkICE9PSAndW5kZWZpbmVkJyAmJiBzZXNzaW9uSWQgIT09IG51bGwpIF91cmxQYXJhbXMuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QoX21ldGhvZCwgX3VybCwgX3JvdXRlUGFyYW1zLCBfdXJsUGFyYW1zLCBfcG9zdEJvZHksIG51bGwsIGN1c3RvbUhlYWRlcnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogPGVtPlxuICAgICAgICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi4pXG4gICAgICAgICAqIDwvZW0+XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXNzaW9uSWQgXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDaGF0U2Vzc2lvbldyYXBwZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgYWRkRGF0YShzZXNzaW9uSWQ6IGFueSA9IHt9LCBkYXRhOiBhbnkgPSB7fSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzL2FkZERhdGFCeVNlc3Npb25JZFwiO1xuICAgIGxldCBfcm91dGVQYXJhbXM6IGFueSA9IHt9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAodHlwZW9mIHNlc3Npb25JZCAhPT0gJ3VuZGVmaW5lZCcgJiYgc2Vzc2lvbklkICE9PSBudWxsKSBfdXJsUGFyYW1zLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaW4gY2hhdE1hc3NhZ2VzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBpZCBDaGF0U2Vzc2lvbldyYXBwZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ2hhdFNlc3Npb25XcmFwcGVyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZU1hbnlDaGF0TWFzc2FnZXMoaWQ6IGFueSwgZGF0YTogYW55W10gPSBbXSwgY3VzdG9tSGVhZGVycz86IEZ1bmN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgX21ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG4gICAgbGV0IF91cmw6IHN0cmluZyA9IExvb3BCYWNrQ29uZmlnLmdldFBhdGgoKSArIFwiL1wiICsgTG9vcEJhY2tDb25maWcuZ2V0QXBpVmVyc2lvbigpICtcbiAgICBcIi9DaGF0U2Vzc2lvbldyYXBwZXJzLzppZC9jaGF0TWFzc2FnZXNcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaW4gY2hhdERhdGEgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGlkIENoYXRTZXNzaW9uV3JhcHBlciBpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDaGF0U2Vzc2lvbldyYXBwZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueUNoYXREYXRhKGlkOiBhbnksIGRhdGE6IGFueVtdID0gW10sIGN1c3RvbUhlYWRlcnM/OiBGdW5jdGlvbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IF9tZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuICAgIGxldCBfdXJsOiBzdHJpbmcgPSBMb29wQmFja0NvbmZpZy5nZXRQYXRoKCkgKyBcIi9cIiArIExvb3BCYWNrQ29uZmlnLmdldEFwaVZlcnNpb24oKSArXG4gICAgXCIvQ2hhdFNlc3Npb25XcmFwcGVycy86aWQvY2hhdERhdGFcIjtcbiAgICBsZXQgX3JvdXRlUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuICAgIGxldCBfcG9zdEJvZHk6IGFueSA9IHtcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICAgIGxldCBfdXJsUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KF9tZXRob2QsIF91cmwsIF9yb3V0ZVBhcmFtcywgX3VybFBhcmFtcywgX3Bvc3RCb2R5LCBudWxsLCBjdXN0b21IZWFkZXJzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQ2hhdFNlc3Npb25XcmFwcGVyYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ2hhdFNlc3Npb25XcmFwcGVyXCI7XG4gIH1cbn1cbiJdfQ==