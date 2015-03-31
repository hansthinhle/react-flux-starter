var TodoDispatcher = require('../dispatcher/TodoDispatcher');
var TodoConstant = require('../constants/TodoConstant');

var TodoActionCreators = {
  fetchData: function(){
    TodoDispatcher.dispatch({
      actionType: TodoConstant.FETCH_DATA,
    });
  },
  addNewItem: function (item) {
    TodoDispatcher.dispatch({
      actionType: TodoConstant.ADD_ITEM,
      item: item
    });
  },
  removeItem: function (item) {
    TodoDispatcher.dispatch({
      actionType: TodoConstant.REMOVE_ITEM,
      item: item
    });
  }
};

module.exports = TodoActionCreators;