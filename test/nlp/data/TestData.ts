export default class TestData {

  testInputData: any;

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
