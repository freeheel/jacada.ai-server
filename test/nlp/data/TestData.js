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
        this.testChoicesData = {
            "interactResponse": {
                "flowInformation": {
                    "id": "2541afc397cb-286dec5193797b3c-afa3",
                    "name": "UtilityInc_PSE_Welcome1"
                },
                "elementResponse": {
                    "page": {
                        "pageNavigation": {
                            "navigationTitle": "Main Menu",
                            "pageReferenceName": "Main Menu",
                            "navigationRight": { "buttonState": "NORMAL", "buttonVisible": true, "buttonAction": "CONTINUE_FLOW" },
                            "navigationLeft": {
                                "buttonState": "NORMAL",
                                "buttonVisible": true,
                                "buttonLabel": "BTN_BACK",
                                "buttonAction": "server://navigationType?type=PREVIOUS&shouldSendFormData=true"
                            }
                        },
                        "pageContent": {
                            "contentHeader": { "id": "d4ed6eac9d93-09ab843ef9ba2e78-50f1", "innerHtml": "" },
                            "contentSections": [{
                                    "id": "e916e040c13c-dcf66224c063a81b-f44f",
                                    "sectionHeader": { "id": "e916e040c13c-dcf66224c063a81b-f44f", "innerHtml": "" },
                                    "sectionLabel": "Thanks! Here are some topics I can help with, or you can type your question in the box below.",
                                    "selectionType": "SINGLE",
                                    "sectionNumberOfColumns": 0,
                                    "sectionChoices": [{
                                            "id": "e916e040c13c-dcf66224c063a81b-f44f",
                                            "choiceValue": "0",
                                            "referenceName": "Choices",
                                            "choiceOption": {
                                                "id": "77639ee670bc-16570a32ba87a97d-8d2b",
                                                "buttonVisible": true,
                                                "buttonLabel": "Explain My Bill",
                                                "buttonImageName": ""
                                            }
                                        }, {
                                            "id": "e916e040c13c-dcf66224c063a81b-f44f",
                                            "choiceValue": "0",
                                            "referenceName": "Choices",
                                            "choiceOption": {
                                                "id": "dc1e60a69870-a1a10139dcd8681a-ab76",
                                                "buttonVisible": true,
                                                "buttonLabel": "High Bill",
                                                "buttonImageName": ""
                                            }
                                        }, {
                                            "id": "e916e040c13c-dcf66224c063a81b-f44f",
                                            "choiceValue": "0",
                                            "referenceName": "Choices",
                                            "choiceOption": {
                                                "id": "bbc6f21483e3-51f7007a02a6ae66-07b0",
                                                "buttonVisible": true,
                                                "buttonLabel": "Learn About FlatBill",
                                                "buttonImageName": ""
                                            }
                                        }],
                                    "sectionFooter": { "id": "e916e040c13c-dcf66224c063a81b-f44f", "innerHtml": "" },
                                    "referenceName": "Choices",
                                    "elementType": "QUESTION_CHOICES_ELEMENT"
                                }],
                            "contentFooter": { "id": "d4ed6eac9d93-09ab843ef9ba2e78-50f1", "innerHtml": "" },
                            "allowVerticalScroll": true,
                            "allowHorizonalScroll": false,
                            "pageType": "multiQuestion",
                            "time": 0
                        },
                        "pageMenu": {
                            "menuVisible": false,
                            "menuButtons": [{
                                    "buttonState": "NORMAL",
                                    "buttonVisible": true,
                                    "buttonLabel": "BTN_MORE",
                                    "buttonAction": "local://CURRENT",
                                    "buttonImageName": "icon_more.png"
                                }]
                        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXN0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLFFBQVE7SUFLM0I7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLG1CQUFtQixFQUFFO2dCQUNuQixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLHNDQUFzQztvQkFDNUMsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRTt3QkFDUixlQUFlLEVBQUUsSUFBSTt3QkFDckIsUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLGtCQUFrQixFQUFFLEtBQUs7d0JBQ3pCLFlBQVksRUFBRSxFQUFFO3dCQUNoQixVQUFVLEVBQUU7NEJBQ1Y7Z0NBQ0UsTUFBTSxFQUFFLCtCQUErQjtnQ0FDdkMsVUFBVSxFQUFFLENBQUM7Z0NBQ2IsWUFBWSxFQUFFLEVBQUU7NkJBQ2pCO3lCQUNGO3dCQUNELE9BQU8sRUFBRSxDQUFDO3dCQUNWLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixVQUFVLEVBQUU7NEJBQ1YsWUFBWSxFQUFFLHFCQUFxQjs0QkFDbkMsVUFBVSxFQUFFLHNDQUFzQzs0QkFDbEQsYUFBYSxFQUFFLE9BQU87NEJBQ3RCLDJCQUEyQixFQUFFLE9BQU87eUJBQ3JDO3dCQUNELGFBQWEsRUFBRTs0QkFDYixRQUFRLEVBQUUseUlBQXlJOzRCQUNuSixVQUFVLEVBQUU7Z0NBQ1Y7b0NBQ0UsTUFBTSxFQUFFLEdBQUc7b0NBQ1gsUUFBUSxFQUFFLHlJQUF5STtpQ0FDcEo7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsUUFBUSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxHQUFHO3dCQUNYLFdBQVcsRUFBRSxTQUFTO3FCQUN2QjtvQkFDRCxXQUFXLEVBQUUsc0NBQXNDO29CQUNuRCxPQUFPLEVBQUUsS0FBSztpQkFDZjtnQkFDRCx1QkFBdUIsRUFBRTtvQkFDdkIsSUFBSSxFQUFF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LENBQUM7b0NBQ2QsYUFBYSxFQUFFLFFBQVE7b0NBQ3ZCLGVBQWUsRUFBRSxJQUFJO29DQUNyQixhQUFhLEVBQUUsVUFBVTtvQ0FDekIsY0FBYyxFQUFFLGlCQUFpQjtvQ0FDakMsaUJBQWlCLEVBQUUsZUFBZTtpQ0FDbkMsQ0FBQzt5QkFDSDt3QkFDRCxVQUFVLEVBQUUsSUFBSTt3QkFDaEIsZUFBZSxFQUFFLEtBQUs7cUJBQ3ZCO2lCQUNGO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2Q7U0FDRixDQUFDO0lBRUosQ0FBQztDQUdGO0FBL1BELDJCQStQQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3REYXRhIHtcblxuICB0ZXN0SW5wdXREYXRhOiBhbnk7XG4gIHRlc3RDaG9pY2VzRGF0YTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVzdElucHV0RGF0YSA9IHtcbiAgICAgIFwibmxwRW5naW5lUmVzcG9uc2VcIjoge1xuICAgICAgICBcInZlbmRvclJlc3BvbnNlXCI6IHtcbiAgICAgICAgICBcImlkXCI6IFwiZGFmZjI3YjQtMjA5YS00ZTJmLWJjNGUtNTg0MWQ1ZWFmNzBlXCIsXG4gICAgICAgICAgXCJ0aW1lc3RhbXBcIjogMTUzNjkwNjI5MTM4MSxcbiAgICAgICAgICBcImxhbmdcIjogXCJlblwiLFxuICAgICAgICAgIFwicmVzdWx0XCI6IHtcbiAgICAgICAgICAgIFwicmVzb2x2ZWRRdWVyeVwiOiBcImhpXCIsXG4gICAgICAgICAgICBcImFjdGlvblwiOiBcImlucHV0LndlbGNvbWVcIixcbiAgICAgICAgICAgIFwiYWN0aW9uSW5jb21wbGV0ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiOiB7fSxcbiAgICAgICAgICAgIFwiY29udGV4dHNcIjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZGVmYXVsdHdlbGNvbWVpbnRlbnQtZm9sbG93dXBcIixcbiAgICAgICAgICAgICAgICBcImxpZmVzcGFuXCI6IDIsXG4gICAgICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IHt9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcInNjb3JlXCI6IDEsXG4gICAgICAgICAgICBcInNvdXJjZVwiOiBcImFnZW50XCIsXG4gICAgICAgICAgICBcIm1ldGFkYXRhXCI6IHtcbiAgICAgICAgICAgICAgXCJpbnRlbnROYW1lXCI6IFwiRGVmYXVsdCBXZWxjb21lIFBTRVwiLFxuICAgICAgICAgICAgICBcImludGVudElkXCI6IFwiYjA3MTBkMmYtYzM4Zi00MGI4LTk5ZjYtYTMyMWM3NjNkMTJlXCIsXG4gICAgICAgICAgICAgIFwid2ViaG9va1VzZWRcIjogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICBcIndlYmhvb2tGb3JTbG90RmlsbGluZ1VzZWRcIjogXCJmYWxzZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJmdWxmaWxsbWVudFwiOiB7XG4gICAgICAgICAgICAgIFwic3BlZWNoXCI6IFwiSGkhIFdlbGNvbWUgdG8gdGhlIFBTRSB2aXJ0dWFsIGFzc2lzdGFudC4gSSd2ZSBtYXRjaGVkIGFuIGFjY291bnQgdG8geW91ciBwaG9uZSBudW1iZXIuIEZvciBzZWN1cml0eSwgd2hhdCBpcyB5b3VyIDQgZGlnaXQgYWNjb3VudCBQSU4/XCIsXG4gICAgICAgICAgICAgIFwibWVzc2FnZXNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIFwic3BlZWNoXCI6IFwiSGkhIFdlbGNvbWUgdG8gdGhlIFBTRSB2aXJ0dWFsIGFzc2lzdGFudC4gSSd2ZSBtYXRjaGVkIGFuIGFjY291bnQgdG8geW91ciBwaG9uZSBudW1iZXIuIEZvciBzZWN1cml0eSwgd2hhdCBpcyB5b3VyIDQgZGlnaXQgYWNjb3VudCBQSU4/XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3RhdHVzXCI6IHtcbiAgICAgICAgICAgIFwiY29kZVwiOiAyMDAsXG4gICAgICAgICAgICBcImVycm9yVHlwZVwiOiBcInN1Y2Nlc3NcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXNzaW9uSWRcIjogXCIxNmM3NTAxYS1lNjI4LTQxM2EtOGQ2OC0yNGZmNzZlOTg5ZGVcIixcbiAgICAgICAgICBcImVycm9yXCI6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGlhbG9nU3RlcEluZm9ybWF0aW9uXCI6IHtcbiAgICAgICAgICBcImlkXCI6IFwiYjA3MTBkMmYtYzM4Zi00MGI4LTk5ZjYtYTMyMWM3NjNkMTJlXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGVmYXVsdCBXZWxjb21lIFBTRVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dFwiOiB7fSxcbiAgICAgICAgXCJubHBFbmdpbmVUeXBlXCI6IFwiRElBTE9HRkxPV1wiXG4gICAgICB9LFxuICAgICAgXCJpbnRlcmFjdFJlc3BvbnNlXCI6IHtcbiAgICAgICAgXCJmbG93SW5mb3JtYXRpb25cIjoge1xuICAgICAgICAgIFwiaWRcIjogXCIyNTQxYWZjMzk3Y2ItMjg2ZGVjNTE5Mzc5N2IzYy1hZmEzXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiVXRpbGl0eUluY19QU0VfV2VsY29tZTFcIlxuICAgICAgICB9LFxuICAgICAgICBcImVsZW1lbnRSZXNwb25zZVwiOiB7XG4gICAgICAgICAgXCJwYWdlXCI6IHtcbiAgICAgICAgICAgIFwicGFnZU5hdmlnYXRpb25cIjoge1xuICAgICAgICAgICAgICBcIm5hdmlnYXRpb25UaXRsZVwiOiBcIlBJTiBWZXJpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgXCJwYWdlUmVmZXJlbmNlTmFtZVwiOiBcIlBJTiBWZXJpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgXCJuYXZpZ2F0aW9uUmlnaHRcIjoge1xuICAgICAgICAgICAgICAgIFwiYnV0dG9uU3RhdGVcIjogXCJOT1JNQUxcIixcbiAgICAgICAgICAgICAgICBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcImJ1dHRvbkFjdGlvblwiOiBcIkNPTlRJTlVFX0ZMT1dcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcIm5hdmlnYXRpb25MZWZ0XCI6IHtcbiAgICAgICAgICAgICAgICBcImJ1dHRvblN0YXRlXCI6IFwiTk9STUFMXCIsXG4gICAgICAgICAgICAgICAgXCJidXR0b25WaXNpYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJidXR0b25MYWJlbFwiOiBcIkJUTl9CQUNLXCIsXG4gICAgICAgICAgICAgICAgXCJidXR0b25BY3Rpb25cIjogXCJsb2NhbDovL25hdmlnYXRpb25UeXBlP3R5cGU9QkFDS19UT19DT1ZFUl9BUFBcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwYWdlQ29udGVudFwiOiB7XG4gICAgICAgICAgICAgIFwiY29udGVudEhlYWRlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIjVmYzQ2MWNlYmM1YS0zMDgwNWU2N2EzNjNjZjZmLWZmYmZcIixcbiAgICAgICAgICAgICAgICBcImlubmVySHRtbFwiOiBcIlwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiY29udGVudFNlY3Rpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZjhkYTI3NWQyNzhkLTg0YTBjZmRhMDcwNGViZTItZWViNFwiLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uSGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImY4ZGEyNzVkMjc4ZC04NGEwY2ZkYTA3MDRlYmUyLWVlYjRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbm5lckh0bWxcIjogXCI8cD5IaSEgV2VsY29tZSB0byB0aGUgUFNFIHZpcnR1YWwgYXNzaXN0YW50LiBJJ3ZlIG1hdGNoZWQgYW4gYWNjb3VudCB0byB5b3VyIHBob25lIG51bWJlci48L3A+XCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25MYWJlbFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgXCJzZWxlY3Rpb25UeXBlXCI6IFwiU0lOR0xFXCIsXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25OdW1iZXJPZkNvbHVtbnNcIjogMCxcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbkNob2ljZXNcIjogW1xuICAgICAgICAgICAgICAgICAgICB7fVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbkZvb3RlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJmOGRhMjc1ZDI3OGQtODRhMGNmZGEwNzA0ZWJlMi1lZWI0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5uZXJIdG1sXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInJlZmVyZW5jZU5hbWVcIjogXCJQYXJhZ3JhcGhcIixcbiAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJQQVJBR1JBUEhcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImJlNzVlNTk4MzhkOC1iMTcwZWEzMDk5MjU4NWJlLTNlMmZcIixcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbkhlYWRlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJiZTc1ZTU5ODM4ZDgtYjE3MGVhMzA5OTI1ODViZS0zZTJmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5uZXJIdG1sXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcInNlY3Rpb25MYWJlbFwiOiBcIkZvciBzZWN1cml0eSwgd2hhdCBpcyB5b3VyIDQgZGlnaXQgYWNjb3VudCBQSU4/XCIsXG4gICAgICAgICAgICAgICAgICBcInNlbGVjdGlvblR5cGVcIjogXCJTSU5HTEVcIixcbiAgICAgICAgICAgICAgICAgIFwic2VjdGlvbk51bWJlck9mQ29sdW1uc1wiOiAwLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uQ2hvaWNlc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiYmU3NWU1OTgzOGQ4LWIxNzBlYTMwOTkyNTg1YmUtM2UyZlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicmVmZXJlbmNlTmFtZVwiOiBcIk51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwidGV4dElucHV0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJiZTc1ZTU5ODM4ZDgtYjE3MGVhMzA5OTI1ODViZS0zZTJmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF4Q2hhcmFjdGVyc1wiOiAxNTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlck9mTGluZXNcIjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VIb2xkZXJUZXh0XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRJbnB1dEZvcm1hdFwiOiBcIkNVUlJFTkNZXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRNYXNrXCI6IFwiIyMjIyMjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlzTWFuZGF0b3J5XCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgXCJzZWN0aW9uRm9vdGVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImJlNzVlNTk4MzhkOC1iMTcwZWEzMDk5MjU4NWJlLTNlMmZcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbm5lckh0bWxcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwicmVmZXJlbmNlTmFtZVwiOiBcIk51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcIlFVRVNUSU9OX0lOUFVUX0VMRU1FTlRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJjb250ZW50Rm9vdGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwiNWZjNDYxY2ViYzVhLTMwODA1ZTY3YTM2M2NmNmYtZmZiZlwiLFxuICAgICAgICAgICAgICAgIFwiaW5uZXJIdG1sXCI6IFwiXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJhbGxvd1ZlcnRpY2FsU2Nyb2xsXCI6IHRydWUsXG4gICAgICAgICAgICAgIFwiYWxsb3dIb3Jpem9uYWxTY3JvbGxcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwicGFnZVR5cGVcIjogXCJtdWx0aVF1ZXN0aW9uXCIsXG4gICAgICAgICAgICAgIFwidGltZVwiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwYWdlTWVudVwiOiB7XG4gICAgICAgICAgICAgIFwibWVudVZpc2libGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwibWVudUJ1dHRvbnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uU3RhdGVcIjogXCJOT1JNQUxcIixcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uVmlzaWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25MYWJlbFwiOiBcIkJUTl9NT1JFXCIsXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvbkFjdGlvblwiOiBcImxvY2FsOi8vQ1VSUkVOVFwiLFxuICAgICAgICAgICAgICAgICAgXCJidXR0b25JbWFnZU5hbWVcIjogXCJpY29uX21vcmUucG5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VOb3Rlc1wiOiBcIlwiLFxuICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcImVuXCIsXG4gICAgICAgICAgICBcImNvbnRhY3RVc1BhZ2VcIjogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dFwiOiB7fVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnRlc3RDaG9pY2VzRGF0YSA9IHtcbiAgICAgIFwiaW50ZXJhY3RSZXNwb25zZVwiOiB7XG4gICAgICAgIFwiZmxvd0luZm9ybWF0aW9uXCI6IHtcbiAgICAgICAgICBcImlkXCI6IFwiMjU0MWFmYzM5N2NiLTI4NmRlYzUxOTM3OTdiM2MtYWZhM1wiLFxuICAgICAgICAgIFwibmFtZVwiOiBcIlV0aWxpdHlJbmNfUFNFX1dlbGNvbWUxXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJlbGVtZW50UmVzcG9uc2VcIjoge1xuICAgICAgICAgIFwicGFnZVwiOiB7XG4gICAgICAgICAgICBcInBhZ2VOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgXCJuYXZpZ2F0aW9uVGl0bGVcIjogXCJNYWluIE1lbnVcIixcbiAgICAgICAgICAgICAgXCJwYWdlUmVmZXJlbmNlTmFtZVwiOiBcIk1haW4gTWVudVwiLFxuICAgICAgICAgICAgICBcIm5hdmlnYXRpb25SaWdodFwiOiB7XCJidXR0b25TdGF0ZVwiOiBcIk5PUk1BTFwiLCBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSwgXCJidXR0b25BY3Rpb25cIjogXCJDT05USU5VRV9GTE9XXCJ9LFxuICAgICAgICAgICAgICBcIm5hdmlnYXRpb25MZWZ0XCI6IHtcbiAgICAgICAgICAgICAgICBcImJ1dHRvblN0YXRlXCI6IFwiTk9STUFMXCIsXG4gICAgICAgICAgICAgICAgXCJidXR0b25WaXNpYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJidXR0b25MYWJlbFwiOiBcIkJUTl9CQUNLXCIsXG4gICAgICAgICAgICAgICAgXCJidXR0b25BY3Rpb25cIjogXCJzZXJ2ZXI6Ly9uYXZpZ2F0aW9uVHlwZT90eXBlPVBSRVZJT1VTJnNob3VsZFNlbmRGb3JtRGF0YT10cnVlXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGFnZUNvbnRlbnRcIjoge1xuICAgICAgICAgICAgICBcImNvbnRlbnRIZWFkZXJcIjoge1wiaWRcIjogXCJkNGVkNmVhYzlkOTMtMDlhYjg0M2VmOWJhMmU3OC01MGYxXCIsIFwiaW5uZXJIdG1sXCI6IFwiXCJ9LFxuICAgICAgICAgICAgICBcImNvbnRlbnRTZWN0aW9uc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJlOTE2ZTA0MGMxM2MtZGNmNjYyMjRjMDYzYTgxYi1mNDRmXCIsXG4gICAgICAgICAgICAgICAgXCJzZWN0aW9uSGVhZGVyXCI6IHtcImlkXCI6IFwiZTkxNmUwNDBjMTNjLWRjZjY2MjI0YzA2M2E4MWItZjQ0ZlwiLCBcImlubmVySHRtbFwiOiBcIlwifSxcbiAgICAgICAgICAgICAgICBcInNlY3Rpb25MYWJlbFwiOiBcIlRoYW5rcyEgSGVyZSBhcmUgc29tZSB0b3BpY3MgSSBjYW4gaGVscCB3aXRoLCBvciB5b3UgY2FuIHR5cGUgeW91ciBxdWVzdGlvbiBpbiB0aGUgYm94IGJlbG93LlwiLFxuICAgICAgICAgICAgICAgIFwic2VsZWN0aW9uVHlwZVwiOiBcIlNJTkdMRVwiLFxuICAgICAgICAgICAgICAgIFwic2VjdGlvbk51bWJlck9mQ29sdW1uc1wiOiAwLFxuICAgICAgICAgICAgICAgIFwic2VjdGlvbkNob2ljZXNcIjogW3tcbiAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJlOTE2ZTA0MGMxM2MtZGNmNjYyMjRjMDYzYTgxYi1mNDRmXCIsXG4gICAgICAgICAgICAgICAgICBcImNob2ljZVZhbHVlXCI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWZlcmVuY2VOYW1lXCI6IFwiQ2hvaWNlc1wiLFxuICAgICAgICAgICAgICAgICAgXCJjaG9pY2VPcHRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNzc2MzllZTY3MGJjLTE2NTcwYTMyYmE4N2E5N2QtOGQyYlwiLFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25MYWJlbFwiOiBcIkV4cGxhaW4gTXkgQmlsbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvbkltYWdlTmFtZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImU5MTZlMDQwYzEzYy1kY2Y2NjIyNGMwNjNhODFiLWY0NGZcIixcbiAgICAgICAgICAgICAgICAgIFwiY2hvaWNlVmFsdWVcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZmVyZW5jZU5hbWVcIjogXCJDaG9pY2VzXCIsXG4gICAgICAgICAgICAgICAgICBcImNob2ljZU9wdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJkYzFlNjBhNjk4NzAtYTFhMTAxMzlkY2Q4NjgxYS1hYjc2XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uVmlzaWJsZVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvbkxhYmVsXCI6IFwiSGlnaCBCaWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uSW1hZ2VOYW1lXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICBcImlkXCI6IFwiZTkxNmUwNDBjMTNjLWRjZjY2MjI0YzA2M2E4MWItZjQ0ZlwiLFxuICAgICAgICAgICAgICAgICAgXCJjaG9pY2VWYWx1ZVwiOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIFwicmVmZXJlbmNlTmFtZVwiOiBcIkNob2ljZXNcIixcbiAgICAgICAgICAgICAgICAgIFwiY2hvaWNlT3B0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcImJiYzZmMjE0ODNlMy01MWY3MDA3YTAyYTZhZTY2LTA3YjBcIixcbiAgICAgICAgICAgICAgICAgICAgXCJidXR0b25WaXNpYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uTGFiZWxcIjogXCJMZWFybiBBYm91dCBGbGF0QmlsbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImJ1dHRvbkltYWdlTmFtZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgXCJzZWN0aW9uRm9vdGVyXCI6IHtcImlkXCI6IFwiZTkxNmUwNDBjMTNjLWRjZjY2MjI0YzA2M2E4MWItZjQ0ZlwiLCBcImlubmVySHRtbFwiOiBcIlwifSxcbiAgICAgICAgICAgICAgICBcInJlZmVyZW5jZU5hbWVcIjogXCJDaG9pY2VzXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcIlFVRVNUSU9OX0NIT0lDRVNfRUxFTUVOVFwiXG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICBcImNvbnRlbnRGb290ZXJcIjoge1wiaWRcIjogXCJkNGVkNmVhYzlkOTMtMDlhYjg0M2VmOWJhMmU3OC01MGYxXCIsIFwiaW5uZXJIdG1sXCI6IFwiXCJ9LFxuICAgICAgICAgICAgICBcImFsbG93VmVydGljYWxTY3JvbGxcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJhbGxvd0hvcml6b25hbFNjcm9sbFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJwYWdlVHlwZVwiOiBcIm11bHRpUXVlc3Rpb25cIixcbiAgICAgICAgICAgICAgXCJ0aW1lXCI6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhZ2VNZW51XCI6IHtcbiAgICAgICAgICAgICAgXCJtZW51VmlzaWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgXCJtZW51QnV0dG9uc1wiOiBbe1xuICAgICAgICAgICAgICAgIFwiYnV0dG9uU3RhdGVcIjogXCJOT1JNQUxcIixcbiAgICAgICAgICAgICAgICBcImJ1dHRvblZpc2libGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcImJ1dHRvbkxhYmVsXCI6IFwiQlROX01PUkVcIixcbiAgICAgICAgICAgICAgICBcImJ1dHRvbkFjdGlvblwiOiBcImxvY2FsOi8vQ1VSUkVOVFwiLFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uSW1hZ2VOYW1lXCI6IFwiaWNvbl9tb3JlLnBuZ1wiXG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcImVuXCIsXG4gICAgICAgICAgICBcImNvbnRhY3RVc1BhZ2VcIjogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29udGV4dFwiOiB7fVxuICAgICAgfVxuICAgIH07XG5cbiAgfVxuXG5cbn1cbiJdfQ==