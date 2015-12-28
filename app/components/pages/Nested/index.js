import React from 'react';
import Document from 'components/common/Document';
import {Link} from 'react-router';

class NestedPage extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <Document title='Page Nested | React-Flux' className='page-nested'>
        <div>
          <div className='row'>
            <div className='col-sm-9'>
              {this.props.children}
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

export default NestedPage;
