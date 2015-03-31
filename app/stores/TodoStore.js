var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstant = require('../constants/TodoConstant');
var localStorage = require('localStorage');
var _ = require('underscore');

var _items = [];
var _getFromLocalStorage = function () {
  var data = localStorage.getItem('todo');
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
};
var _saveToLocalStorage = function () {
  localStorage.setItem('todo', JSON.stringify(_items));
};

var TodoStore = ObjectAssign({}, EventEmitter.prototype, {
  fetchData: function(){
    _items = _getFromLocalStorage();
    this.emitChange();
  },
  getItems: function () {
    return _items;
  },
  addItem: function (item) {
    _items.push(item);
    _saveToLocalStorage();
    this.emit(TodoConstant.ITEM_ADDED, item);
    this.emitChange();
  },
  removeItem: function (item) {
    _items = _.filter(_items, function (arg) {
      return arg !== item;
    });
    _saveToLocalStorage();
    this.emit(TodoConstant.ITEM_REMOVED, item);
    this.emitChange();
  },
  emitChange: function () {
    this.emit(TodoConstant.TODO_CHANGE);
  }
});

TodoStore.dispatchToken = TodoDispatcher.register(function (payload) {
  var action = payload.actionType;
  switch (action) {
    case TodoConstant.FETCH_DATA:
      TodoStore.fetchData();
      break;
    case TodoConstant.ADD_ITEM:
      TodoStore.addItem(payload.item);
      break;
    case TodoConstant.REMOVE_ITEM:
      TodoStore.removeItem(payload.item);
      break;
  }
  return true;
});

module.exports = TodoStore;