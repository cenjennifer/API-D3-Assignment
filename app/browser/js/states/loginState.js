angular.module('app').config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/',
        templateUrl: '/browser/templates/login.html',
        controller: 'LoginCtrl'
    });
});