'use strict';

const log = require('./logging').log('api.ai - ResponseHandler');
const Promise = require('bluebird');
const parser = require('htmlparser2');
const _ = require('underscore');
const stringify = require('json-stringify-safe');

function extractTextFromDom(domElements) {
  let textArray = [];

  if (typeof domElements === 'object') {
    domElements = [domElements];
  }

  _.each(domElements, function (domElement) {

    if (domElement.type === 'tag' && domElement.name === 'iframe') {

    } else {
      _.each(domElement.children, function (child) {
        if (child.type === 'text') {
          textArray.push(child.data.replace('&nbsp;', ' '));
        }
      });
    }

  });

  return textArray;

}

function createResponse(aiRequest, interactResponse) {

  if (log.debug) {
    log.debug('createResponse - with aiRequest %s', stringify(aiRequest));
  }

  let deferred = Promise.defer();

  if (!interactResponse || !interactResponse.data || !interactResponse.data.interaction || !interactResponse.data.interaction.page || !interactResponse.data.interaction.page.pageContent) {
    log.error('Invalid interact response for aiRequest\n %s', stringify(aiRequest));
    deferred.reject('Invalid interact response');
  } else {

    if (log.debug) {
      log.debug('createResponse - with interactResponse %s', stringify(interactResponse.data.interaction));
    }

    let textResponse = [];
    let quickRepliesResponse = {
      title: '',
      replies: [],
    };

    let botResponses = [];

    const pageContent = interactResponse.data.interaction.page.pageContent;

    _.each(pageContent.contentSections, function (section) {
      if (!section.sectionHeader) {
        return;
      }
      let html = section.sectionHeader.innerHtml;
      let domElements = parser.parseDOM(html);

      let sectionType;

      if (section.sectionChoices[0].textInput) {
        switch (section.sectionChoices[0].textInput.textInputFormat) {
          case 'TEXT':
            if (section.sectionChoices[0].textInput.numberOfLines === 1) {
              sectionType = 'TextInput';

              if (section.sectionChoices[0].referenceName.startsWith('__UI_')) {

                if ('PW' == section.sectionChoices[0].referenceName.split('__UI_')[1]) {
                  sectionType = 'PasswordInput';
                }

              }

              botResponses.push({
                type: sectionType,
                label: section.sectionLabel,
                additionalData: {
                  inputId: section.sectionChoices[0].textInput.id,
                },
              });

            } else {
              sectionType = 'MultiLineTextInput';
              botResponses.push({
                type: sectionType,
                label: section.sectionLabel,
              });
            }
            break;
          case 'DATE':
            sectionType = 'DateInput';
            botResponses.push({
              type: sectionType,
              label: section.sectionLabel,
              additionalData: {
                inputId: section.sectionChoices[0].textInput.id,
                dateFormat: section.sectionChoices[0].textInput.textMask,
                dateValue: section.sectionChoices[0].choiceValue,
              },
            });
            break;

          case 'CURRENCY':
            sectionType = 'NumberInput';
            botResponses.push({
              type: sectionType,
              label: section.sectionLabel,
            });
            break;

          case 'PASSWORD':
            sectionType = 'PasswordInput';
            botResponses.push({
              type: sectionType,
              label: section.sectionLabel,
            });
            break;
        }
      } else if (section.sectionChoices[0].uploadImageList) {
        sectionType = 'ImageUpload';
        botResponses.push({
          type: sectionType,
          label: section.sectionLabel,
        });

      } else if (section.sectionChoices[0].choiceSwitch) {
        sectionType = 'ChoiceSwitch';
        botResponses.push({
          type: sectionType,
          label: section.sectionLabel,
          yesChoice: section.sectionChoices[0].choiceSwitch.yesLabel,
          noChoice: section.sectionChoices[0].choiceSwitch.noLabel,
          paramId: section.id,
          yesValue: 'LBL_YES',
          noValue: 'LBL_NO',
        });
      } else if (section.sectionChoices[0].choiceOption) {
        sectionType = 'ChoiceOptions';

        let botResponse = {
          type: sectionType,
          label: section.sectionLabel,
          options: [],
        };

        _.each(section.sectionChoices, (option) => {

          botResponse.options.push({
            choiceValue: option.choiceValue,
            choiceLabel: option.choiceOption.buttonLabel,
            additionalData: option,
          });

        });

        botResponses.push(botResponse);

      } else if (section.sectionChoices[0].navigationButton) {

        sectionType = 'NavigationButton';

        if (section.referenceName.indexOf('__C_') > -1) {
          let action = section.referenceName.split('__C_')[1];
          if (log.debug) {
            log.debug('createResponse - found navigation button %s with action %s', stringify(section.sectionChoices[0]), action);
          }
          botResponses.push({
            type: sectionType,
            nextAction: action,
            buttonConfiguration: section.sectionChoices[0].navigationButton,
          });
        } else {
          if (log.debug) {
            log.debug('createResponse - navigation button has no configuration');
          }
        }


      } else {
        sectionType = 'Paragraph';

        if (section.referenceName.startsWith('__C_')) {
          // ignore for UI, just pass as bot action

          let action = section.referenceName.split('__C_')[1];
          if (log.debug) {
            log.debug('createResponse - found configuration paragraph with action %s', action);
          }
          botResponses.push({
            type: 'Configuration',
            config: {
              nextAction: action,
              forDialog: aiRequest.result.action,
              text: extractTextFromDom(domElements),
            },
          });

        } else {

          // validate subType - Image - Video
          let subElements = [];

          if (section.displayStyle === 'BulletedList' || section.displayStyle === 'NumberedList' || section.displayStyle === 'Paragraphs' || section.displayStyle === 'TableRows') {

            let collectionDisplay = {
              type: 'CollectionDisplay',
              items: [],
            };

            _.each(section.sectionChoices, (item) => {
              collectionDisplay.items.push(item.collectionItem);
            });

            subElements.push(collectionDisplay);

          } else {
            _.each(domElements, function (domElement) {

              if (domElement.type === 'tag' && domElement.name === 'iframe') {
                subElements.push({
                  type: 'IFrame',
                  attributes: domElement.attribs,
                });
              } else {
                _.each(domElement.children, function (child) {

                  if (child.type === 'text') {
                    subElements.push({
                      type: 'Text',
                      text: child.data.replace('&nbsp;', ' '),
                    });
                  } else if (child.type === 'tag' && child.name === 'img') {
                    subElements.push({
                      type: 'Image',
                      src: child.attribs.src,
                    });
                  }
                });
              }

            });
          }

          botResponses.push({
            type: sectionType,
            elements: subElements,
          });

        }
      }

      if (log.debug) {
        log.debug('Section Type %s', sectionType);
      }

      if (!section.sectionChoices[0].choiceOption) {
        if (log.debug) {
          log.debug('Found Paragraph element. Going to create a message response');
        }

        _.each(domElements, function (domElement) {
          _.each(domElement.children, function (child) {
            if (child.type === 'text') {
              textResponse.push(child.data);
            }
          });
        });
      } else if (section.sectionChoices[0].choiceOption) {
        if (log.debug) {
          log.debug('Found Choices element. Going to create a quickReplies response.');
        }

        quickRepliesResponse.title = section.sectionLabel;

        _.each(section.sectionChoices, function (choice) {
          if (choice.choiceOption.buttonVisible) {
            quickRepliesResponse.replies.push(choice.choiceOption.buttonLabel);
          }
        });
      }
    });


    if (interactResponse.data.interaction.page.pageMenu) {
      if (log.debug) {
        log.debug('Found %s page menu items. Going to add config items', interactResponse.data.interaction.page.pageMenu.length);
      }

      let menuButtons = interactResponse.data.interaction.page.pageMenu.menuButtons;

      let item = {
        type: 'ContactUs',
        config: {
          forDialog: aiRequest.result.action,
          channels: [],
        },
      };

      // extract what channels
      menuButtons.map((button) => {
        switch (button.buttonLabel) {
          case 'LBL_CHAT':
            item.config.channels.push({
              type: 'chat',
              visible: button.buttonVisible
            });
            break;
          case 'LBL_CAL':
            item.config.channels.push({
              type: 'call',
              visible: button.buttonVisible
            });
            break;
          case 'LBL_CALLRETURN':
            item.config.channels.push({
              type: 'callBack',
              visible: button.buttonVisible
            });
            break;
          case 'LBL_MAILTO':
            item.config.channels.push({
              type: 'mail',
              visible: button.buttonVisible
            });
            break;
        }
      });


      let html = interactResponse.data.interaction.page.pageContent.contentHeader.innerHtml;
      let domElements = parser.parseDOM(html);

      if (domElements.length === 3) {
        item.config.callNowNumber = extractTextFromDom(domElements[0])[0];
        item.config.serviceCode = extractTextFromDom(domElements[1])[0];
        item.config.emailTo = extractTextFromDom(domElements[2])[0];
      }

      if (log.debug) {
        log.debug('Adding new contact us item', item);
      }

      botResponses.push(item);

    }

    let responses = [];
    let speech = '';

    if (textResponse.length > 0) {
      speech = textResponse.join(' ');
      responses.push({
        type: 0,
        speech: textResponse.join(' '),
        displayText: textResponse.join(' '),
      });
    }

    if (quickRepliesResponse) {
      responses.push({
        type: 2,
        title: quickRepliesResponse.title,
        replies: quickRepliesResponse.replies,
      });
    }

    // TODO for now only paragraph statements are used.

    if (quickRepliesResponse.replies.length > 0) {
      speech += ' ' + quickRepliesResponse.title + ': ' + quickRepliesResponse.replies.join(', ');
    }

    let finalResponse = {
      speech: speech,
      displayText: speech,
      messages: responses,
      data: {
        web: responses,
        jacadaBot: botResponses,
      },
      source: 'InteractAI',
    };

    if (log.debug) {
      log.debug('Final Response: \n%s', JSON.stringify(finalResponse));
    }

    deferred.resolve(finalResponse);
  }

  return deferred.promise;
}

