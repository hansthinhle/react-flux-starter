var React = require('react');
var Document = require('./Document');
var {Link, RouteHandler} = require('react-router');

var PageNested = React.createClass({
  render: function () {
    return (
      <Document title="Page Nested | React-Flux" bodyClass="page-nested">
        <div>
          <div className="row">
            <div className="col-sm-9">
              <RouteHandler/>
            </div>
            <aside className="col-sm-3">
              <nav className="nav nav-pill">
                <li>
                  <Link to="page-nested">Default</Link>
                </li>
                <li>
                  <Link to="page-nested-sub">Sub page</Link>
                </li>
              </nav>
            </aside>
          </div>
        </div>
      </Document>
    );
  }
});

module.exports = PageNested;
