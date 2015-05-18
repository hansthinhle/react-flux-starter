var React = require('react');
var Document = require('./Document');

var PageHome = React.createClass({
  render: function () {
    return (
      <Document title="Home | React-Flux" bodyClass="page-home">
        <div>
          <h1>Page Home</h1>
        </div>
      </Document>
    );
  }
});

module.exports = PageHome;
