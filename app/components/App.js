import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PageHome from './pages/PageHome.js';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div className='layout-page'>
        <Header/>
        <main className='layout-main'>
          <div className='container'>
            {this.props.children || <PageHome/>}
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
