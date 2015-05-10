var React = require('react');
var Document = require('./Document');

var PageNormal = React.createClass({
  render: function () {
    return (
      <Document title="Page Normal | React-Flux" bodyClass="page-normal">
        <div>
          <h1>Page Normal</h1>
        </div>
      </Document>
    );
  }
});

module.exports = PageNormal;
