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
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { UserApi } from './services/custom/User';
import { WebhookApi } from './services/custom/Webhook';
import { ChatSessionWrapperApi } from './services/custom/ChatSessionWrapper';
import { AsyncBotMessageApi } from './services/custom/AsyncBotMessage';
import { MaintainanceApi } from './services/custom/Maintainance';
import { IntentHelperApi } from './services/custom/IntentHelper';
import { IntentChangeRequestApi } from './services/custom/IntentChangeRequest';
import { IntentKeyMappingApi } from './services/custom/IntentKeyMapping';
import { StartLinkRequestApi } from './services/custom/StartLinkRequest';
import { BotHistoryApi } from './services/custom/BotHistory';
import { BotHelperApi } from './services/custom/BotHelper';
import { BotCommandApi } from './services/custom/BotCommand';
import { AutomationHelperApi } from './services/custom/AutomationHelper';
import { AutomationCommandApi } from './services/custom/AutomationCommand';
import { ContactUsHelperApi } from './services/custom/ContactUsHelper';
import { ContactUsCommandApi } from './services/custom/ContactUsCommand';
import { FacebookWebHookApi } from './services/custom/FacebookWebHook';
import { FacebookConfigApi } from './services/custom/FacebookConfig';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        UserApi,
        WebhookApi,
        ChatSessionWrapperApi,
        AsyncBotMessageApi,
        MaintainanceApi,
        IntentHelperApi,
        IntentChangeRequestApi,
        IntentKeyMappingApi,
        StartLinkRequestApi,
        BotHistoryApi,
        BotHelperApi,
        BotCommandApi,
        AutomationHelperApi,
        AutomationCommandApi,
        ContactUsHelperApi,
        ContactUsCommandApi,
        FacebookWebHookApi,
        FacebookConfigApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

