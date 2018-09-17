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
const User_1 = require("../../models/User");
const Webhook_1 = require("../../models/Webhook");
const ChatSessionWrapper_1 = require("../../models/ChatSessionWrapper");
const AsyncBotMessage_1 = require("../../models/AsyncBotMessage");
const Maintainance_1 = require("../../models/Maintainance");
const IntentHelper_1 = require("../../models/IntentHelper");
const IntentChangeRequest_1 = require("../../models/IntentChangeRequest");
const IntentKeyMapping_1 = require("../../models/IntentKeyMapping");
const StartLinkRequest_1 = require("../../models/StartLinkRequest");
const BotHistory_1 = require("../../models/BotHistory");
const BotHelper_1 = require("../../models/BotHelper");
const BotCommand_1 = require("../../models/BotCommand");
const AutomationHelper_1 = require("../../models/AutomationHelper");
const AutomationCommand_1 = require("../../models/AutomationCommand");
const ContactUsHelper_1 = require("../../models/ContactUsHelper");
const ContactUsCommand_1 = require("../../models/ContactUsCommand");
const FacebookWebHook_1 = require("../../models/FacebookWebHook");
const FacebookConfig_1 = require("../../models/FacebookConfig");
let SDKModels = class SDKModels {
    constructor() {
        this.models = {
            User: User_1.User,
            Webhook: Webhook_1.Webhook,
            ChatSessionWrapper: ChatSessionWrapper_1.ChatSessionWrapper,
            AsyncBotMessage: AsyncBotMessage_1.AsyncBotMessage,
            Maintainance: Maintainance_1.Maintainance,
            IntentHelper: IntentHelper_1.IntentHelper,
            IntentChangeRequest: IntentChangeRequest_1.IntentChangeRequest,
            IntentKeyMapping: IntentKeyMapping_1.IntentKeyMapping,
            StartLinkRequest: StartLinkRequest_1.StartLinkRequest,
            BotHistory: BotHistory_1.BotHistory,
            BotHelper: BotHelper_1.BotHelper,
            BotCommand: BotCommand_1.BotCommand,
            AutomationHelper: AutomationHelper_1.AutomationHelper,
            AutomationCommand: AutomationCommand_1.AutomationCommand,
            ContactUsHelper: ContactUsHelper_1.ContactUsHelper,
            ContactUsCommand: ContactUsCommand_1.ContactUsCommand,
            FacebookWebHook: FacebookWebHook_1.FacebookWebHook,
            FacebookConfig: FacebookConfig_1.FacebookConfig,
        };
    }
    get(modelName) {
        return this.models[modelName];
    }
    getAll() {
        return this.models;
    }
    getModelNames() {
        return Object.keys(this.models);
    }
};
SDKModels = __decorate([
    core_1.Injectable()
], SDKModels);
exports.SDKModels = SDKModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RLTW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RLTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdDQUEyQztBQUMzQyw0Q0FBeUM7QUFDekMsa0RBQStDO0FBQy9DLHdFQUFxRTtBQUNyRSxrRUFBK0Q7QUFDL0QsNERBQXlEO0FBQ3pELDREQUF5RDtBQUN6RCwwRUFBdUU7QUFDdkUsb0VBQWlFO0FBQ2pFLG9FQUFpRTtBQUNqRSx3REFBcUQ7QUFDckQsc0RBQW1EO0FBQ25ELHdEQUFxRDtBQUNyRCxvRUFBaUU7QUFDakUsc0VBQW1FO0FBQ25FLGtFQUErRDtBQUMvRCxvRUFBaUU7QUFDakUsa0VBQStEO0FBQy9ELGdFQUE2RDtBQUs3RCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRHRCO1FBR1UsV0FBTSxHQUFXO1lBQ3ZCLElBQUksRUFBRSxXQUFJO1lBQ1YsT0FBTyxFQUFFLGlCQUFPO1lBQ2hCLGtCQUFrQixFQUFFLHVDQUFrQjtZQUN0QyxlQUFlLEVBQUUsaUNBQWU7WUFDaEMsWUFBWSxFQUFFLDJCQUFZO1lBQzFCLFlBQVksRUFBRSwyQkFBWTtZQUMxQixtQkFBbUIsRUFBRSx5Q0FBbUI7WUFDeEMsZ0JBQWdCLEVBQUUsbUNBQWdCO1lBQ2xDLGdCQUFnQixFQUFFLG1DQUFnQjtZQUNsQyxVQUFVLEVBQUUsdUJBQVU7WUFDdEIsU0FBUyxFQUFFLHFCQUFTO1lBQ3BCLFVBQVUsRUFBRSx1QkFBVTtZQUN0QixnQkFBZ0IsRUFBRSxtQ0FBZ0I7WUFDbEMsaUJBQWlCLEVBQUUscUNBQWlCO1lBQ3BDLGVBQWUsRUFBRSxpQ0FBZTtZQUNoQyxnQkFBZ0IsRUFBRSxtQ0FBZ0I7WUFDbEMsZUFBZSxFQUFFLGlDQUFlO1lBQ2hDLGNBQWMsRUFBRSwrQkFBYztTQUUvQixDQUFDO0lBYUosQ0FBQztJQVhRLEdBQUcsQ0FBQyxTQUFpQjtRQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVNLGFBQWE7UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQTtBQW5DWSxTQUFTO0lBRHJCLGlCQUFVLEVBQUU7R0FDQSxTQUFTLENBbUNyQjtBQW5DWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1VzZXInO1xuaW1wb3J0IHsgV2ViaG9vayB9IGZyb20gJy4uLy4uL21vZGVscy9XZWJob29rJztcbmltcG9ydCB7IENoYXRTZXNzaW9uV3JhcHBlciB9IGZyb20gJy4uLy4uL21vZGVscy9DaGF0U2Vzc2lvbldyYXBwZXInO1xuaW1wb3J0IHsgQXN5bmNCb3RNZXNzYWdlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0FzeW5jQm90TWVzc2FnZSc7XG5pbXBvcnQgeyBNYWludGFpbmFuY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvTWFpbnRhaW5hbmNlJztcbmltcG9ydCB7IEludGVudEhlbHBlciB9IGZyb20gJy4uLy4uL21vZGVscy9JbnRlbnRIZWxwZXInO1xuaW1wb3J0IHsgSW50ZW50Q2hhbmdlUmVxdWVzdCB9IGZyb20gJy4uLy4uL21vZGVscy9JbnRlbnRDaGFuZ2VSZXF1ZXN0JztcbmltcG9ydCB7IEludGVudEtleU1hcHBpbmcgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW50ZW50S2V5TWFwcGluZyc7XG5pbXBvcnQgeyBTdGFydExpbmtSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N0YXJ0TGlua1JlcXVlc3QnO1xuaW1wb3J0IHsgQm90SGlzdG9yeSB9IGZyb20gJy4uLy4uL21vZGVscy9Cb3RIaXN0b3J5JztcbmltcG9ydCB7IEJvdEhlbHBlciB9IGZyb20gJy4uLy4uL21vZGVscy9Cb3RIZWxwZXInO1xuaW1wb3J0IHsgQm90Q29tbWFuZCB9IGZyb20gJy4uLy4uL21vZGVscy9Cb3RDb21tYW5kJztcbmltcG9ydCB7IEF1dG9tYXRpb25IZWxwZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvQXV0b21hdGlvbkhlbHBlcic7XG5pbXBvcnQgeyBBdXRvbWF0aW9uQ29tbWFuZCB9IGZyb20gJy4uLy4uL21vZGVscy9BdXRvbWF0aW9uQ29tbWFuZCc7XG5pbXBvcnQgeyBDb250YWN0VXNIZWxwZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ29udGFjdFVzSGVscGVyJztcbmltcG9ydCB7IENvbnRhY3RVc0NvbW1hbmQgfSBmcm9tICcuLi8uLi9tb2RlbHMvQ29udGFjdFVzQ29tbWFuZCc7XG5pbXBvcnQgeyBGYWNlYm9va1dlYkhvb2sgfSBmcm9tICcuLi8uLi9tb2RlbHMvRmFjZWJvb2tXZWJIb29rJztcbmltcG9ydCB7IEZhY2Vib29rQ29uZmlnIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0ZhY2Vib29rQ29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbHMgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNES01vZGVscyB7XG5cbiAgcHJpdmF0ZSBtb2RlbHM6IE1vZGVscyA9IHtcbiAgICBVc2VyOiBVc2VyLFxuICAgIFdlYmhvb2s6IFdlYmhvb2ssXG4gICAgQ2hhdFNlc3Npb25XcmFwcGVyOiBDaGF0U2Vzc2lvbldyYXBwZXIsXG4gICAgQXN5bmNCb3RNZXNzYWdlOiBBc3luY0JvdE1lc3NhZ2UsXG4gICAgTWFpbnRhaW5hbmNlOiBNYWludGFpbmFuY2UsXG4gICAgSW50ZW50SGVscGVyOiBJbnRlbnRIZWxwZXIsXG4gICAgSW50ZW50Q2hhbmdlUmVxdWVzdDogSW50ZW50Q2hhbmdlUmVxdWVzdCxcbiAgICBJbnRlbnRLZXlNYXBwaW5nOiBJbnRlbnRLZXlNYXBwaW5nLFxuICAgIFN0YXJ0TGlua1JlcXVlc3Q6IFN0YXJ0TGlua1JlcXVlc3QsXG4gICAgQm90SGlzdG9yeTogQm90SGlzdG9yeSxcbiAgICBCb3RIZWxwZXI6IEJvdEhlbHBlcixcbiAgICBCb3RDb21tYW5kOiBCb3RDb21tYW5kLFxuICAgIEF1dG9tYXRpb25IZWxwZXI6IEF1dG9tYXRpb25IZWxwZXIsXG4gICAgQXV0b21hdGlvbkNvbW1hbmQ6IEF1dG9tYXRpb25Db21tYW5kLFxuICAgIENvbnRhY3RVc0hlbHBlcjogQ29udGFjdFVzSGVscGVyLFxuICAgIENvbnRhY3RVc0NvbW1hbmQ6IENvbnRhY3RVc0NvbW1hbmQsXG4gICAgRmFjZWJvb2tXZWJIb29rOiBGYWNlYm9va1dlYkhvb2ssXG4gICAgRmFjZWJvb2tDb25maWc6IEZhY2Vib29rQ29uZmlnLFxuICAgIFxuICB9O1xuXG4gIHB1YmxpYyBnZXQobW9kZWxOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsc1ttb2RlbE5hbWVdO1xuICB9XG5cbiAgcHVibGljIGdldEFsbCgpOiBNb2RlbHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVscztcbiAgfVxuXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tb2RlbHMpO1xuICB9XG59XG4iXX0=