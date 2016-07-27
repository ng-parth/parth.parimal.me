'use strict';

var fundooStockTicker = angular.module('fundooStockTicker', ['ng']);


// ROUTES
fundooStockTicker.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            //templateUrl: '/Templates/list.html',
            templateUrl: 'list.html',
            controller: 'listCtrl'
        })
        .when('/create', {
            //templateUrl: '/Templates/create.html',
            templateUrl: 'create.html',
            controller: 'createCtrl'
        })
        .when('/edit/:id', {
            //templateUrl: '/Templates/edit.html',
            templateUrl: 'edit.html',
            controller: 'editCtrl'
        })
        .when('/login', {
            //templateUrl: '/Templates/login.html',
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

