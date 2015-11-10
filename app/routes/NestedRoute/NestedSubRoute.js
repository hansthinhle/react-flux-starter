export default {
  path: 'sub',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('../../components/pages/PageNestedSub'));
    }, 'page-nested-sub');
  }
};
