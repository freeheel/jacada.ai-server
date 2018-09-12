'use strict';


const _ = require('underscore');

module.exports = function (Chatdata) {

  Chatdata.observe('after save', function filterProperties(ctx, next) {

    let ChatSessionWrapper = require('../../server/server').models.ChatSessionWrapper;

    ChatSessionWrapper.findById(ctx.instance.chatSessionWrapperId.toString(), function (err, wrapper) {

      if (err) {
        return next(err);
      }

      let newData = [];

      _.each(wrapper.chatDataList, function (dataItem) {
        if (dataItem.key !== ctx.instance.key || dataItem.id === ctx.instance.id) {
          newData.push(dataItem);
        }
      });

      if (newData.length === wrapper.chatDataList.length) {
        return next();
      } else {
        wrapper.chatDataList = newData;
        wrapper.save(function(err, saved) {
          next(err);
        });

      }

    });

  });

};
