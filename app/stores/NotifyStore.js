var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotifyConstant = require('../constants/NotifyConstant');

var NotifyStore = _.assign({}, EventEmitter.prototype, {
  notify: function (type, message, title) {
    type = type || NotifyConstant.INFO;
    this.emit(NotifyConstant.NOTIFY, type, message, title);
  }
});

NotifyStore.dispatchToken = AppDispatcher.register(function (payload) {
  var actionType = payload.actionType;
  switch (actionType) {
    case NotifyConstant.NOTIFY:
      NotifyStore.notify(payload.type, payload.message, payload.title);
      break;
  }
  return true;
});

module.exports = NotifyStore;
