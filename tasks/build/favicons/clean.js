import del from 'del';

export default () => {
  del.sync(['app/_favicons.html']);
};
