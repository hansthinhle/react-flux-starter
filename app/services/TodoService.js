var LocalStorage = require('localStorage');
var Promise = require('promise');
var _ = require('lodash');

var _currentTime = function () {
  var d = new Date();
  return d.getTime();
};

function _loadTodo() {
  var data = LocalStorage.getItem('todoStore');
  return _.isEmpty(data) ? [] : JSON.parse(data);
}

function _saveTodo(todo) {
  todo = todo || [];
  LocalStorage.setItem('todoStore', JSON.stringify(todo));
}

var TodoService = {
  query: function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var todo = _loadTodo();
        resolve(todo);
      }, 3000);
    });
  },
  post: function (params) {
    return new Promise(function (resolve, reject) {
      var time = _currentTime();
      var todo = _loadTodo();
      if (time % 2 === 0) {
        var item = {
          id: time,
          title: params.title
        };
        todo.push(item);
        _saveTodo(todo);
        setTimeout(function () {
          resolve(item);
        }, 2000);
      } else {
        reject({
          status: 500,
          message: 'Current time is odd :D'
        });
      }
    });
  },
  delete: function (id) {
    return new Promise(function (resolve) {
      var todo = _loadTodo();
      todo = _.reject(todo, function (t) {
        return t.id === parseInt(id);
      });
      _saveTodo(todo);
      resolve(id);
    });
  }
};

module.exports = TodoService;
