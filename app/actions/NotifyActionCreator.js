var NotifyDispatcher = require('../dispatcher/NotifyDispatcher');

var NotifyActionCreator = {
  success: function(message, title){
    NotifyDispatcher.dispatch({
      actionType: 'success',
      message: message,
      title: title
    });
  },
  info: function(message, title){
    NotifyDispatcher.dispatch({
      actionType: 'info',
      message: message,
      title: title
    });
  },
  warning: function(message, title){
    NotifyDispatcher.dispatch({
      actionType: 'warning',
      message: message,
      title: title
    });
  },
  error: function(message, title){
    NotifyDispatcher.dispatch({
      actionType: 'error',
      message: message,
      title: title
    });
  }
};

module.exports = NotifyActionCreator;
