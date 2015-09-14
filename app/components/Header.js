import React from 'react';
import {Link} from 'react-router';

const logo = require('../assets/images/logo.svg');

class Header extends React.Component {
  render() {
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
              <Link className='navbar-brand' to='/'>
                <img width='20' src={logo}></img>
              </Link>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li><Link to='/normal'>Page Normal</Link></li>
                <li><Link to='/nested'>Page Nested</Link></li>
                <li><a href='/other'>Page Not Found</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;

