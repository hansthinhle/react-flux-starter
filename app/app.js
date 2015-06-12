var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

var Header = require('./components/Header');
var Footer = require('./components/Footer');

require('./bower_components/bootstrap-customize/css/bootstrap.css');
require('./assets/styles/app.scss');

var App = React.createClass({
  render: function () {
    return (
      <div className='layout-page'>
        <Header/>
        <main className='layout-main'>
          <div className='container'>
            <RouteHandler/>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
});

var PageHome = require('react-proxy-plus?name=page-normal!./components/PageHome');
var PageNormal = require('react-proxy-plus?name=page-normal!./components/PageNormal');
var PageNested = require('react-proxy-plus?name=page-nested!./components/PageNested');
var PageNestedDefault = require('react-proxy-plus?name=page-nested-default!./components/PageNestedDefault');
var PageNestedSub = require('react-proxy-plus?name=page-nested-sub!./components/PageNestedSub');
var PageNotFound = require('react-proxy-plus?name=page-not-found!./components/PageNotFound');

var routes = (
  <Route name="app" path='/' handler={App}>
    <DefaultRoute handler={PageHome}/>
    <Route name="page-normal" path='normal' handler={PageNormal}/>
    <Route name="page-nested" path='nested' handler={PageNested}>
      <DefaultRoute handler={PageNestedDefault}/>
      <Route name="page-nested-sub" path='sub' handler={PageNestedSub}/>
    </Route>
    <NotFoundRoute name="page-not-found" handler={PageNotFound}/>
  </Route>
);

function run() {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    if (document.body.className.indexOf('render') === -1) {
      document.body.className += document.body.className.length ? ' render' : 'render';
    }
    React.render(<Handler/>, document.body);
  });
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
