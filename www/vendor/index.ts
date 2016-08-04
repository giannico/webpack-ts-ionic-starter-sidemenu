import * as angular from 'angular';
import * as angularAnimateModule from 'angular-animate';
import * as angularSanitizeModule from 'angular-sanitize';
const uiRouterModule: any = require('angular-ui-router');

// the following three requires aren't "npm-ready", so the require
// strings are just aliases to the actual js/css files that you would
// these resolves can be found in the webpack config resolve.alias section
require('ionic-js');
require('ionic-css');
require('ionic-angular');

require('lodash');

const mod = angular.module('vendor', [
    'ionic',
    angularAnimateModule,
    angularSanitizeModule,
    uiRouterModule,
]);

export default mod.name;