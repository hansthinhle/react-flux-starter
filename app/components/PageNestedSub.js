var React = require('react');
var Document = require('./Document');

var PageNestedSub = React.createClass({
  render: function () {
    return (
      <Document title="PageNestedSub | React-Flux" bodyClass="page-nested-sub">
        <h1>Sub page</h1>
      </Document>
    );
  }
});

module.exports = PageNestedSub;
