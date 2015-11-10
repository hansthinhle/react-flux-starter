export default {
  path: 'normal',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('../components/pages/PageNormal'));
    }, 'page-normal');
  }
};
