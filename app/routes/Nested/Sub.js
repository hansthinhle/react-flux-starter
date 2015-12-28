export default {
  path: 'sub',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/Nested/Sub'));
    }, 'page-nested-sub');
  }
};
