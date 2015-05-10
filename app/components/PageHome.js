var React = require('react');
var Todo = require('./Todo');
var Document = require('./Document');

var PageHome = React.createClass({
  render: function () {
    return (
      <Document title="Home|React-Flux" bodyClass="page-home">
        <div>
          <section className="page-header">
            <h1>Todo</h1>
          </section>
          <section className="main-content">
            <Todo />
          </section>
        </div>
      </Document>
    );
  }
});

module.exports = PageHome;
