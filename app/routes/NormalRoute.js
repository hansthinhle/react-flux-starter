export default {
  path: 'normal',
  getComponents(location, callback) {
    require.ensure([], require => {
      callback(null, require('../components/pages/PageNormal'));
    }, 'page-normal');
  }
};
