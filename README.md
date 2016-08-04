# webpack-ts-ionic-starter-sidemenu

This is a modernized version of the sidemenu starter template for the [Ionic Framework](http://ionicframework.com/).

## Quick Start

Install Node.js and then:

```sh
git clone git://github.com/giannico/webpack-ts-ionic-starter-sidemenu
cd webpack-ts-ionic-starter-sidemenu
npm install
npm install -g typings
typings install
npm run start
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

The development server (`npm run start`) is based on `webpack-dev-server` and triggers browser reloads automatically on file changes.

## Goal

`webpack-ts-ionic-starter-sidemenu` is designed to provide a template for working with Ionic, Webpack, and TypeScript.

The demo application has the same functionality as the ionic sidemenu template that would be generated via the `ionic start myApp sidemenu` command, so it should be familiar to ionic users.

The application code has been minimally refactored to support TypeScript modules. Eventually, it will be refactored in into a more manageable feature-based application structure.

## Note

The goal of the current state of the project is just to get a development project up and running. The ability to run the application in emulation mode/and or build the application has not yet been fully explored (hence the single `npm run start` command being offered).