import * as angular from 'angular';
import { AppCtrl, PlaylistsCtrl, PlaylistCtrl } from './controllers';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['vendor']).

run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova) {
            const plugins: any = window.cordova.plugins;

            if (plugins.Keyboard) {
                plugins.Keyboard.hideKeyboardAccessoryBar(true);
                plugins.Keyboard.disableScroll(true);
            }
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.
        state('app', {
            url: '/app',
            abstract: true,
            template: require('./templates/menu.html'),
            controller: AppCtrl
        }).

        state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    template: require('./templates/search.html')
                }
            }
        }).

        state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    template: require('./templates/browse.html')
                }
            }
        }).

        state('app.playlists', {
            url: '/playlists',
                views: {
                    'menuContent': {
                        template: require('./templates/playlists.html'),
                        controller: PlaylistsCtrl
                    }
                }
        }).

        state('app.single', {
            url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        template: require('./templates/playlist.html'),
                        controller: PlaylistCtrl
                    }
                }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
});