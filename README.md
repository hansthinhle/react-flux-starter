# React Flux Starter

React + Flux + React router + Webpack + Babel + ...

## Features included

- Webpack dev server with proxy support (express, http-proxy, webpack-dev-middleware, webpack-hot-middleware, babel-plugin-react-transform, react-transform-hmr)
- Babel 
- ESLint
- Favicons generator (favicons)
- Minify html (html-webpack-plugin, html-loader) 
- Uglify js (UglifyJsPlugin)
- Extract text from bundle into a file (extract-text-webpack-plugin)
- Minify css (postcss, autoprefixer, cssnano)
- Minify images (gulp-imagemin)
- Revision
- ...

## Getting Started

```bash
git clone git@github.com:vn38minhtran/react-flux-starter.git example
cd example
npm install && bower install
npm start
```

## HTTPS server

### Change config.json
- Change devURL from `http://localhost:3000` to `https://localhost:3000`.
 
### Generate self-signed certificate

```bash
openssl genrsa -out key.pem && openssl req -new -key key.pem -out csr.pem && openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem && rm csr.pem
```
