import React from 'react';
import Document from '../common/Document.js';
import {Link} from 'react-router';
import PageNestedDefault from './PageNestedDefault.js';

class PageNested extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <Document title='Page Nested | React-Flux' className='page-nested'>
        <div>
          <div className='row'>
            <div className='col-sm-9'>
              {this.props.children || <PageNestedDefault/>}
            </div>
            <aside className='col-sm-3'>
              <nav className='nav nav-pill'>
                <li><Link to='/nested'>Default</Link></li>
                <li><Link to='/nested/sub'>Sub page</Link></li>
              </nav>
            </aside>
          </div>
        </div>
      </Document>
    );
  }
}

export default PageNested;
