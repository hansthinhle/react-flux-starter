export default {
  path: 'sample',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/Sample'));
    }, 'page-sample');
  }
};
