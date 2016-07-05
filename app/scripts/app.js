'use strict';

/**
 * @ngdoc overview
 * @name soundVisualizerApp
 * @description
 * # soundVisualizerApp
 *
 * Main module of the application.
 */
angular
  .module('soundVisualizerApp', [
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
