var React = require('react');

var Document = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    bodyClass: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      oldTitle: document.title,
      oldBodyClass: document.body.className
    };
  },
  componentWillMount: function () {
    if (this.props.title) {
      document.title = this.props.title;
    }
    if (this.props.bodyClass) {
      var newClass = this.state.oldBodyClass + ' ' + this.props.bodyClass;
      document.body.className = newClass.trim().replace('  ', ' ');
    }
  },
  render: function () {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  },
  componentWillUnmount: function () {
    document.title = this.state.oldTitle;
    document.body.className = this.state.oldBodyClass;
  }
});

module.exports = Document;
