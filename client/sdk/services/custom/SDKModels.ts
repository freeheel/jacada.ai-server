/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Webhook } from '../../models/Webhook';
import { ChatSessionWrapper } from '../../models/ChatSessionWrapper';
import { AsyncBotMessage } from '../../models/AsyncBotMessage';
import { Maintainance } from '../../models/Maintainance';
import { IntentHelper } from '../../models/IntentHelper';
import { IntentChangeRequest } from '../../models/IntentChangeRequest';
import { IntentKeyMapping } from '../../models/IntentKeyMapping';
import { StartLinkRequest } from '../../models/StartLinkRequest';
import { BotHistory } from '../../models/BotHistory';
import { BotHelper } from '../../models/BotHelper';
import { BotCommand } from '../../models/BotCommand';
import { AutomationHelper } from '../../models/AutomationHelper';
import { AutomationCommand } from '../../models/AutomationCommand';
import { ContactUsHelper } from '../../models/ContactUsHelper';
import { ContactUsCommand } from '../../models/ContactUsCommand';
import { FacebookWebHook } from '../../models/FacebookWebHook';
import { FacebookConfig } from '../../models/FacebookConfig';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Webhook: Webhook,
    ChatSessionWrapper: ChatSessionWrapper,
    AsyncBotMessage: AsyncBotMessage,
    Maintainance: Maintainance,
    IntentHelper: IntentHelper,
    IntentChangeRequest: IntentChangeRequest,
    IntentKeyMapping: IntentKeyMapping,
    StartLinkRequest: StartLinkRequest,
    BotHistory: BotHistory,
    BotHelper: BotHelper,
    BotCommand: BotCommand,
    AutomationHelper: AutomationHelper,
    AutomationCommand: AutomationCommand,
    ContactUsHelper: ContactUsHelper,
    ContactUsCommand: ContactUsCommand,
    FacebookWebHook: FacebookWebHook,
    FacebookConfig: FacebookConfig,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
