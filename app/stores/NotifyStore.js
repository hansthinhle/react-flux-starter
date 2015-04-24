var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var NotifyDispatcher = require('../dispatcher/NotifyDispatcher');

var NotifyStore = _.assign({}, EventEmitter.prototype, {
  notify: function (type, message, title) {
    this.emit('notify', type, message, title);
  }
});

NotifyStore.dispatchToken = NotifyDispatcher.register(function (payload) {
  var type = payload.actionType;
  var message = payload.message || null;
  var title = payload.title || null;
  NotifyStore.notify(type, message, title);
  return true;
});

module.exports = NotifyStore;
