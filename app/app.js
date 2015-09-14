import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import App from './components/App.js';

import './bower_components/bootstrap-customize/css/bootstrap.css';
import './assets/styles/app.scss';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    require('./routes/NormalRoute'),
    require('./routes/NestedRoute'),
    require('./routes/NotFoundRoute')
  ]
};

const history = createHistory();

const run = () => {
  React.render(<Router routes={routes} history={history}/>, document.body);
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
