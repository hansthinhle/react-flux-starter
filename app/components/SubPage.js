var React = require('react');
var Document = require('./Document');

var SubPage = React.createClass({
  render: function () {
    return (
      <Document title="Subpage | PageNested | React-Flux" bodyClass="page-nested-sub-page">
        <h1>Subpage</h1>
      </Document>
    );
  }
});

module.exports = SubPage;
