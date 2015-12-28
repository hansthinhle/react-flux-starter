export default {
  path: '*',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/NotFound'));
    }, 'page-not-found');
  }
};
