var React = require('react');
var NotifyStore = require('../stores/NotifyStore');
var NotifyConstant = require('../constants/NotifyConstant');
var Toastr = require('toastr');

var Notify = React.createClass({
  componentWillMount: function () {
    NotifyStore.on(NotifyConstant.NOTIFY, function (type, message, title) {
      switch (type) {
        case NotifyConstant.INFO:
          Toastr.info(message, title);
          break;
        case NotifyConstant.SUCCESS:
          Toastr.success(message, title);
          break;
        case NotifyConstant.WARNING:
          Toastr.warning(message, title);
          break;
        case NotifyConstant.ERROR:
          Toastr.error(message, title);
          break;
      }
    });
  },
  render: function () {
    return null;
  },
  componentWillUnmount: function () {
    NotifyStore.removeAllListeners(NotifyConstant.NOTIFY);
  }
});

module.exports = Notify;
