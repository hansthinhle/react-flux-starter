var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotifyConstant = require('../constants/NotifyConstant');

var NotifyActionCreator = {
  info: function (message, title) {
    AppDispatcher.dispatch({
      actionType: NotifyConstant.NOTIFY,
      type: NotifyConstant.INFO,
      message: message,
      title: title
    });
  },
  success: function (message, title) {
    AppDispatcher.dispatch({
      actionType: NotifyConstant.NOTIFY,
      type: NotifyConstant.SUCCESS,
      message: message,
      title: title
    });
  },
  warning: function (message, title) {
    AppDispatcher.dispatch({
      actionType: NotifyConstant.NOTIFY,
      type: NotifyConstant.WARNING,
      message: message,
      title: title
    });
  },
  error: function (message, title) {
    AppDispatcher.dispatch({
      actionType: NotifyConstant.NOTIFY,
      type: NotifyConstant.ERROR,
      message: message,
      title: title
    });
  }
};

module.exports = NotifyActionCreator;
