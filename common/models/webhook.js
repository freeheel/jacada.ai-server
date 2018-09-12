'use strict';

const helper = require('../util/webhookhelper');
const apiResponseHandler = require('../util/ApiDotAiResponseHandler');
const log = require('../util/logging').log('webhook');
const pLog = require('../util/logging').performanceLog();
const stringify = require('json-stringify-safe');
const _ = require('underscore');
const apiai = require('apiai');
const async = require('async');
const PubNub = require('pubnub');
const uuidv4 = require('uuid/v4');

const sentimentHelper = require('../util/sentimentHelper');

let chatbotPubNub = new PubNub({
  publishKey: 'pub-c-7119ab56-ade7-484a-a600-2fc0b356766c',
  subscribeKey: 'sub-c-6e57d142-b262-11e7-af03-56d0cae65fed',
});

let humanAssistantPubNub = new PubNub({
  publishKey: 'pub-c-9ef8635f-8eae-4a07-adb8-515edd926442',
  subscribeKey: 'sub-c-2ebd149c-7e1c-11e5-9e96-02ee2ddab7fe',
  ssl: true,
});

// pub-c-7119ab56-ade7-484a-a600-2fc0b356766c
// sub-c-6e57d142-b262-11e7-af03-56d0cae65fed
// sec-c-YmEzOWQxNDctYzM1My00MjdjLTkyYWQtNDg2YjA2MDhhOTE0

const RdsServiceHelper = require('../util/RdsServiceHelper');

