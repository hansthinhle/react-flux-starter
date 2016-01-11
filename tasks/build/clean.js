import del from 'del';

export default () => {
  del.sync(['dist']);
};
