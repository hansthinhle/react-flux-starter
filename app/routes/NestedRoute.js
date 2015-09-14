export default {
  path: '/nested',
  getComponents(location, callback) {
    require.ensure([], require => {
      callback(null, require('../components/pages/PageNested'));
    }, 'page-nested');
  },
  getChildRoutes(location, callback) {
    require.ensure([], () => {
      callback(null, [{
        path: 'sub',
        component: require('../components/pages/PageNestedSub')
      }]);
    }, 'page-nested-sub');
  }
};
