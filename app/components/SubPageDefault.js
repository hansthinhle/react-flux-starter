var React = require('react');
var Document = require('./Document');

var SubPageDefault = React.createClass({
  render: function () {
    return (
      <Document title="Default| PageNested | React-Flux"
        bodyClass="page-nested-default">
        <h1>Default</h1>
      </Document>
    );
  }
});

module.exports = SubPageDefault;
