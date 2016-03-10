import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import App from 'components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/styles/app.scss';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: require('components/pages/Home')
  },
  childRoutes: [
    require('routes/Sample'),
    require('routes/NotFound')
  ]
};

const run = () => {
  ReactDOM.render(
    <Router routes={routes} history={browserHistory}/>,
    document.getElementById('app')
  );
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
