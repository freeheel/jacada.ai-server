"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestData {
    constructor() {
        this.testInputData = {
            "nlpEngineResponse": {
                "vendorResponse": {
                    "id": "daff27b4-209a-4e2f-bc4e-5841d5eaf70e",
                    "timestamp": 1536906291381,
                    "lang": "en",
                    "result": {
                        "resolvedQuery": "hi",
                        "action": "input.welcome",
                        "actionIncomplete": false,
                        "parameters": {},
                        "contexts": [
                            {
                                "name": "defaultwelcomeintent-followup",
                                "lifespan": 2,
                                "parameters": {}
                            }
                        ],
                        "score": 1,
                        "source": "agent",
                        "metadata": {
                            "intentName": "Default Welcome PSE",
                            "intentId": "b0710d2f-c38f-40b8-99f6-a321c763d12e",
                            "webhookUsed": "false",
                            "webhookForSlotFillingUsed": "false"
                        },
                        "fulfillment": {
                            "speech": "Hi! Welcome to the PSE virtual assistant. I've matched an account to your phone number. For security, what is your 4 digit account PIN?",
                            "messages": [
                                {
                                    "type": "0",
                                    "speech": "Hi! Welcome to the PSE virtual assistant. I've matched an account to your phone number. For security, what is your 4 digit account PIN?"
                                }
                            ]
                        }
                    },
                    "status": {
                        "code": 200,
                        "errorType": "success"
                    },
                    "sessionId": "16c7501a-e628-413a-8d68-24ff76e989de",
                    "error": false
                },
                "dialogStepInformation": {
                    "id": "b0710d2f-c38f-40b8-99f6-a321c763d12e",
                    "name": "Default Welcome PSE"
                },
                "context": {},
                "nlpEngineType": "DIALOGFLOW"
            },
            "interactResponse": {
                "flowInformation": {
                    "id": "2541afc397cb-286dec5193797b3c-afa3",
                    "name": "UtilityInc_PSE_Welcome1"
                },
                "elementResponse": {
                    "page": {
                        "pageNavigation": {
                            "navigationTitle": "PIN Verification",
                            "pageReferenceName": "PIN Verification",
                            "navigationRight": {
                                "buttonState": "NORMAL",
                                "buttonVisible": true,
                                "buttonAction": "CONTINUE_FLOW"
                            },
                            "navigationLeft": {
                                "buttonState": "NORMAL",
                                "buttonVisible": true,
                                "buttonLabel": "BTN_BACK",
                                "buttonAction": "local://navigationType?type=BACK_TO_COVER_APP"
                            }
                        },
                        "pageContent": {
                            "contentHeader": {
                                "id": "5fc461cebc5a-30805e67a363cf6f-ffbf",
                                "innerHtml": ""
                            },
                            "contentSections": [
                                {
                                    "id": "f8da275d278d-84a0cfda0704ebe2-eeb4",
                                    "sectionHeader": {
                                        "id": "f8da275d278d-84a0cfda0704ebe2-eeb4",
                                        "innerHtml": "<p>Hi! Welcome to the PSE virtual assistant. I've matched an account to your phone number.</p>"
                                    },
                                    "sectionLabel": "",
                                    "selectionType": "SINGLE",
                                    "sectionNumberOfColumns": 0,
                                    "sectionChoices": [
                                        {}
                                    ],
                                    "sectionFooter": {
                                        "id": "f8da275d278d-84a0cfda0704ebe2-eeb4",
                                        "innerHtml": ""
                                    },
                                    "referenceName": "Paragraph",
                                    "elementType": "PARAGRAPH"
                                },
                                {
                                    "id": "be75e59838d8-b170ea30992585be-3e2f",
                                    "sectionHeader": {
                                        "id": "be75e59838d8-b170ea30992585be-3e2f",
                                        "innerHtml": ""
                                    },
                                    "sectionLabel": "For security, what is your 4 digit account PIN?",
                                    "selectionType": "SINGLE",
                                    "sectionNumberOfColumns": 0,
                                    "sectionChoices": [
                                        {
                                            "id": "be75e59838d8-b170ea30992585be-3e2f",
                                            "referenceName": "Number",
                                            "textInput": {
                                                "id": "be75e59838d8-b170ea30992585be-3e2f",
                                                "buttonVisible": true,
                                                "maxCharacters": 150,
                                                "numberOfLines": 1,
                                                "placeHolderText": "",
                                                "textInputFormat": "CURRENCY",
                                                "textMask": "######",
                                                "isMandatory": false
                                            }
                                        }
                                    ],
                                    "sectionFooter": {
                                        "id": "be75e59838d8-b170ea30992585be-3e2f",
                                        "innerHtml": ""
                                    },
                                    "referenceName": "Number",
                                    "elementType": "QUESTION_INPUT_ELEMENT"
                                }
                            ],
                            "contentFooter": {
                                "id": "5fc461cebc5a-30805e67a363cf6f-ffbf",
                                "innerHtml": ""
                            },
                            "allowVerticalScroll": true,
                            "allowHorizonalScroll": false,
                            "pageType": "multiQuestion",
                            "time": 0
                        },
                        "pageMenu": {
                            "menuVisible": false,
                            "menuButtons": [
                                {
                                    "buttonState": "NORMAL",
                                    "buttonVisible": true,
                                    "buttonLabel": "BTN_MORE",
                                    "buttonAction": "local://CURRENT",
                                    "buttonImageName": "icon_more.png"
                                }
                            ]
                        },
                        "pageNotes": "",
                        "language": "en",
                        "contactUsPage": false
                    }
                },
                "context": {}
            }
        };
    }
}
exports.default = TestData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXN0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFFBQVE7SUFJM0I7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLG1CQUFtQixFQUFFO2dCQUNuQixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLHNDQUFzQztvQkFDNUMsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRTt3QkFDUixlQUFlLEVBQUUsSUFBSTt3QkFDckIsUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLGtCQUFrQixFQUFFLEtBQUs7d0JBQ3pCLFlBQVksRUFBRSxFQUFFO3dCQUNoQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsTUFBTSxFQUFFLCtCQUErQjtnQ0FDdkMsVUFBVSxFQUFFLENBQUM7Z0NBQ2IsWUFBWSxFQUFFLEVBQUU7NkJBQ2pCO3lCQUNGO3dCQUNELE9BQU8sRUFBRSxDQUFDO3dCQUNWLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixVQUFVLEVBQUU7NEJBQ1YsWUFBWSxFQUFFLHFCQUFxQjs0QkFDbkMsVUFBVSxFQUFFLHNDQUFzQzs0QkFDbEQsYUFBYSxFQUFFLE9BQU87NEJBQ3RCLDJCQUEyQixFQUFFLE9BQU87eUJBQ3JDO3dCQUNELGFBQWEsRUFBRTs0QkFDYixRQUFRLEVBQUUseUlBQXlJOzRCQUNuSixVQUFVLEVBQUU7Z0NBQ1Y7b0NBQ0UsTUFBTSxFQUFFLEdBQUc7b0NBQ1gsUUFBUSxFQUFFLHlJQUF5STtpQ0FDcEo7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxHQUFHO3dCQUNYLFdBQVcsRUFBRSxTQUFTO3FCQUN2QjtvQkFDRCxXQUFXLEVBQUUsc0NBQXNDO29CQUNuRCxPQUFPLEVBQUUsS0FBSztpQkFDZjtnQkFDRCx1QkFBdUIsRUFBRTtvQkFDdkIsSUFBSSxFQUFF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QUFjLEVBQUUsaUJBQWlCO29DQUNqQyxpQkFBaUIsRUFBRSxlQUFlO2lDQUNuQzs2QkFDRjt5QkFDRjt3QkFDRCxXQUFXLEVBQUUsRUFBRTt3QkFDZixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsZUFBZSxFQUFFLEtBQUs7cUJBQ3ZCO2lCQUNGO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2Q7U0FDRixDQUFDO0lBR0osQ0FBQztDQUdGO0FBektELDJCQXlLQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3REYXRhIHtcblxuICB0ZXN0SW5wdXREYXRhOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXN0SW5wdXREYXRhID0ge1xuICAgICAgXCJubHBFbmdpbmVSZXNwb25zZVwiOiB7XG4gICAgICAgIFwidmVuZG9yUmVzcG9uc2VcIjoge1xuICAgICAgICAgIFwiaWRcIjogXCJkYWZmMjdiNC0yMDlhLTRlMmYtYmM0ZS01ODQxZDVlYWY3MGVcIixcbiAgICAgICAgICBcInRpbWVzdGFtcFwiOiAxNTM2OTA2MjkxMzgxLFxuICAgICAgICAgIFwibGFuZ1wiOiBcImVuXCIsXG4gICAgICAgICAgXCJyZXN1bHRcIjoge1xuICAgICAgICAgICAgXCJyZXNvbHZlZFF1ZXJ5XCI6IFwiaGlcIixcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiaW5wdXQud2VsY29tZVwiLFxuICAgICAgICAgICAgXCJhY3Rpb25JbmNvbXBsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IHt9LFxuICAgICAgICAgICAgXCJjb250ZXh0c1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJkZWZhdWx0d2VsY29tZWludGVudC1mb2xsb3d1cFwiLFxuICAgICAgICAgICAgICAgIFwibGlmZXNwYW5cIjogMixcbiAgICAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIjoge31cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwic2NvcmVcIjogMSxcbiAgICAgICAgICAgIFwic291cmNlXCI6IFwiYWdlbnRcIixcbiAgICAgICAgICAgIFwibWV0YWRhdGFcIjoge1xuICAgICAgICAgICAgICBcImludGVudE5hbWVcIjogXCJEZWZhdWx0IFdlbGNvbWUgUFNFXCIsXG4gICAgICAgICAgICAgIFwiaW50ZW50SWRcIjogXCJiMDcxMGQyZi1jMzhmLTQwYjgtOTlmNi1hMzIxYzc2M2QxMmVcIixcbiAgICAgICAgICAgICAgXCJ3ZWJob29rVXNlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgIFwid2ViaG9va0ZvclNsb3RGaWxsaW5nVXNlZFwiOiBcImZhbHNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImZ1bGZpbGxtZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJzcGVlY2hcIjogXCJIaSEgV2VsY29tZSB0byB0aGUgUFNFIHZpcnR1YWwgYXNzaXN0YW50LiBJJ3ZlIG1hdGNoZWQgYW4gYWNjb3VudCB0byB5b3VyIHBob25lIG51bWJlci4gRm9yIHNlY3VyaXR5LCB3aGF0IGlzIHlvdXIgNCBkaWdpdCBhY2NvdW50IFBJTj9cIixcbiAgICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgXCJzcGVlY2hcIjogXCJIaSEgV2VsY29tZSB0byB0aGUgUFNFIHZpcnR1YWwgYXNzaXN0YW50LiBJJ3ZlIG1hdGNoZWQgYW4gYWNjb3VudCB0byB5b3VyIHBob25lIG51bWJlci4gRm9yIHNlY3VyaXR5LCB3aGF0IGlzIHlvdXIgNCBkaWdpdCBhY2NvdW50IFBJTj9cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdGF0dXNcIjoge1xuICAgICAgICAgICAgXCJjb2RlXCI6IDIwMCxcbiAgICAgICAgICAgIFwiZXJyb3JUeXBlXCI6IFwic3VjY2Vzc1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlc3Npb25JZFwiOiBcIjE2Yzc1MDFhLWU2MjgtNDEzYS04ZDY4LTI0ZmY3NmU5ODlkZVwiLFxuICAgICAgICAgIFwiZXJyb3JcIjogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgXCJkaWFsb2dTdGVwSW5mb3JtYXRpb25cIjoge1xuICAgICAgICAgIFwiaWRcIjogXCJiMDcxMGQyZi1jMzhmLTQwYjgtOTlmNi1hMzIxYzc2M2QxMmVcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJEZWZhdWx0IFdlbGNvbWUgUFNFXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0XCI6IHt9LFxuICAgICAgICBcIm5scEVuZ2luZVR5cGVcIjogXCJESUFMT0dGTE9XXCJcbiAgICAgIH0sXG4gICAgICBcImludGVyYWN0UmVzcG9uc2VcIjoge1xuICAgICAgICBcImZsb3dJbmZvcm1hdGlvblwiOiB7XG4gICAgICAgICAgXCJpZFwiOiBcIjI1NDFhZmMzOTdjYi0yODZkZWM1MTkzNzk3YjNjLWFmYTNcIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJVdGlsaXR5SW5jX1BTRV9XZWxjb21lMVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZWxlbWVudFJlc3BvbnNlXCI6IHtcbiAgICAgICAgICBcInBhZ2VcIjoge1xuICAgICAgICAgICAgXCJwYWdlTmF2aWdhdGlvblwiOiB7XG4gICAgICAgICAgICAgIFwibmF2aWdhdGlvblRpdGxlXCI6IFwiUElOIFZlcmlmaWNhdGlvblwiLFxuICAgICAgICAgICAgICBcInBhZ2VSZWZlcmVuY2VOYW1lXCI6IFwiUElOIFZlcmlmaWNhdGlvblwiLFxuICAgICAgICAgICAgICBcIm5hdmlnYXRpb25SaWdodFwiOiB7XG4gICAgICAgICAgICAgICAgXCJidXR0b25TdGF0ZVwiOiBcIk5PUk1BTFwiLFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uVmlzaWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uQWN0aW9uXCI6IFwiQ09OVElOVUVfRkxPV1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwibmF2aWdhdGlvbkxlZnRcIjoge1xuICAgICAgICAgICAgICAgIFwiYnV0dG9uU3RhdGVcIjogXCJOT1JNQUxcIixcbiAgICAgICAgICAgICAgICBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcImJ1dHRvbkxhYmVsXCI6IFwiQlROX0JBQ0tcIixcbiAgICAgICAgICAgICAgICBcImJ1dHRvbkFjdGlvblwiOiBcImxvY2FsOi8vbmF2aWdhdGlvblR5cGU/dHlwZT1CQUNLX1RPX0NPVkVSX0FQUFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VDb250ZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJjb250ZW50SGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwiNWZjNDYxY2ViYzVhLTMwODA1ZTY3YTM2M2NmNmYtZmZiZlwiLFxuICAgICAgICAgICAgICAgIFwiaW5uZXJIdG1sXCI6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjb250ZW50U2VjdGlvbnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJmOGRhMjc1ZDI3OGQtODRhMGNmZGEwNzA0ZWJlMi1lZWI0XCIsXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25IZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZjhkYTI3NWQyNzhkLTg0YTBjZmRhMDcwNGViZTItZWViNFwiLFxuICAgICAgICAgICAgICAgICAgICBcImlubmVySHRtbFwiOiBcIjxwPkhpISBXZWxjb21lIHRvIHRoZSBQU0UgdmlydHVhbCBhc3Npc3RhbnQuIEkndmUgbWF0Y2hlZCBhbiBhY2NvdW50IHRvIHlvdXIgcGhvbmUgbnVtYmVyLjwvcD5cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbkxhYmVsXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGlvblR5cGVcIjogXCJTSU5HTEVcIixcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbk51bWJlck9mQ29sdW1uc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uQ2hvaWNlc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIHt9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uRm9vdGVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImY4ZGEyNzVkMjc4ZC04NGEwY2ZkYTA3MDRlYmUyLWVlYjRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbm5lckh0bWxcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwicmVmZXJlbmNlTmFtZVwiOiBcIlBhcmFncmFwaFwiLFxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcIlBBUkFHUkFQSFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImlkXCI6IFwiYmU3NWU1OTgzOGQ4LWIxNzBlYTMwOTkyNTg1YmUtM2UyZlwiLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uSGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImJlNzVlNTk4MzhkOC1iMTcwZWEzMDk5MjU4NWJlLTNlMmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbm5lckh0bWxcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbkxhYmVsXCI6IFwiRm9yIHNlY3VyaXR5LCB3aGF0IGlzIHlvdXIgNCBkaWdpdCBhY2NvdW50IFBJTj9cIixcbiAgICAgICAgICAgICAgICAgIFwic2VsZWN0aW9uVHlwZVwiOiBcIlNJTkdMRVwiLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uTnVtYmVyT2ZDb2x1bW5zXCI6IDAsXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25DaG9pY2VzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJiZTc1ZTU5ODM4ZDgtYjE3MGVhMzA5OTI1ODViZS0zZTJmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJyZWZlcmVuY2VOYW1lXCI6IFwiTnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0SW5wdXRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImJlNzVlNTk4MzhkOC1iMTcwZWEzMDk5MjU4NWJlLTNlMmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uVmlzaWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXhDaGFyYWN0ZXJzXCI6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyT2ZMaW5lc1wiOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZUhvbGRlclRleHRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dElucHV0Rm9ybWF0XCI6IFwiQ1VSUkVOQ1lcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dE1hc2tcIjogXCIjIyMjIyNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXNNYW5kYXRvcnlcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25Gb290ZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiYmU3NWU1OTgzOGQ4LWIxNzBlYTMwOTkyNTg1YmUtM2UyZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImlubmVySHRtbFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCJyZWZlcmVuY2VOYW1lXCI6IFwiTnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiUVVFU1RJT05fSU5QVVRfRUxFTUVOVFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImNvbnRlbnRGb290ZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCI1ZmM0NjFjZWJjNWEtMzA4MDVlNjdhMzYzY2Y2Zi1mZmJmXCIsXG4gICAgICAgICAgICAgICAgXCJpbm5lckh0bWxcIjogXCJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImFsbG93VmVydGljYWxTY3JvbGxcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJhbGxvd0hvcml6b25hbFNjcm9sbFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJwYWdlVHlwZVwiOiBcIm11bHRpUXVlc3Rpb25cIixcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VNZW51XCI6IHtcbiAgICAgICAgICAgICAgXCJtZW51VmlzaWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJtZW51QnV0dG9uc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJidXR0b25TdGF0ZVwiOiBcIk5PUk1BTFwiLFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25WaXNpYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvbkxhYmVsXCI6IFwiQlROX01PUkVcIixcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uQWN0aW9uXCI6IFwibG9jYWw6Ly9DVVJSRU5UXCIsXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvbkltYWdlTmFtZVwiOiBcImljb25fbW9yZS5wbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGFnZU5vdGVzXCI6IFwiXCIsXG4gICAgICAgICAgICBcImxhbmd1YWdlXCI6IFwiZW5cIixcbiAgICAgICAgICAgIFwiY29udGFjdFVzUGFnZVwiOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0XCI6IHt9XG4gICAgICB9XG4gICAgfTtcblxuXG4gIH1cblxuXG59XG4iXX0=