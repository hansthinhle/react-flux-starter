var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Header = require('./components/Header');
var Notify = require('./components/Notify');

require('bootstrap');
require('./assets/styles/app.scss');

var App = React.createClass({
  render: function () {
    return (
      <div className={"layout-page"}>
        <Header/>
        <main className={"layout-main"}>
          <div className={"container"}>
            <RouteHandler/>
          </div>
        </main>
        <Notify/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={require('./components/PageHome')}/>
    <Route name="page-normal"
      handler={require('react-proxy?name=page-normal!./components/PageNormal')}/>
    <Route name="page-nested"
      handler={require('react-proxy?name=page-nested!./components/PageNested')}>
      <DefaultRoute
        handler={require('react-proxy?name=subpage-default!./components/SubPageDefault')}/>
      <Route name="sub-page"
        handler={require('react-proxy?name=subpage!./components/SubPage')}/>
    </Route>
    <NotFoundRoute name="not-found"
      handler={require('react-proxy?name=page-not-found!./components/PageNotFound')}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
