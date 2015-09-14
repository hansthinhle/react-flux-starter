export default {
  path: 'sub',
  getComponents(location, callback) {
    require.ensure([], require => {
      callback(null, [
        require('../../components/pages/PageNestedSub')
      ]);
    }, 'page-nested-sub');
  }
};
