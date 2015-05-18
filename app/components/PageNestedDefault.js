var React = require('react');
var Document = require('./Document');

var PageNestedDefault = React.createClass({
  render: function () {
    return (
      <Document title="PageNested | React-Flux" bodyClass="page-nested-default">
        <h1>Default</h1>
      </Document>
    );
  }
});

module.exports = PageNestedDefault;
