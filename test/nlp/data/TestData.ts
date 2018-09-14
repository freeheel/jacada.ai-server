export default class TestData {

  testInputData: any;
  testChoicesData: any;

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
              "navigationRight": {"buttonState": "NORMAL", "buttonVisible": true, "buttonAction": "CONTINUE_FLOW"},
              "navigationLeft": {
                "buttonState": "NORMAL",
                "buttonVisible": true,
                "buttonLabel": "BTN_BACK",
                "buttonAction": "server://navigationType?type=PREVIOUS&shouldSendFormData=true"
              }
            },
            "pageContent": {
              "contentHeader": {"id": "d4ed6eac9d93-09ab843ef9ba2e78-50f1", "innerHtml": ""},
              "contentSections": [{
                "id": "e916e040c13c-dcf66224c063a81b-f44f",
                "sectionHeader": {"id": "e916e040c13c-dcf66224c063a81b-f44f", "innerHtml": ""},
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
                "sectionFooter": {"id": "e916e040c13c-dcf66224c063a81b-f44f", "innerHtml": ""},
                "referenceName": "Choices",
                "elementType": "QUESTION_CHOICES_ELEMENT"
              }],
              "contentFooter": {"id": "d4ed6eac9d93-09ab843ef9ba2e78-50f1", "innerHtml": ""},
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
