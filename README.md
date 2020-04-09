# ts_boilerplate: Typescript Boilerplate
**Typescript Gulp Babel Boilerplate with a small router implementation.**


This boilerplate is still quite experimental but feel fre to use it.
To get starte just clone this repository and then:
- npm install
- npm run watch

The  [Gulp](https://gulpjs.com) build expects a directory structure under **src** like the one belpw.
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

Resources:
- The build has been inspired by [adaminstdead/boilerplate](https://github.com/adamisntdead/boilerplate)
- Typescript resources: [TypeScript HandBook](https://github.com/microsoft/TypeScript-Handbook)