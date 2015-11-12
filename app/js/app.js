(function(){
  'use strict';
  var viewPath = './partial';
  angular.module('AwardApp', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'chart.js',
    'AwardControllers',
    'AwardServices'
  ])
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/home.html',
        controller:  'HomeCtrl'
      })
      .when('/ui', {
        templateUrl: viewPath + '/ui.html'
      })
      .otherwise({redirectTo: '/home'});

  }]);
})();
