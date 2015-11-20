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
  .run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeStart', function(e){
      var path = $location.path();
      // 记录当前路径，用来高亮当前菜单
      $rootScope.curMenu = path;
      // 个人详情页面中无需页面过渡效果
      path.indexOf('/person/') > -1 ? $rootScope.noTransit = true
                                    : $rootScope.noTransit = false;
    });
  }])
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when('/home', {
        templateUrl: viewPath + '/home.html',
        controller:  'HomeCtrl'
      })
      .when('/last', {
        templateUrl: viewPath + '/last.html',
        controller:  'LastCtrl'
      })
      .when('/person/:id', {
        templateUrl: viewPath + '/person.html',
        controller:  'PersonCtrl'
      })
      .when('/person', {
        templateUrl: viewPath + '/person.html',
        controller:  'PersonCtrl'
      })
      .when('/compare', {
        templateUrl: viewPath + '/compare.html',
        controller:  'CompareCtrl'
      })
      .when('/compare/:id', {
        templateUrl: viewPath + '/compare.html',
        controller:  'CompareCtrl'
      })
      .when('/setting', {
        templateUrl: viewPath + '/setting.html',
        controller:  'SettingCtrl'
      })
      .otherwise({redirectTo: '/home'});

  }]);
})();
