import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import Router from 'react-router';
import App from 'components/App';

import 'assets/bower_components/bootstrap-customize/css/bootstrap.css';
import 'assets/styles/app.scss';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: require('./components/pages/Home')
  },
  childRoutes: [
    require('./routes/Normal'),
    require('./routes/Nested'),
    require('./routes/NotFound')
  ]
};

const history = createHistory();

const run = () => {
  ReactDOM.render(
    <Router routes={routes} history={history}/>,
    document.getElementById('app')
  );
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
