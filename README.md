# ts_boilerplate: Typescript Boilerplate
**Typescript Gulp Babel Boilerplate with a small router implementation.**


This boilerplate is still quite experimental but feel fre to use it.
To get starte just clone this repository and then:
- npm install
- npm run watch

The  [Gulp](https://gulpjs.com) build expects a directory structure under **src** like the one below.
- src/
- ├───assets
- │   └───data
- ├───html
- ├───img
- ├───js
- │   └───routing
- ├───scss
- └index.html

There are two main build tasks:
- build (default) that rund the build and produces the output on ./dist/
- watch which after calling build starts an HTML server from ./dist/ (for development purpose only)

**The samples**

Note that the samples are there to show the features of the build.
Bootstrap is used to show how to mange JS frontend libs and CSS include.

If you need to change the directories default configurations or to change the libs and CSS inclucde, the have a look at the config... below an example

```js
var settings = {
    distdir: './dist',
    css: {
        source: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            './src/scss/**/*.{scss,sass,css}'
        ],
        dest: ''
    },
    html: {
        watch: './src/**/*.html',
        source: './src/*.html',
        dest: '',
        formatting: {
            indent: 4,
            indent_char: ' ',
            wrap_line_length: 78,
            brace_style: 'expand',
            unformatted: ['sub', 'sup', 'b', 'i', 'u', 'span', 'quote', 'strong']
        }
    },
    assets: {
        source: './src/assets/**/*.*',
        dest: ''
    },
    js: {
        vendor: 'dist/libs/',
        libs: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        libdest: [],
        monitor: ['src/**/*.ts'],
        entry: './src/js/main.ts',
        output: 'bundle.js',
        dest: ''
    }
}
``` 

Resources:
- The build has been inspired by [adaminstdead/boilerplate](https://github.com/adamisntdead/boilerplate)
- Typescript resources: [TypeScript HandBook](https://github.com/microsoft/TypeScript-Handbook)