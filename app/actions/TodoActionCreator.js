var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstant = require('../constants/TodoConstant');
var TodoService = require('../services/TodoService');
var NotifyActionCreator = require('../actions/NotifyActionCreator');

var TodoActionCreators = {
  fetch: function () {
    TodoService.query().then(function (response) {
      AppDispatcher.dispatch({
        actionType: TodoConstant.FETCH_SUCCESS,
        response: response
      });
    }, function (error) {
      AppDispatcher.dispatch({
        actionType: TodoConstant.FETCH_ERROR,
        error: error
      });
      NotifyActionCreator.error(error.message, error.status);
    });
  },
  create: function (params) {
    TodoService.post(params).then(function (response) {
      AppDispatcher.dispatch({
        actionType: TodoConstant.CREATE_SUCCESS,
        response: response
      });
      NotifyActionCreator.success('Todo ' + response.title + ' had been create.');
    }, function (error) {
      AppDispatcher.dispatch({
        actionType: TodoConstant.CREATE_ERROR,
        error: error
      });
      NotifyActionCreator.error(error.message, error.status);
    });
  },
  remove: function (id) {
    TodoService.delete(id).then(function () {
      AppDispatcher.dispatch({
        actionType: TodoConstant.REMOVE_SUCCESS,
        response: id
      });
      NotifyActionCreator.success('Todo had been remove.');
    }, function (error) {
      AppDispatcher.dispatch({
        actionType: TodoConstant.REMOVE_ERROR,
        error: error
      });
      NotifyActionCreator.error(error.message, error.status);
    });
  }
};

module.exports = TodoActionCreators;
