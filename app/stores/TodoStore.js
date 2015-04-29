var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstant = require('../constants/TodoConstant');
var _ = require('lodash');

var _items = [];
var TodoStore = _.assign({}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(TodoConstant.CHANGE, _items);
  },
  getAll: function () {
    return _items;
  },
  get: function (id) {
    return _.find(_items, function (item) {
      return item.id === id;
    });
  },
  push: function (items) {
    _items = _.union(_items, items || []);
  },
  unShift: function (item) {
    _items.unshift(item);
  },
  remove: function (id) {
    id = Number(id);
    _items = _.reject(_items, function (item) {
      return item.id === id;
    });
  }
});

TodoStore.dispatchToken = AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case TodoConstant.FETCH_SUCCESS:
      TodoStore.emit(TodoConstant.FETCHED, null, payload.response);
      TodoStore.push(payload.response);
      TodoStore.emitChange();
      break;
    case TodoConstant.FETCH_ERROR:
      TodoStore.emit(TodoConstant.FETCHED, payload.error);
      break;
    case TodoConstant.CREATE_SUCCESS:
      TodoStore.emit(TodoConstant.CREATED, null, payload.response);
      TodoStore.unShift(payload.response);
      TodoStore.emitChange();
      break;
    case TodoConstant.CREATE_ERROR:
      TodoStore.emit(TodoConstant.CREATED, payload.error);
      break;
    case TodoConstant.REMOVE_SUCCESS:
      TodoStore.emit(TodoConstant.REMOVED, null, payload.response);
      TodoStore.remove(payload.response);
      TodoStore.emitChange();
      break;
    case TodoConstant.REMOVE_ERROR:
      TodoStore.emit(TodoConstant.REMOVED, payload.error);
      break;
  }
  return true;
});

module.exports = TodoStore;
