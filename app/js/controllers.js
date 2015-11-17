(function(){
  'use strict';
  angular.module('AwardControllers', [
    'HomeCtrlModule',
    'LastCtrlModule',
    'PersonCtrlModule'
  ])
  .controller('GlobCtrl', ['$rootScope', '$location', '$scope', function($rootScope, $location, $scope){
    var ls = window.localStorage, path;

    // page transition switch
    // $rootScope.noTransit = false;
    // slide menu switch
    $scope.showMenu = false;

    $scope.slideMenu = {
      '本轮冠军' : {route: '/home', icon: 'home'},
      '本轮概况' : {route: '/last', icon: 'database'},
      '个人详情' : {route: '/person', icon: 'user'},
      '成绩对比' : {route: '/compare', icon: 'line-chart'}
    };

    // global chart.js options
    $scope.ctGlobOpts = {
      scaleLineColor: 'white',
      scaleFontColor: 'white',
      scaleBeginAtZero: true,
      tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>票',
    }
    // line chart options
    $scope.ctLineOpts = {
      pointDotRadius : 2,
      pointDotStrokeWidth : 0,
      pointHitDetectionRadius : 5
    }

    // click action when slide menu
    $scope.menuJump = function(path){
      $location.path(path);
      $scope.showMenu = !$scope.showMenu;
    };

    // 检测无本地文件时，返回首页加载数据
    if(!ls || !ls.getItem('awards')) {
      $location.replace();
    }

  }]);
})();