function createResponse2(aiResponse) {

  let deferred = Promise.defer();

  let botResponses = [];

  const page = aiResponse.result.fulfillment.data.page;

  let sectionType;

  _.each(page.questions, (question) => {

    const elementClass = question.original.class;
    switch (elementClass) {
      case 'com.jacada.is.as.domain.elements.ParagraphFormElement':
        const domText = question.original.text;
        let domElements = parser.parseDOM(domText);

        sectionType = 'Paragraph';

        let subElements = [];

        _.each(domElements, function (domElement) {

          if (domElement.type === 'tag' && domElement.name === 'iframe') {
            subElements.push({
              type: 'IFrame',
              attributes: domElement.attribs,
            });
          } else {
            _.each(domElement.children, function (child) {

              if (child.type === 'text') {
                subElements.push({
                  type: 'Text',
                  text: child.data,
                });
              } else if (child.type === 'tag' && child.name === 'img') {
                subElements.push({
                  type: 'Image',
                  src: child.attribs.src,
                });
              }
            });
          }

        });

        botResponses.push({
          type: sectionType,
          elements: subElements,
        });

        break;

      case 'com.jacada.is.as.domain.elements.QuestionYesNoElement':

        sectionType = 'ChoiceSwitch';

        botResponses.push({
          type: sectionType,
          label: question.original.userInputPrompt,
          yesChoice: question.original.yesLabel,
          noChoice: question.original.noLabel,
        });

        break;

      case 'com.jacada.is.as.domain.elements.QuestionChoicesElement':

        sectionType = 'ChoiceOptions';

        let botResponse = {
          type: sectionType,
          label: question.original.userInputPrompt,
          options: [],
        };

        _.each(question.choices, (option) => {
          botResponse.options.push({
            choiceValue: option.buttonText,
            choiceLabel: option.buttonText,
          });
        });

        botResponses.push(botResponse);

        break;

      case 'com.jacada.is.as.domain.elements.QuestionInputElement':

        const dataType = question.original.dataType;

        switch (dataType) {
          case 'TEXT':
            sectionType = 'TextInput';
            botResponses.push({
              type: sectionType,
              label: question.original.userInputPrompt,
            });

            break;

          case 'CURRENCY':
            sectionType = 'NumberInput';
            botResponses.push({
              type: sectionType,
              label: question.original.userInputPrompt,
            });

            break;

          case 'DATE':
            sectionType = 'DateInput';
            botResponses.push({
              type: sectionType,
              label: question.original.userInputPrompt,
            });

            break;

          case 'PASSWORD':
            sectionType = 'PasswordInput';
            botResponses.push({
              type: sectionType,
              label: question.original.userInputPrompt,
            });

            break;

          default:

            log.warn('Un-Recognized data type "%s" for question input element', dataType);
            break;
        }

        break;

      case 'com.jacada.is.as.domain.elements.QuestionUploadPhotosElement':
        sectionType = 'ImageUpload';
        botResponses.push({
          type: sectionType,
          label: question.original.userInputPrompt,
        });

        break;

      default:
        log.warn('Unknown element class %s. Going to skip it.', elementClass);
        break;
    }
  });

  deferred.resolve(botResponses);

  return deferred.promise;

}

module.exports = {
  createResponse: createResponse,
  createResponse2: createResponse2,
};
