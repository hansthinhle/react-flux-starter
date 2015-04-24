var React = require('react');
var NotifyStore = require('../stores/NotifyStore');
var Toastr = require('toastr');

var Notify = React.createClass({
  componentWillMount: function () {
    NotifyStore.on('notify', function (type, message, title) {
      switch (type) {
        case 'success':
          Toastr.success(message, title);
          break;
        case 'info':
          Toastr.info(message, title);
          break;
        case 'warning':
          Toastr.warning(message, title);
          break;
        case 'error':
          Toastr.error(message, title);
          break;
      }
    });
  },
  render: function () {
    return null;
  },
  componentWillUnmount: function () {
    NotifyStore.removeAllListeners('notify');
  }
});

module.exports = Notify;
