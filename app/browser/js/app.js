var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});