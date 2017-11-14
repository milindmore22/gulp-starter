# A fully featured asset pipeline based on gulp For WordPress Theme.

Gulp Starter applies community best practices and allows you to quick start your next project /
explore a new library's API without worrying too much about automatization tasks.

It is **project structure agnostic**. You can use any folder structure you like (the current one, component based etc).

You dont have to wait seconds until the re-compilation process is done, all tasks has
**incremental build optimalization**.

It is **backend agnostic**, you can use the opt-in sample api or any existing backend api.

This project is inspired by
[vigetlabs/gulp-starter](https://github.com/vigetlabs/gulp-starter).
[tsm91/gulp-starter/](https://github.com/tsm91/gulp-starter/)

```bash
git clone https://github.com/vigetlabs/gulp-starter.git MyApp
cd MyApp && npm i
```

## Notable features
- **CSS:**
  - [Sass](http://sass-lang.com/)
  - [Libsass](http://sass-lang.com/libsass) for super fast compiles
  - [Autoprefixer](https://github.com/postcss/autoprefixer) - the most popular [PostCSS](https://github.com/postcss/postcss) plugin
  - [CSSNext](http://cssnext.io/) - Use tomorrow’s CSS syntax, today.
  - CSS linting with [stylelint](http://stylelint.io/), [doiuse](http://www.doiuse.com/) and [colorguard](https://github.com/SlexAxton/css-colorguard)
  - Sourcemaps
- **JS:**
  - Modular ES6 with [Babel](http://babeljs.io/)
  - [Stage 1](https://github.com/tc39/ecma262#current-proposals) features
  - JS linting with [eslint](http://eslint.org/)
- **Development Mode:**
  - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
  - Sample api middleware
  - Live css inject without page reload
- **Production Builds:**
  - JS and CSS minification
  - Cache busting
  - File size reporting
  - Local production sever for testing

# Basic Usage
Make sure at least Node ^4.0.0 is installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

#### Install Dependencies
```
npm i
```

#### Start compiling, serving, and watching files
```
npm run dev
```

(or `gulp --dev`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `asset-pipeline/tasks/default.js`.

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers.

#### Configuration
Directory and top level settings are conveniently exposed in `asset-pipeline/config.js`. All task configuration objects have `src` and `dest` directories specified.

### Build production-ready files
```
npm run prod
```

This will compile revision and compressed files to `./dist/prod`. To build production files and preview them localy, run

```
npm run demo
```

(or `gulp --prod`)

If you want to check your production build run `npm run demo` http://localhost:8080. This is primarily meant as a way to preview your production build locally.

# FAQ

#### How to replace the sample API with an existing backend API?
Go to `asset-pipeline/tasks/browser-sync.js` comment out option A, and the `middleware` part.

```js
// A, if you don't have a backend api use the built in server
// server: {
//   baseDir: DEST_DIR
// },

// B, if you got a backend api proxy the request to it
proxy: 'example.com',

// custom middleware for mock api
// middleware(req, res, next) {
//   require(join(ROOT_DIR, 'api', 'api'))(req, res, next);
// },
```

#### Why Browserify?
[Why not?](https://gist.github.com/substack/68f8d502be42d5cd4942) I have abosuletly no problem with browserify.

## Customizations
### Removed Packages
 - eslint-config-airbnb removed airbnb eslint stanadard.

#### Additional Packages

- postcss-pxtorem Added package to convert pixel to css.
- eslint-config-wordpress Added package to for wordpress js stanarads


### Config Changes

- Updated Eslint confoguration file
```js

{
    "extends": "wordpress",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true,
            "arrowFunctions": true,
            "blockBindings": true,
            "classes": true,
            "defaultParams": true,
            "modules": true
        },
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "commonjs": true,
        "jquery": true
    },
    "rules": {
        "camelcase": [1],
        "space-in-parens": [1, "always"],
        "no-trailing-spaces": [1],
        "spaced-comment": [0],
        "padded-blocks": [0],
        "prefer-template": [0],
        "max-len": [0],
        "no-else-return": [0],
        "func-names": [0],
        "object-shorthand": [0]
    }
}

```
 - Stylelint file config rules

```js
{
  "ignoreFiles": "src/css/vendor/**",
  "extends": "stylelint-config-standard",
  "rules": {
    "block-no-empty": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-no-important": true,
    "font-weight-notation": "numeric",
    "max-empty-lines": 1,
    "selector-max-specificity": "0,3,1",
    "selector-pseudo-element-colon-notation": "double"
  }
}

```
- asset-pipline config file removed rev task from prod tasks.
- asset-pipline css task added preprocessor to convert `px` to `rem`

```js
const processors = [
  cssnext({
    warnForDuplicates: false
  }),
  autoprefixer({
    browsers: css.autoprefixerBrowsers
  }),
  assets({
    basePath: DEST_DIR,
    loadPaths: css.postCSSAssetsLoadPaths
  }),
  pxtorem( {
    rootValue: 16,
    unitPrecision: 5,
    propList: [ '*' ],
    selectorBlackList: [],
    replace: true,
    mediaQuery: true,
    minPixelValue: 2
  } )
];
```
