export default {
  path: 'nested',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/Nested'));
    }, 'page-nested');
  },
  indexRoute: {
    getComponent(location, callback) {
      require.ensure([], require => {
        callback(null, require('components/pages/Nested/Default'));
      }, 'page-nested');
    }
  },
  getChildRoutes(location, callback) {
    require.ensure([], () => {
      callback(null, [
        require('./Sub')
      ]);
    }, 'page-nested');
  }
};
