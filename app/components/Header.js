var React = require('react');
var {Link} = require('react-router');
var logoImg = require('../assets/images/logo.svg');

var Header = React.createClass({
  render: function () {
    return (
      <header className='layout-header'>
        <nav className='navbar navbar-inverse'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <Link className='navbar-brand' to='app'>
                <img width='20' src={logoImg}></img>
              </Link>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li><Link to='page-normal'>Page Normal</Link></li>
                <li><Link to='page-nested'>Page Nested</Link></li>
                <li><a href='/other'>Page Not Found</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
