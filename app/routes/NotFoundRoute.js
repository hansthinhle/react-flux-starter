export default {
  path: '*',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('../components/pages/PageNotFound'));
    }, 'page-not-found');
  }
};