module.exports = function(Webhook) {

  Webhook.executeWebhook = function(requestData, headerConfig, cb) {
    if (log.debug) {
      log.debug('Message from executeWebhook \n%s', stringify(headerConfig));
    }

    let pStart = Date.now();

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;
    const headless = require('../util/headless');

    let interact;
    if (headerConfig.tenant) {
      interact = {
        tenant: headerConfig.tenant,
        appKey: headerConfig.appKey,
      };
    } else {
      if (log.info) {
        log.info('No tenant and appKey set for request %s. Using defaults to jacada_germany', stringify(headerConfig));
      }
      interact = {
        tenant: 'jacada_germany',
        appKey: '52d9b36fe4b0bd1d2d1ff9b0',
      };
    }

    let sessionId = requestData.sessionId;
    let action = requestData.result.action;

    ChatSessionWrapper.findOrCreate({
      where: {
        sessionId: sessionId,
      },
    }, {
      sessionId: sessionId,
    }, (err, chatSessionWrapperInstance, created) => {
      if (err || !chatSessionWrapperInstance) {
        if (log.error) {
          log.error('Error while lookup of session', err);
        }
        pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
        return cb(err.message);
      }

      if (chatSessionWrapperInstance.interactions && chatSessionWrapperInstance.interactions[action]) {
        if (log.debug) {
          log.debug('Interaction already available for action %s. Going to navigate next with current status %s', action, stringify(chatSessionWrapperInstance));
        }
        const currentInteractionInstance = chatSessionWrapperInstance.interactions[action];

        headless.navigateNext(interact.tenant, interact.appKey, action, currentInteractionInstance.instanceId).then((nextResponse) => {

          apiResponseHandler.createResponse(requestData, nextResponse).then(function success(aiResponse) {
            if (aiResponse.data && aiResponse.data.jacadaBot) {
              // check if it´ the same interaction as the last one on the stack.
              // if so, update config and navigation

              let lastInStackDate = 0;
              let lastInStack;

              // reload
              chatSessionWrapperInstance.reload((err, reloadedInstance) => {

                chatSessionWrapperInstance = reloadedInstance;

                chatSessionWrapperInstance.interactionStack.map((created, index) => {
                  if (created > lastInStackDate) {
                    lastInStack = chatSessionWrapperInstance.interactionStack[created];
                  }
                });

                const aiResponseConfiguration = aiResponse.data.jacadaBot.filter((toFilter) => {
                  return toFilter.type === 'Configuration';
                });
                const aiResponseNavigationButton = aiResponse.data.jacadaBot.filter((toFilter) => {
                  return toFilter.type === 'NavigationButton';
                });

                chatSessionWrapperInstance.interactionStack[stackDate]['config'] = aiResponseConfiguration;
                chatSessionWrapperInstance.interactionStack[stackDate]['navigation'] = aiResponseNavigationButton;

                chatSessionWrapperInstance.save(() => {
                  pLog.log('executeWebhook', (Date.now() - pStart) + ' ms');
                  cb(null, aiResponse);
                });
              });

            } else {
              pLog.log('executeWebhook', (Date.now() - pStart) + ' ms');
              cb(null, aiResponse);
            }
          }, function error(err) {
            if (log.error) {
              log.error('Error executeWebhook', err.message);
            }
            pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
            cb(err.message);
          }).catch(function err(err) {
            if (log.error) {
              log.error(err.message);
            }
            pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
            cb(err);
          });
        }).catch((err) => {
          if (log.error) {
            log.error('Error navigating next.');
          }

          if (log.info) {
            log.info('Going to try to create a new instance for action %s. Therefore going to delete current instance + stack', action);
          }

          delete chatSessionWrapperInstance.interactions[action];
          chatSessionWrapperInstance.save((err, savedInstance) => {
            if (log.info) {
              log.info('Interaction removed from instance %s. Going to call the method now again which will trigger to start a new interaction of this type.', savedInstance.id);
            }
            pLog.log('executeWebhook', (Date.now() - pStart) + ' ms. running again.');
            Webhook.executeWebhook(requestData, headerConfig, cb);
          });
        });
      } else {
        if (log.debug) {
          log.debug('Going to create new interaction instance for chat bot session %s with intent %s - %s and action == interactionId %s', sessionId, requestData.result.metadata.intentName, requestData.result.metadata.intentId, action);
        }

        if (!chatSessionWrapperInstance.interactions) {
          chatSessionWrapperInstance.interactions = {};
          chatSessionWrapperInstance.interactionStack = {};
        }

        // create interaction instance.
        let interactionInitialParams = {
          ai_bot_session_id: sessionId,
        };

        if (requestData.result.parameters) {
          _.each(requestData.result.parameters, (value, key) => {
            if (log.info) {
              log.info('Appending parameter %s with value %s', key, value);
            }
            interactionInitialParams['ai_param_' + key] = value;
          });
        }

        // TODO add the sentiment parameters as well.

        headless.createInteraction(interact.tenant, interact.appKey, action, interactionInitialParams).then((interactionInstance) => {
          chatSessionWrapperInstance.interactions[action] = interactionInstance;
          const stackDate = Date.now();
          chatSessionWrapperInstance.interactionStack[stackDate] = {
            action: action,
          };

          if (log.debug) {
            log.debug('Interaction created. Going to save it to sesssion %s', chatSessionWrapperInstance.sessionId);
          }

          chatSessionWrapperInstance.save({validate: true, throws: true}, (err, updatedInstance) => {
            if (err) {
              if (log.error) {
                log.error('Error during save chat wrapper instance');
              }
            } else {
              if (log.debug) {
                log.debug('chat session updated with interaction instance for intent %s', requestData.result.metadata.intentName);
              }
            }
            chatSessionWrapperInstance = updatedInstance;

            headless.navigateNext(interact.tenant, interact.appKey, action, interactionInstance.instanceId).then((nextResponse) => {
              if (log.debug) {
                log.debug('Navigated next with response.');
              }

              chatSessionWrapperInstance.reload((err, reloadedInstance) => {

                chatSessionWrapperInstance = reloadedInstance;

                apiResponseHandler.createResponse(requestData, nextResponse).then(function success(aiResponse) {
                  if (log.debug) {
                    log.debug('Response transformed to ai response.');
                  }

                  // add all configuration to stack
                  if (aiResponse && aiResponse.data && aiResponse.data.jacadaBot) {
                    if (log.debug) {
                      log.debug('Response has jacada bot data');
                    }

                    let lastInStackDate = 0;
                    let lastInStack;
                    let previouseInStack;

                    _.each(chatSessionWrapperInstance.interactionStack, (value, created) => {
                      if (parseInt(created) > parseInt(lastInStackDate)) {
                        previouseInStack = lastInStack;
                        lastInStack = chatSessionWrapperInstance.interactionStack[created];
                        lastInStackDate = created;
                      }
                    });

                    const aiResponseConfiguration = aiResponse.data.jacadaBot.filter((toFilter) => {
                      return toFilter.type === 'Configuration';
                    });
                    const aiResponseNavigationButton = aiResponse.data.jacadaBot.filter((toFilter) => {
                      return toFilter.type === 'NavigationButton';
                    });

                    chatSessionWrapperInstance.interactionStack[stackDate]['config'] = aiResponseConfiguration;
                    chatSessionWrapperInstance.interactionStack[stackDate]['navigation'] = aiResponseNavigationButton;

                    // if there is not further action. get the last stack and look for a message.

                    // TODO Something similar then what I do on continue!

                    if (log.debug) {
                      log.debug('executeWebhook - calculated stack with previouseInStack %s', stringify(previouseInStack));
                      log.debug('executeWebhook - aiResponseConfiguration = %s', stringify(aiResponseConfiguration));
                      log.debug('executeWebhook - aiResponseNavigationButton = %s', stringify(aiResponseNavigationButton));
                    }

                    const hasEnd = aiResponseConfiguration.filter((item) => {
                      return item.config.nextAction === 'End';
                    }).length > 0;

                    if (hasEnd) {

                      if (log.debug) {
                        log.debug('executeWebhook - Dialog ended. Going to check if the previouse in stack has a navgation button.');
                      }

                      if (previouseInStack && previouseInStack.navigation && previouseInStack.navigation.length > 0) {
                        if (log.debug) {
                          log.debug('executeWebhook - Found navigation. Going to get reponse for that and append it to current response.');
                        }

                        let nextInteraction = chatSessionWrapperInstance.interactions[previouseInStack.action];

                        let nextInteractionPayload = [{
                          paramName: 'GO_TO_ELEMENT_ID_PARAM',
                          paramValue: previouseInStack.navigation[0].buttonConfiguration.id,
                        }];

                        if (log.debug) {
                          log.debug('executeWebhook - going to navigate next on previouse in stack');
                        }

                        headless.navigateGoTo(nextInteraction.tenant, nextInteraction.appKey, previouseInStack.action, nextInteraction.instanceId, nextInteractionPayload).then((nextInteractResponse) => {

                          if (log.debug) {
                            log.debug('executeWebhook - navigated go to next finished.');
                          }

                          // transform response
                          let requestDataMock = {
                            result: {
                              action: previouseInStack.action,
                            },
                          };

                          if (log.debug) {
                            log.debug('executeWebhook - reload chat session');
                          }

                          // reload interaction
                          chatSessionWrapperInstance.reload((err, reloadedInstance) => {
                            if (log.debug) {
                              log.debug('executeWebhook - chat session reloaded.');
                            }
                            chatSessionWrapperInstance = reloadedInstance;

                            apiResponseHandler.createResponse(requestDataMock, nextInteractResponse).then(function success(aiNextResponse) {
                              if (log.debug) {
                                log.debug('executeWebhook - created second response');
                              }

                              aiResponse.data.jacadaBot = aiResponse.data.jacadaBot.filter((item) => {
                                if (item.type === 'Configuration') {
                                  return false;
                                } else {
                                  return true;
                                }
                              });

                              let combinedResponse = aiResponse;

                              combinedResponse.data.jacadaBot = combinedResponse.data.jacadaBot.concat(aiNextResponse.data.jacadaBot);

                              delete chatSessionWrapperInstance.interactionStack[lastInStackDate];
                              delete chatSessionWrapperInstance.interactions[action];

                              if (log.debug) {
                                log.debug('executeWebhook - removed last interaction from stack!');
                              }

                              /*
                              chatSessionWrapperInstance.chatMassages.create({
                                from: 'bot',
                                response: combinedResponse.data.jacadaBot,
                                date: new Date(),
                              });
                              */

                              chatSessionWrapperInstance.save(() => {
                                if (log.debug) {
                                  log.debug('executeWebhook - instance saved again and return combined result.');
                                }

                                cb(null, combinedResponse);
                              });
                            });

                          });

                        }).catch((error) => {
                          if (log.error) {
                            log.error('continue - Error navigation next.', error.message);
                          }

                          cb('Error navigation next');
                        });
                      } else {
                        if (log.debug) {
                          log.debug('continue - don´t have a navigation button option. just show response. Also remove interaction instance and stack instance.');
                        }

                        delete chatSessionWrapperInstance.interactionStack[lastInStackDate];
                        delete chatSessionWrapperInstance.interactions[action];

                        // TODO why?

                        let finalResponse = aiResponse;
                        if (previouseInStack) {
                          finalResponse.data.jacadaBot = aiResponse.data.jacadaBot.concat(previouseInStack.config);
                        } else {
                          //finalResponse = aiResponse.data.jacadaBot;
                        }
                        /*

                                                chatSessionWrapperInstance.chatMassages.create({
                                                  from: 'bot',
                                                  response: finalResponse.data.jacadaBot,
                                                  date: new Date(),
                                                });

                                                */

                        chatSessionWrapperInstance.save(() => {
                          // add previouse config to be able to pick it up from there.
                          cb(null, finalResponse);
                        });
                      }

                    } else {
                      if (log.debug) {
                        log.debug('executeWebhook - step has no end. No need to call stack!');
                      }

                      /*

                      chatSessionWrapperInstance.chatMassages.create({
                        from: 'bot',
                        response: aiResponse.data.jacadaBot,
                        date: new Date(),
                      });

                      */

                      chatSessionWrapperInstance.save((err, updatedSessionInstance) => {
                        if (err) {
                          if (log.error) {
                            log.error('continue - Error saving instance', stringify(err));
                          }
                          return cb(err);
                        }
                        if (log.debug) {
                          log.debug('Going to continue current jacadabot data %s', stringify(aiResponse.data.jacadaBot));
                        }

                        // TODO sync responses to be all the same
                        cb(null, aiResponse);
                      });

                    }

                  } else {
                    if (log.debug) {
                      log.debug('No jacada bot response. Going to return standard.');
                    }
                    pLog.log('executeWebhook', (Date.now() - pStart) + ' ms');
                    cb(null, aiResponse);
                  }
                }, function error(err) {
                  if (log.error) {
                    log.error(err);
                  }
                  pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
                  cb(err.message);
                }).catch(function err(err) {
                  if (log.error) {
                    log.error(err);
                  }
                  pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
                  cb(err.message);
                });

              });

            }).catch((err) => {
              if (log.error) {
                log.error('Error navigating next', err.message);
              }
              if (log.info) {
                log.info('No need to try again since we just created the instance.');
              }
              pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
              return cb(err.message);
            });
          });
        }).catch((err) => {
          if (log.error) {
            log.error('Error while creating interaction', err.message);
          }
          pLog.log('executeWebhook with Err', (Date.now() - pStart) + ' ms');
          return cb(err.message);
        });
      }
    });
  };

  Webhook.remoteMethod('executeWebhook', {
    accepts: [
      {arg: 'data', type: 'object', http: {source: 'body'}},
      {
        arg: 'config', type: 'object', http: function(ctx) {
          var req = ctx.req;
          let headers = {
            tenant: req.headers.tenant,
            appKey: req.headers.appkey,
          };

          return headers;
        },
      },

    ],
    returns: {arg: 'result', type: 'object', http: {source: 'body'}, root: true},
    http: {path: '/run', verb: 'post'},
  });

  /**
   * Uses not the product to have more flexibility with local chat session db managment
   *
   * @param apikey
   * @param sessionId
   * @param query
   * @param cb
   */
  Webhook.callApiAi = function(apikey, sessionId, query, additionalParams, cb) {
    if (log.debug) {
      log.debug('callApiAi for apikey %s, sessionId %s and query %s', apikey, sessionId, query);
    }

    let transactionId = uuidv4();

    let pStart = Date.now();

    let ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;

    let sessionData = {
      sessionId: sessionId,
      apiKey: apikey,
    };

    if(additionalParams.spui) {
      sessionData.spui = additionalParams.spui;
    }

    ChatSessionWrapper.findOrCreate({
        where: sessionData,
      }, sessionData,
      function(err, chatSessionWrapperInstance, created) {
        if (err) {
          if (log.warn) {
            log.warn('Error creating ChatSessionWrapper for sessionId %s', sessionId);
          }
          pLog.log('callApiAi with Err', (Date.now() - pStart) + ' ms');
          return cb(err);
        }

        let isUnknown = false;

        async.parallel([

          function addMessage(callback) {
            chatSessionWrapperInstance.chatMassages.create({
              from: 'you',
              query: query,
              date: new Date(),
              transactionId: transactionId,
            }, function(err, instance) {
              callback(err, instance);
            });
          },

          function callApiAi(callback) {
            const app = apiai(apikey);

            let request = app.textRequest(query, {
              sessionId: sessionId,
            });

            request.on('response', function(response) {
              isUnknown = response.result.action === 'input.unknown' ? true : false;

              let hasJacada = false;
              if (response.result.fulfillment.data && response.result.fulfillment.data.jacadaBot) {
                hasJacada = true;
              }
              if (log.debug) {
                log.debug('Got response from api.ai with fullfillment %s with data %s', hasJacada, stringify(response.result.fulfillment));
              }

              if (hasJacada) {
                response.result.fulfillment.data.jacadaBot.isUnknown = isUnknown;
                callback(null, response.result.fulfillment.data.jacadaBot);
              } else {
                if (log.debug) {
                  log.debug('Transforming api.ai default response to our expected response');
                }

                let resp = [];

                _.each(response.result.fulfillment.messages, (message) => {
                  switch (message.type) {
                    case 0:

                      if (message.speech === '') {
                        message.speech = 'Sorry, we identified the intent as "' + response.result.metadata.intentName + '" but it´s not yet implemented';
                      }

                      resp.push({
                        type: 'Paragraph',
                        elements: [
                          {
                            type: 'Text',
                            text: message.speech,
                          },
                        ],
                      });

                      break;
                    default:
                      if (log.warn) {
                        log.warn('Unable to transform message type %s for request %s. Going to skip message from api.ai', message.type, query);
                      }
                      break;
                  }
                });

                resp.isUnknown = isUnknown;
                callback(null, resp);
              }
            });

            request.on('error', function(error) {
              if (log.error) {
                log.error('Error on apiai request for apikey %s, sessionId %s and query %s', apikey, sessionId, query, error.message);
              }
              // cb(error);
              callback(error);
            });

            request.end();
          },

          function sentiment(callback) {

            sentimentHelper.analyze(query).then((res) => {
              callback(null, res);
            }).catch((err) => {
              if (log.error) {
                log.error('Error analyzing text %s. Still going to return without error.', err.message);
              }
            });

          },

        ], function(err, results) {
          if (err) {
            if (log.error) {
              log.error('Error during parallel execution', err);
            }
            pLog.log('callApiAi with Err', (Date.now() - pStart) + ' ms');
            cb(err);
          } else {
            let queryInstance = results[0];
            const apiResp = results[1];
            const sentimentResult = results[2];

            apiResp.push({
              type: 'SentimentInfo',
              sentiment: sentimentResult,
            });

            queryInstance.response = apiResp;
            queryInstance.isUnknown = isUnknown;

            chatSessionWrapperInstance.reload((err, reloadedInstance) => {

              chatSessionWrapperInstance = reloadedInstance;
              if (log.debug) {
                log.debug('Reloaded instance looks like this %s', stringify(chatSessionWrapperInstance));
              }

              if (chatSessionWrapperInstance.unknownCount) {
                if (apiResp.isUnknown) {
                  chatSessionWrapperInstance.unknownCount++;
                  if (log.info) {
                    log.info('Increasing unknown count for session %s to %s', sessionId, queryInstance.unknownCount);
                  }

                  if (chatSessionWrapperInstance.unknownCount >= 2) {
                    log.info('Unknown count reached 2. Going to escalate to human assistant.');

                    // TODO send message to pubnub and client.
                    humanAssistantPubNub.publish({
                      message: {
                        sessionId: chatSessionWrapperInstance.sessionId,
                        apiKey: chatSessionWrapperInstance.apiKey,
                      },
                      channel: 'HumanAssistant',
                    }, function(status, response) {
                      if (status.error) {
                        // handle error
                        if (log.error) {
                          log.error('Error sending human assistant request', status);
                        }
                      } else {
                        if (log.debug) {
                          log.debug('HumanAssistant request published for session %s at %s', chatSessionWrapperInstance.id, response.timetoken);
                        }
                      }
                    });
                    apiResp[0].elements.push({
                      text: 'Give me a moment I´ll get someone else to help.',
                      subType: 'HummanAssistantRequest',
                      type: 'Text',
                    });
                    //apiResp[0].elements[0].text = 'Give me a moment I´ll someone else to help.';
                    //apiResp[0].elements[0].subType = 'HummanAssistantRequest';
                  }
                } else {
                  if (log.info) {
                    log.info('Resetting unknown count for session %s to 0', sessionId);
                  }
                  chatSessionWrapperInstance.unknownCount = 0;
                }
              } else {
                if (apiResp.isUnknown) {
                  chatSessionWrapperInstance.unknownCount = 1;
                  if (log.info) {
                    log.info('Increasing unknown count for session %s to %s', sessionId, queryInstance.unknownCount);
                  }
                }
              }

              if (log.debug) {
                log.debug('Going to save instance again');
              }

              apiResp.push({
                type: 'SessionInfo',
                info: {
                  sessionId: chatSessionWrapperInstance.id,
                },
              });

              apiResp.map((item) => {
                item.transactionId = transactionId;
              });

              chatSessionWrapperInstance.chatMassages.create({
                from: 'bot',
                response: apiResp,
                date: new Date(),
                transactionId: transactionId,
              });

              chatSessionWrapperInstance.save((err, saved) => {
                if (err || !saved) {
                  if (log.error) {
                    log.error('Error adding response to ChatMessage');
                  }
                } else {
                  if (log.debug) {
                    log.debug('Message response added. Saved Message looks like this %s', stringify(saved));
                  }
                }

                pLog.log('callApiAi', (Date.now() - pStart) + ' ms');

                cb(null, apiResp);
              });
            });
          }
        });
      });
  };

  Webhook.remoteMethod('callApiAi', {
    accepts: [
      {arg: 'apikey', type: 'string'},
      {arg: 'sessionId', type: 'string'},
      {arg: 'query', type: 'string'},
      {arg: 'additionalParams', type: 'object'},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/apiai', verb: 'get'},
  });

  Webhook.continueDialog = function(payload, cb) {
    if (log.debug) {
      log.debug('Continue Dialog with payload %s', stringify(payload));
    }

    let transactionId = uuidv4();

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;
    const headless = require('../util/headless');

    ChatSessionWrapper.findOne({
      where: {
        sessionId: payload.sessionId,
      },
    }, (err, chatSessionWrapperInstance) => {
      if (err || !chatSessionWrapperInstance) {
        if (log.error) {
          log.error('Error while continue dialog for session %s', payload.sessionId);
        }
        return cb(err);
      }

      if (log.debug) {
        log.debug('Found chatSessionWrapperInstance with id %s', chatSessionWrapperInstance.id);
      }

      chatSessionWrapperInstance.chatMassages.create({
        from: 'you',
        query: payload.userValue,
        date: new Date(),

      });

      if (!chatSessionWrapperInstance.interactions) {
        if (log.error) {
          log.error('No interactions to be continued for session %s', payload.sessionId);
        }
        return cb('No interaction found for session %s', payload.sessionId);
      }

      const interaction = chatSessionWrapperInstance.interactions[payload.forDialog];
      if (!interaction) {
        if (log.error) {
          log.error('Unable to find corresponding interaction for dialog %s', payload.forDialog);
        }
        return cb(new Error('Could not find corresponding interaction for dialog'));
      }

      if (log.debug) {
        log.debug('continue - found interaction to be continued. %s', stringify(interaction));
      }

      headless.navigateNext(interaction.tenant, interaction.appKey, payload.forDialog, interaction.instanceId, payload.payload).then((interactResponse) => {

        if (log.debug) {
          log.debug('continue - navigate next finished with response', stringify(interactResponse));
        }

        let requestDataMock = {
          result: {
            action: payload.forDialog,
          },
        };

        // reload instance
        chatSessionWrapperInstance.reload((err, reloadedInstance) => {
          if (err || !reloadedInstance) {
            if (log.error) {
              log.error('Unable ro reload instance', err);
            }
            return cb(err);
          }

          if (log.debug) {
            log.debug('continue - Chat session reloaded. Going to created response now.');
          }

          chatSessionWrapperInstance = reloadedInstance;

          apiResponseHandler.createResponse(requestDataMock, interactResponse).then(function success(aiResponse) {

            if (log.debug) {
              log.debug('continue - create response finished');
            }

            if (aiResponse && aiResponse.data && aiResponse.data.jacadaBot) {

              if (log.debug) {
                log.debug('continue -  with jacadaBot response. Going to calculate stack.');
              }

              let lastInStackDate = 0;
              let lastInStack;
              let previouseInStack;

              _.each(chatSessionWrapperInstance.interactionStack, (value, created) => {
                if (parseInt(created) > parseInt(lastInStackDate)) {
                  previouseInStack = lastInStack;
                  lastInStack = chatSessionWrapperInstance.interactionStack[created];
                  lastInStackDate = created;
                }
              });

              const aiResponseConfiguration = aiResponse.data.jacadaBot.filter((toFilter) => {
                return toFilter.type === 'Configuration';
              });
              const aiResponseNavigationButton = aiResponse.data.jacadaBot.filter((toFilter) => {
                return toFilter.type === 'NavigationButton' && toFilter.nextAction !== 'AsyncReturn';
              });
              const aiResponseNavigationButtonAsyncTask = aiResponse.data.jacadaBot.filter((toFilter) => {
                return toFilter.type === 'NavigationButton' && toFilter.nextAction === 'AsyncReturn';
              });

              chatSessionWrapperInstance.interactionStack[lastInStackDate]['config'] = aiResponseConfiguration;
              chatSessionWrapperInstance.interactionStack[lastInStackDate]['navigation'] = aiResponseNavigationButton;

              // if we reached the end of this dialog we will check the last dialog in stack and see if it has a navigation button inside.
              // this is the resume config.

              if (log.debug) {
                log.debug('continue - calculated stack with previouseInStack %s', stringify(previouseInStack));
                log.debug('continue - aiResponseConfiguration = %s', stringify(aiResponseConfiguration));
                log.debug('continue - aiResponseNavigationButton = %s', stringify(aiResponseNavigationButton));
              }

              const hasEnd = aiResponseConfiguration.filter((item) => {
                return item.config.nextAction === 'End';
              }).length > 0;

              // check if we have async task response in config.

              if (aiResponseNavigationButtonAsyncTask.length > 0) {
                if (log.debug) {
                  log.debug('continue - found async task return. Storing it to session');
                }

                if (!chatSessionWrapperInstance.asyncTasks) {
                  chatSessionWrapperInstance.asyncTasks = {};
                }

                if (!chatSessionWrapperInstance.asyncTasks[interaction.uniqueId]) {
                  chatSessionWrapperInstance.asyncTasks[interaction.uniqueId] = {};
                }

                chatSessionWrapperInstance.asyncTasks[interaction.uniqueId].interaction = interaction;
                chatSessionWrapperInstance.asyncTasks[interaction.uniqueId].interaction.action = payload.forDialog;

                chatSessionWrapperInstance.asyncTasks[interaction.uniqueId].continueButton = aiResponseNavigationButtonAsyncTask;

              }

              if (hasEnd) {
                if (log.debug) {
                  log.debug('continue - Dialog ended. Going to check if the previouse in stack has a navgation button.');
                }
                if (previouseInStack && previouseInStack.navigation && previouseInStack.navigation.length > 0) {
                  if (log.debug) {
                    log.debug('continue - Found navigation. Going to get reponse for that and append it to current response.');
                  }

                  let nextInteraction = chatSessionWrapperInstance.interactions[previouseInStack.action];

                  let nextInteractionPayload = [{
                    paramName: 'GO_TO_ELEMENT_ID_PARAM',
                    paramValue: previouseInStack.navigation[0].buttonConfiguration.id,
                  }];

                  if (log.debug) {
                    log.debug('continue - going to navigate next on previouse in stack');
                  }

                  headless.navigateGoTo(nextInteraction.tenant, nextInteraction.appKey, previouseInStack.action, nextInteraction.instanceId, nextInteractionPayload).then((nextInteractResponse) => {

                    if (log.debug) {
                      log.debug('continue - navigated go to next finished.');
                    }

                    // transform response
                    requestDataMock = {
                      result: {
                        action: previouseInStack.action,
                      },
                    };

                    if (log.debug) {
                      log.debug('continue - reload chat session');
                    }

                    // reload interaction
                    chatSessionWrapperInstance.reload((err, reloadedInstance) => {
                      if (log.debug) {
                        log.debug('continue - chat session reloaded.');
                      }
                      chatSessionWrapperInstance = reloadedInstance;

                      apiResponseHandler.createResponse(requestDataMock, nextInteractResponse).then(function success(aiNextResponse) {
                        if (log.debug) {
                          log.debug('continue - created second response');
                        }

                        let combinedResponse = aiNextResponse.data.jacadaBot;
                        combinedResponse = combinedResponse.concat(aiResponse.data.jacadaBot);

                        delete chatSessionWrapperInstance.interactionStack[lastInStackDate];
                        delete chatSessionWrapperInstance.interactions[payload.forDialog];

                        if (log.debug) {
                          log.debug('continue - removed last interaction from stack!');
                        }

                        combinedResponse.map((item) => {
                          item.transactionId = transactionId;
                        });

                        chatSessionWrapperInstance.chatMassages.create({
                          from: 'bot',
                          response: combinedResponse,
                          date: new Date(),
                          transactionId: transactionId,
                        });

                        chatSessionWrapperInstance.save(() => {
                          if (log.debug) {
                            log.debug('continue - instance saved again and return combined result.');
                          }

                          cb(null, combinedResponse);
                        });
                      });

                    });

                  }).catch((error) => {
                    if (log.error) {
                      log.error('continue - Error navigation next.', error.message);
                    }
                  });
                } else {
                  if (log.debug) {
                    log.debug('continue - don´t have a navigation button option. just show response. Also remove interaction instance and stack instance.');
                  }

                  delete chatSessionWrapperInstance.interactionStack[lastInStackDate];
                  delete chatSessionWrapperInstance.interactions[payload.forDialog];

                  let finalResponse;
                  if (previouseInStack) {
                    finalResponse = aiResponse.data.jacadaBot.concat(previouseInStack.config);
                  } else {
                    finalResponse = aiResponse.data.jacadaBot;
                  }

                  finalResponse.map((item) => {
                    item.transactionId = transactionId;
                  });

                  chatSessionWrapperInstance.chatMassages.create({
                    from: 'bot',
                    response: finalResponse,
                    date: new Date(),
                    transactionId: transactionId,
                  });

                  chatSessionWrapperInstance.save(() => {
                    // add previouse config to be able to pick it up from there.
                    cb(null, finalResponse);

                  });
                }
              } else {

                if (log.debug) {
                  log.debug('continue - step has no end. No need to call stack!');
                }

                aiResponse.data.jacadaBot.map((item) => {
                  item.transactionId = transactionId;
                });

                chatSessionWrapperInstance.chatMassages.create({
                  from: 'bot',
                  response: aiResponse.data.jacadaBot,
                  date: new Date(),
                  transactionId: transactionId,
                });

                chatSessionWrapperInstance.save((err, updatedSessionInstance) => {
                  if (err) {
                    if (log.error) {
                      log.error('continue - Error saving instance', stringify(err));
                    }
                    return cb(err);
                  }
                  if (log.debug) {
                    log.debug('Going to continue current jacadabot data %s', stringify(aiResponse.data.jacadaBot));
                  }

                  // TODO sync responses to be all the same

                  cb(null, aiResponse.data.jacadaBot);
                });
              }
            } else {
              if (log.warn) {
                log.warn('continue - no response for jacadaBot. Going to fail now.');
              }

              return cb('Unable to get jacada response');
              //cb(null, aiResponse.data);
            }
          }, function error(err) {
            if (log.error) {
              log.error('continue - Error', stringify(err));
            }
            cb(err);
          }).catch(function err(err) {
            if (log.error) {
              log.error('continue - Error', stringify(err));
            }
            cb(err);
          });

        });

      }).catch((err) => {
        if (log.error) {
          log.error('continue - Error', stringify(err));
        }
        return cb(err);
      });
    });
  };

  Webhook.remoteMethod('continueDialog', {
    accepts: [
      {arg: 'data', type: 'ContinueRequest', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {path: '/continueDialog', verb: 'post'},
  });

  /**
   * Sending a async message to the chatbot client.
   * Message type should be
   * @param message
   * @param cb
   */
  Webhook.sendAsyncBotMessage = function(message, cb) {
    if (log.debug) {
      log.debug('sendAsyncBotMessage', message);
    }

    let transactionId = uuidv4();
    message.transactionId = transactionId;

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;

    // TODO add to session!
    ChatSessionWrapper.findById(message.chatBotInternalSessionId, (err, chatSessionWrapperInstance) => {

      if (err || !chatSessionWrapperInstance) {
        return cb('Unable to find chatsession for id %s', message.chatBotInternalSessionId);
      }
      chatSessionWrapperInstance.chatMassages.create({
        from: message.from,
        query: message.text,
        date: new Date(),
        tansactionId: transactionId,
      });

      chatbotPubNub.publish({
        message: message,
        channel: message.chatBotInternalSessionId,
      }, function(status, response) {
        if (status.error) {
          // handle error
          if (log.error) {
            log.error('Error sending chatbot async message', status);
          }
        } else {
          if (log.debug) {
            log.debug('sendAsyncBotMessage published for session %s at %s', message.chatBotInternalSessionId, response.timetoken);
          }
        }
      });

      cb(null, message);

    });

  };

  Webhook.remoteMethod('sendAsyncBotMessage', {
    accepts: [
      {arg: 'AsyncBotMessage', type: 'AsyncBotMessage', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/sendBotChatMessage',
      verb: 'post',
    },
  });

  Webhook.startAsyncInteract = function(message, cb) {
    if (log.info) {
      log.info('startAsyncInteract', message);
    }

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;
    const headless = require('../util/headless');

    ChatSessionWrapper.findById(message.internalChatbotSessionId, (err, chatSessionWrapperInstance) => {

      if (err) {
        if (log.error) {
          log.error('start AsyncInteract - Error getting interaction by chatbot session Id %s', message.internalChatbotSessionId);
        }
        return;
      }

      if (!chatSessionWrapperInstance.asyncTasks) {
        chatSessionWrapperInstance.asyncTasks = {};
      }

      if (!chatSessionWrapperInstance.asyncTasks[message.initiator]) {
        chatSessionWrapperInstance.asyncTasks[message.initiator] = {};
        chatSessionWrapperInstance.asyncTasks[message.initiator].message = message;
      }

      chatSessionWrapperInstance.save((err) => {

        if (log.info) {
          log.info('startAsyncInteract - session saved');
        }

        headless.createInteraction(message.tenant, message.appKey, message.interactionId, {
          ai_bot_session_id: message.internalChatbotSessionId,
        }).then((createResponse) => {

          if (log.info) {
            log.info('startAsyncInteract - interaction created');
          }

          headless.navigateNext(message.tenant, message.appKey, message.interactionId, createResponse.instanceId).then((interactResponse) => {

            if (log.info) {
              log.info('startAsyncInteract - interaction navigated');
            }

            let requestDataMock = {
              result: {
                action: message.interactionId,
              },
            };

            apiResponseHandler.createResponse(requestDataMock, interactResponse).then(function success(aiResponse) {

              if (log.info) {
                log.info('startAsyncInteract - ai-response created.');
              }

              // TODO check if we simply send a message with the response or we navigate on main thread / interaction

              chatSessionWrapperInstance.reload((err, updatedChatSessionWrapperInstance) => {
                if (err) {
                  if (log.error) {
                    log.error('startAsyncInteract - Error reloading chat session. %s', err.message);
                  }
                  return;

                }

                if (log.info) {
                  log.info('startAsyncInteract - interaction reloaded');
                }

                chatSessionWrapperInstance = updatedChatSessionWrapperInstance;

                if (chatSessionWrapperInstance.asyncTasks && chatSessionWrapperInstance.asyncTasks[message.initiator]) {
                  let task = chatSessionWrapperInstance.asyncTasks[message.initiator];

                  if (task.message.continueOrSignal === 'continue') {
                    // call the navigation button

                    let nextInteractionPayload = [{
                      paramName: 'GO_TO_ELEMENT_ID_PARAM',
                      paramValue: task.continueButton[0].buttonConfiguration.id,
                    }];

                    if (log.debug) {
                      log.debug('startAsyncInteract - going to navigate next on interaction');
                    }

                    headless.navigateGoTo(task.interaction.tenant, task.interaction.appKey, task.interaction.action, task.interaction.instanceId, nextInteractionPayload).then((nextInteractResponse) => {

                      if (log.debug) {
                        log.debug('startAsyncInteract - navigated go to next finished.');
                      }

                      // transform response
                      let requestDataMock = {
                        result: {
                          action: task.interaction.action,
                        },
                      };

                      if (log.debug) {
                        log.debug('startAsyncInteract - reload chat session');
                      }

                      // reload interaction
                      chatSessionWrapperInstance.reload((err, reloadedInstance) => {
                        if (log.debug) {
                          log.debug('startAsyncInteract - chat session reloaded.');
                        }
                        chatSessionWrapperInstance = reloadedInstance;

                        apiResponseHandler.createResponse(requestDataMock, nextInteractResponse).then(function success(aiNextResponse) {
                          if (log.debug) {
                            log.debug('startAsyncInteract - created second response');
                          }
                          /*
                                                    aiResponse.data.jacadaBot = aiResponse.data.jacadaBot.filter((item) => {
                                                      if (item.type === 'Configuration') {
                                                        return false;
                                                      } else {
                                                        return true;
                                                      }
                                                    });
                          */
                          let combinedResponse = aiResponse;

                          combinedResponse.data.jacadaBot = combinedResponse.data.jacadaBot.concat(aiNextResponse.data.jacadaBot);

                          // delete chatSessionWrapperInstance.interactionStack[lastInStackDate];
                          // delete chatSessionWrapperInstance.interactions[action];

                          if (log.debug) {
                            log.debug('startAsyncInteract - removed last interaction from stack!');
                          }

                          /*
                          chatSessionWrapperInstance.chatMassages.create({
                            from: 'bot',
                            response: combinedResponse.data.jacadaBot,
                            date: new Date(),
                          });
                          */

                          chatSessionWrapperInstance.save(() => {
                            if (log.debug) {
                              log.debug('startAsyncInteract - instance saved again and return combined result.');
                            }

                            //cb(null, combinedResponse);

                            if (log.debug) {
                              log.debug('startAsyncInteract - sending combined response %s', stringify(combinedResponse));
                            }

                            chatbotPubNub.publish({
                              message: {
                                interactBotMessages: combinedResponse.data.jacadaBot,
                              },
                              channel: message.internalChatbotSessionId,
                            }, function(status, response) {
                              if (status.error) {
                                // handle error
                                if (log.error) {
                                  log.error('Error - startAsyncInteract - sending chatbot async message', status);
                                }
                              } else {
                                if (log.debug) {
                                  log.debug('startAsyncInteract - published for session %s at %s', message.internalChatbotSessionId, response.timetoken);
                                }
                              }
                            });

                          });
                        });
                      });

                    }).catch((error) => {
                      if (log.error) {
                        log.error('startAsyncInteract - Error navigation next.', error.message);
                      }

                      // combine responses and send to client.

                      //cb('startAsyncInteract - Error navigation next');
                    });

                  } else if (task.message.continueOrSignal === 'signal') {
                    chatbotPubNub.publish({
                      message: {
                        interactBotMessages: aiResponse.data.jacadaBot,
                      },
                      channel: message.internalChatbotSessionId,
                    }, function(status, response) {
                      if (status.error) {
                        // handle error
                        if (log.error) {
                          log.error('Error - startAsyncInteract - sending chatbot async message', status);
                        }
                      } else {
                        if (log.debug) {
                          log.debug('startAsyncInteract - published for session %s at %s', message.internalChatbotSessionId, response.timetoken);
                        }
                      }
                    });
                  } else {
                    if (log.warn) {
                      log.warn('Unknown configuration for task handling from interaction %s with continue action %s. Going to return', message.initiator, task.message.continueOrSignal);
                    }
                    return;
                  }

                } else {
                  if (log.warn) {
                    log.warn('startAsyncInteract - can´t find handling for async task from interaction %s. Going to do nothing!', message.initiator);
                  }
                  return;

                }

              });

            });
          }).catch((err) => {
            if (log.error) {
              log.error('startAsyncInteract - Error during navigate next - %s', err.message);
            }
          });
        }).catch((err) => {
          if (log.error) {
            log.error('startAsyncInteract - Error during create interaction - %s', err.message);
          }
        });
      });
    });

    cb(null, {test: 'test'});
  };

  Webhook.remoteMethod('startAsyncInteract', {
    accepts: [
      {arg: 'AsyncInteractBotMessage', type: 'AsyncInteractBotMessage', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/startAsyncInteract',
      verb: 'post',
    },
  });

  Webhook.history = function(message, cb) {
    if (log.debug) {
      log.debug('history', message);
    }

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;

    ChatSessionWrapper.findOne({
      where: {
        sessionId: message.sessionId,
      },
    }, (err, instance) => {
      if (err || !instance) {
        return cb(err);
      }

      return cb(err, instance);
    });
  };

  Webhook.remoteMethod('history', {
    accepts: [
      {arg: 'message', type: 'object', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/history',
      verb: 'post',
    },
  });

  Webhook.humanAssistant = function(message, cb) {
    if (log.debug) {
      log.debug('humanAssistant', message);
    }

    let transactionId = uuidv4();

    const ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;

    ChatSessionWrapper.findOne({
      where: {
        sessionId: message.sessionId,
      },
    }, (err, instance) => {
      if (err || !instance) {
        return cb('Unable to find instance');
      }

      // add message
      instance.chatMassages.create({
        from: message.from,
        query: message.text,
        date: new Date(),
        transactionId: transactionId,
      });

      // send push message
      chatbotPubNub.publish({
        channel: instance.id.toString(),
        message: {
          text: message.text,
          from: message.from,
          transactionId: transactionId,
        },
      });

      return cb(err, instance);
    });
  };

  Webhook.remoteMethod('humanAssistant', {
    accepts: [
      {arg: 'message', type: 'object', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/humanAssistant',
      verb: 'post',
    },
  });

  Webhook.startLink = function(startLinkRequest, cb) {
    if (log.debug) {
      log.debug('startLink %s with options %s', startLinkRequest.link, stringify(startLinkRequest.options));
    }

    chatbotPubNub.publish({
      message: startLinkRequest,
      channel: startLinkRequest.chatBotInternalSessionId,
    }, function(status, response) {
      if (status.error) {
        // handle error
        if (log.error) {
          log.error('Error sending chatbot async message', status);
        }
      } else {
        if (log.debug) {
          log.debug('startLink published for session %s at %s', startLinkRequest.chatBotInternalSessionId, response.timetoken);
        }
      }
    });

    cb(null, {test: 'test'});
  };

  Webhook.remoteMethod('startLink', {
    accepts: [
      {arg: 'startLinkRequest', type: 'StartLinkRequest', http: {source: 'body'}},
    ],
    returns: {
      arg: 'result', type: 'object', http: {source: 'body'}, root: true,
    },
    http: {
      path: '/startLink',
      verb: 'post',
    },
  });

};
