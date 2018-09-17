"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var SDKBrowserModule_1;
"use strict";
/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
const error_service_1 = require("./services/core/error.service");
const auth_service_1 = require("./services/core/auth.service");
const logger_service_1 = require("./services/custom/logger.service");
const SDKModels_1 = require("./services/custom/SDKModels");
const storage_swaps_1 = require("./storage/storage.swaps");
const http_1 = require("@angular/common/http");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const cookie_browser_1 = require("./storage/cookie.browser");
const storage_browser_1 = require("./storage/storage.browser");
const User_1 = require("./services/custom/User");
const Webhook_1 = require("./services/custom/Webhook");
const ChatSessionWrapper_1 = require("./services/custom/ChatSessionWrapper");
const AsyncBotMessage_1 = require("./services/custom/AsyncBotMessage");
const Maintainance_1 = require("./services/custom/Maintainance");
const IntentHelper_1 = require("./services/custom/IntentHelper");
const IntentChangeRequest_1 = require("./services/custom/IntentChangeRequest");
const IntentKeyMapping_1 = require("./services/custom/IntentKeyMapping");
const StartLinkRequest_1 = require("./services/custom/StartLinkRequest");
const BotHistory_1 = require("./services/custom/BotHistory");
const BotHelper_1 = require("./services/custom/BotHelper");
const BotCommand_1 = require("./services/custom/BotCommand");
const AutomationHelper_1 = require("./services/custom/AutomationHelper");
const AutomationCommand_1 = require("./services/custom/AutomationCommand");
const ContactUsHelper_1 = require("./services/custom/ContactUsHelper");
const ContactUsCommand_1 = require("./services/custom/ContactUsCommand");
const FacebookWebHook_1 = require("./services/custom/FacebookWebHook");
const FacebookConfig_1 = require("./services/custom/FacebookConfig");
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
let SDKBrowserModule = SDKBrowserModule_1 = class SDKBrowserModule {
    static forRoot(internalStorageProvider = {
        provide: storage_swaps_1.InternalStorage,
        useClass: cookie_browser_1.CookieBrowser
    }) {
        return {
            ngModule: SDKBrowserModule_1,
            providers: [
                auth_service_1.LoopBackAuth,
                logger_service_1.LoggerService,
                SDKModels_1.SDKModels,
                User_1.UserApi,
                Webhook_1.WebhookApi,
                ChatSessionWrapper_1.ChatSessionWrapperApi,
                AsyncBotMessage_1.AsyncBotMessageApi,
                Maintainance_1.MaintainanceApi,
                IntentHelper_1.IntentHelperApi,
                IntentChangeRequest_1.IntentChangeRequestApi,
                IntentKeyMapping_1.IntentKeyMappingApi,
                StartLinkRequest_1.StartLinkRequestApi,
                BotHistory_1.BotHistoryApi,
                BotHelper_1.BotHelperApi,
                BotCommand_1.BotCommandApi,
                AutomationHelper_1.AutomationHelperApi,
                AutomationCommand_1.AutomationCommandApi,
                ContactUsHelper_1.ContactUsHelperApi,
                ContactUsCommand_1.ContactUsCommandApi,
                FacebookWebHook_1.FacebookWebHookApi,
                FacebookConfig_1.FacebookConfigApi,
                internalStorageProvider,
                { provide: storage_swaps_1.SDKStorage, useClass: storage_browser_1.StorageBrowser }
            ]
        };
    }
};
SDKBrowserModule = SDKBrowserModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, http_1.HttpClientModule],
        declarations: [],
        exports: [],
        providers: [
            error_service_1.ErrorHandler
        ]
    })
], SDKBrowserModule);
exports.SDKBrowserModule = SDKBrowserModule;
/**
* Have Fun!!!
* - Jon
**/
__export(require("./models/index"));
__export(require("./services/index"));
__export(require("./lb.config"));
__export(require("./storage/storage.swaps"));
var cookie_browser_2 = require("./storage/cookie.browser");
exports.CookieBrowser = cookie_browser_2.CookieBrowser;
var storage_browser_2 = require("./storage/storage.browser");
exports.StorageBrowser = storage_browser_2.StorageBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsaUVBQTZEO0FBQzdELCtEQUE0RDtBQUM1RCxxRUFBaUU7QUFDakUsMkRBQXdEO0FBQ3hELDJEQUFzRTtBQUN0RSwrQ0FBd0Q7QUFDeEQsNENBQStDO0FBQy9DLHdDQUE4RDtBQUM5RCw2REFBeUQ7QUFDekQsK0RBQTJEO0FBQzNELGlEQUFpRDtBQUNqRCx1REFBdUQ7QUFDdkQsNkVBQTZFO0FBQzdFLHVFQUF1RTtBQUN2RSxpRUFBaUU7QUFDakUsaUVBQWlFO0FBQ2pFLCtFQUErRTtBQUMvRSx5RUFBeUU7QUFDekUseUVBQXlFO0FBQ3pFLDZEQUE2RDtBQUM3RCwyREFBMkQ7QUFDM0QsNkRBQTZEO0FBQzdELHlFQUF5RTtBQUN6RSwyRUFBMkU7QUFDM0UsdUVBQXVFO0FBQ3ZFLHlFQUF5RTtBQUN6RSx1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFOzs7Ozs7OztHQVFHO0FBU0gsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQStCO1FBQzVDLE9BQU8sRUFBRSwrQkFBZTtRQUN4QixRQUFRLEVBQUUsOEJBQWE7S0FDeEI7UUFDQyxPQUFPO1lBQ0wsUUFBUSxFQUFJLGtCQUFnQjtZQUM1QixTQUFTLEVBQUc7Z0JBQ1YsMkJBQVk7Z0JBQ1osOEJBQWE7Z0JBQ2IscUJBQVM7Z0JBQ1QsY0FBTztnQkFDUCxvQkFBVTtnQkFDViwwQ0FBcUI7Z0JBQ3JCLG9DQUFrQjtnQkFDbEIsOEJBQWU7Z0JBQ2YsOEJBQWU7Z0JBQ2YsNENBQXNCO2dCQUN0QixzQ0FBbUI7Z0JBQ25CLHNDQUFtQjtnQkFDbkIsMEJBQWE7Z0JBQ2Isd0JBQVk7Z0JBQ1osMEJBQWE7Z0JBQ2Isc0NBQW1CO2dCQUNuQix3Q0FBb0I7Z0JBQ3BCLG9DQUFrQjtnQkFDbEIsc0NBQW1CO2dCQUNuQixvQ0FBa0I7Z0JBQ2xCLGtDQUFpQjtnQkFDakIsdUJBQXVCO2dCQUN2QixFQUFFLE9BQU8sRUFBRSwwQkFBVSxFQUFFLFFBQVEsRUFBRSxnQ0FBYyxFQUFFO2FBQ2xEO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBbENZLGdCQUFnQjtJQVI1QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQU8sQ0FBRSxxQkFBWSxFQUFFLHVCQUFnQixDQUFFO1FBQ2hELFlBQVksRUFBRSxFQUFHO1FBQ2pCLE9BQU8sRUFBTyxFQUFHO1FBQ2pCLFNBQVMsRUFBSztZQUNaLDRCQUFZO1NBQ2I7S0FDRixDQUFDO0dBQ1csZ0JBQWdCLENBa0M1QjtBQWxDWSw0Q0FBZ0I7QUFtQzdCOzs7R0FHRztBQUNILG9DQUErQjtBQUMvQixzQ0FBaUM7QUFDakMsaUNBQTRCO0FBQzVCLDZDQUF3QztBQUN4QywyREFBeUQ7QUFBaEQseUNBQUEsYUFBYSxDQUFBO0FBQ3RCLDZEQUEyRDtBQUFsRCwyQ0FBQSxjQUFjLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4qIEBtb2R1bGUgU0RLTW9kdWxlXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHQ6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdoOmpvbmF0aGFuLWNhc2FycnViaWFzPlxuKiBAbGljZW5zZSBNSVQgMjAxNiBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuKiBAdmVyc2lvbiAyLjEuMFxuKiBAZGVzY3JpcHRpb25cbiogVGhlIFNES01vZHVsZSBpcyBhIGdlbmVyYXRlZCBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXV0b21hdGljYWxseSBidWlsdCBieVxuKiB0aGUgTG9vcEJhY2sgU0RLIEJ1aWxkZXIgb3BlbiBzb3VyY2UgbW9kdWxlLlxuKlxuKiBUaGUgU0RLTW9kdWxlIHByb3ZpZGVzIEFuZ3VsYXIgMiA+PSBSQy41IHN1cHBvcnQsIHdoaWNoIG1lYW5zIHRoYXQgTmdNb2R1bGVzXG4qIGNhbiBpbXBvcnQgdGhpcyBTb2Z0d2FyZSBEZXZlbG9wbWVudCBLaXQgYXMgZm9sbG93czpcbipcbipcbiogQVBQIFJvdXRlIE1vZHVsZSBDb250ZXh0XG4qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbiogaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbiogLy8gQXBwIFJvb3QgXG4qIGltcG9ydCB7IEFwcENvbXBvbmVudCB9ICAgZnJvbSAnLi9hcHAuY29tcG9uZW50JztcbiogLy8gRmVhdHVyZSBNb2R1bGVzXG4qIGltcG9ydCB7IFNES1tCcm93c2VyfE5vZGV8TmF0aXZlXU1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3Nkay9zZGsubW9kdWxlJztcbiogLy8gSW1wb3J0IFJvdXRpbmdcbiogaW1wb3J0IHsgcm91dGluZyB9ICAgICAgICBmcm9tICcuL2FwcC5yb3V0aW5nJztcbiogQE5nTW9kdWxlKHtcbiogIGltcG9ydHM6IFtcbiogICAgQnJvd3Nlck1vZHVsZSxcbiogICAgcm91dGluZyxcbiogICAgU0RLW0Jyb3dzZXJ8Tm9kZXxOYXRpdmVdTW9kdWxlLmZvclJvb3QoKVxuKiAgXSxcbiogIGRlY2xhcmF0aW9uczogWyBBcHBDb21wb25lbnQgXSxcbiogIGJvb3RzdHJhcDogICAgWyBBcHBDb21wb25lbnQgXVxuKiB9KVxuKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuKlxuKiovXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wQmFja0F1dGggfSBmcm9tICcuL3NlcnZpY2VzL2NvcmUvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9sb2dnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTREtNb2RlbHMgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TREtNb2RlbHMnO1xuaW1wb3J0IHsgSW50ZXJuYWxTdG9yYWdlLCBTREtTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5pbXBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuaW1wb3J0IHsgVXNlckFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1VzZXInO1xuaW1wb3J0IHsgV2ViaG9va0FwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL1dlYmhvb2snO1xuaW1wb3J0IHsgQ2hhdFNlc3Npb25XcmFwcGVyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQ2hhdFNlc3Npb25XcmFwcGVyJztcbmltcG9ydCB7IEFzeW5jQm90TWVzc2FnZUFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0FzeW5jQm90TWVzc2FnZSc7XG5pbXBvcnQgeyBNYWludGFpbmFuY2VBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9NYWludGFpbmFuY2UnO1xuaW1wb3J0IHsgSW50ZW50SGVscGVyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vSW50ZW50SGVscGVyJztcbmltcG9ydCB7IEludGVudENoYW5nZVJlcXVlc3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbnRlbnRDaGFuZ2VSZXF1ZXN0JztcbmltcG9ydCB7IEludGVudEtleU1hcHBpbmdBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9JbnRlbnRLZXlNYXBwaW5nJztcbmltcG9ydCB7IFN0YXJ0TGlua1JlcXVlc3RBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9TdGFydExpbmtSZXF1ZXN0JztcbmltcG9ydCB7IEJvdEhpc3RvcnlBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9Cb3RIaXN0b3J5JztcbmltcG9ydCB7IEJvdEhlbHBlckFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0JvdEhlbHBlcic7XG5pbXBvcnQgeyBCb3RDb21tYW5kQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQm90Q29tbWFuZCc7XG5pbXBvcnQgeyBBdXRvbWF0aW9uSGVscGVyQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQXV0b21hdGlvbkhlbHBlcic7XG5pbXBvcnQgeyBBdXRvbWF0aW9uQ29tbWFuZEFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0F1dG9tYXRpb25Db21tYW5kJztcbmltcG9ydCB7IENvbnRhY3RVc0hlbHBlckFwaSB9IGZyb20gJy4vc2VydmljZXMvY3VzdG9tL0NvbnRhY3RVc0hlbHBlcic7XG5pbXBvcnQgeyBDb250YWN0VXNDb21tYW5kQXBpIH0gZnJvbSAnLi9zZXJ2aWNlcy9jdXN0b20vQ29udGFjdFVzQ29tbWFuZCc7XG5pbXBvcnQgeyBGYWNlYm9va1dlYkhvb2tBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9GYWNlYm9va1dlYkhvb2snO1xuaW1wb3J0IHsgRmFjZWJvb2tDb25maWdBcGkgfSBmcm9tICcuL3NlcnZpY2VzL2N1c3RvbS9GYWNlYm9va0NvbmZpZyc7XG4vKipcbiogQG1vZHVsZSBTREtCcm93c2VyTW9kdWxlXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBzaG91bGQgYmUgaW1wb3J0ZWQgd2hlbiBidWlsZGluZyBhIFdlYiBBcHBsaWNhdGlvbiBpbiB0aGUgZm9sbG93aW5nIHNjZW5hcmlvczpcbipcbiogIDEuLSBSZWd1bGFyIHdlYiBhcHBsaWNhdGlvblxuKiAgMi4tIEFuZ3VsYXIgdW5pdmVyc2FsIGFwcGxpY2F0aW9uIChCcm93c2VyIFBvcnRpb24pXG4qICAzLi0gUHJvZ3Jlc3NpdmUgYXBwbGljYXRpb25zIChBbmd1bGFyIE1vYmlsZSwgSW9uaWMsIFdlYlZpZXdzLCBldGMpXG4qKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgWyBDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIF0sXG4gIGV4cG9ydHM6ICAgICAgWyBdLFxuICBwcm92aWRlcnM6ICAgIFtcbiAgICBFcnJvckhhbmRsZXJcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTREtCcm93c2VyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoaW50ZXJuYWxTdG9yYWdlUHJvdmlkZXI6IGFueSA9IHtcbiAgICBwcm92aWRlOiBJbnRlcm5hbFN0b3JhZ2UsXG4gICAgdXNlQ2xhc3M6IENvb2tpZUJyb3dzZXJcbiAgfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZSAgOiBTREtCcm93c2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzIDogW1xuICAgICAgICBMb29wQmFja0F1dGgsXG4gICAgICAgIExvZ2dlclNlcnZpY2UsXG4gICAgICAgIFNES01vZGVscyxcbiAgICAgICAgVXNlckFwaSxcbiAgICAgICAgV2ViaG9va0FwaSxcbiAgICAgICAgQ2hhdFNlc3Npb25XcmFwcGVyQXBpLFxuICAgICAgICBBc3luY0JvdE1lc3NhZ2VBcGksXG4gICAgICAgIE1haW50YWluYW5jZUFwaSxcbiAgICAgICAgSW50ZW50SGVscGVyQXBpLFxuICAgICAgICBJbnRlbnRDaGFuZ2VSZXF1ZXN0QXBpLFxuICAgICAgICBJbnRlbnRLZXlNYXBwaW5nQXBpLFxuICAgICAgICBTdGFydExpbmtSZXF1ZXN0QXBpLFxuICAgICAgICBCb3RIaXN0b3J5QXBpLFxuICAgICAgICBCb3RIZWxwZXJBcGksXG4gICAgICAgIEJvdENvbW1hbmRBcGksXG4gICAgICAgIEF1dG9tYXRpb25IZWxwZXJBcGksXG4gICAgICAgIEF1dG9tYXRpb25Db21tYW5kQXBpLFxuICAgICAgICBDb250YWN0VXNIZWxwZXJBcGksXG4gICAgICAgIENvbnRhY3RVc0NvbW1hbmRBcGksXG4gICAgICAgIEZhY2Vib29rV2ViSG9va0FwaSxcbiAgICAgICAgRmFjZWJvb2tDb25maWdBcGksXG4gICAgICAgIGludGVybmFsU3RvcmFnZVByb3ZpZGVyLFxuICAgICAgICB7IHByb3ZpZGU6IFNES1N0b3JhZ2UsIHVzZUNsYXNzOiBTdG9yYWdlQnJvd3NlciB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuLyoqXG4qIEhhdmUgRnVuISEhXG4qIC0gSm9uXG4qKi9cbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9sYi5jb25maWcnO1xuZXhwb3J0ICogZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2Uuc3dhcHMnO1xuZXhwb3J0IHsgQ29va2llQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9jb29raWUuYnJvd3Nlcic7XG5leHBvcnQgeyBTdG9yYWdlQnJvd3NlciB9IGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlLmJyb3dzZXInO1xuXG4iXX0=