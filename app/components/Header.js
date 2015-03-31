'use strict';
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var logoImg = require('../assets/images/logo.svg');

var Header = React.createClass({
  render: function () {
    return (
      <header className={'layout-header'}>
        <nav className={"navbar navbar-default"}>
          <div className={"container"}>
            <div className={"navbar-header"}>
              <button type="button" className={"navbar-toggle collapsed"} data-toggle="collapse" data-target="#navigation">
                <span className={"sr-only"}>Toggle navigation</span>
                <span className={"icon-bar"}></span>
                <span className={"icon-bar"}></span>
                <span className={"icon-bar"}></span>
              </button>
              <Link className={"navbar-brand"} to="app">
                <img width="20" src={logoImg}></img>
              </Link>
            </div>
            <div className={"collapse navbar-collapse"} id="navigation">
              <ul className={"nav navbar-nav"}>
                <li>
                  <Link to="page-normal">Page Normal</Link>
                </li>
                <li>
                  <Link to="page-nested">Page Nested</Link>
                </li>
                <li>
                  <a href="/xxxx">Page Not Found</a>
                </li>
              </ul>
              <ul className={"nav navbar-nav navbar-right"}>
                <li>
                  <a href="#">Link</a>
                </li>
                <li className={"dropdown"}>
                  <a href="#" className={"dropdown-toggle"} data-toggle="dropdown" role="button" aria-expanded="false">Dropdown
                    <span className={"caret"}></span>
                  </a>
                  <ul className={"dropdown-menu"} role="menu">
                    <li>
                      <a href="#">Action</a>
                    </li>
                    <li>
                      <a href="#">Another action</a>
                    </li>
                    <li>
                      <a href="#">Something else here</a>
                    </li>
                    <li className={"divider"}></li>
                    <li>
                      <a href="#">Separated link</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
