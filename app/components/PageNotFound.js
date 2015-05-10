var React = require('react');
var Document = require('./Document');

var PageNotFound = React.createClass({
  render: function () {
    return (
      <Document title="PageNotFound|React-Flux" bodyClass="page-not-found">
        <h1>Page Not Found</h1>
      </Document>
    );
  }
});

module.exports = PageNotFound;
