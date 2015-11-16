(function(){
  'use strict';
  angular.module('AwardControllers', [
    'HomeCtrlModule',
    'LastCtrlModule',
    'PersonCtrlModule'
  ])
  .controller('GlobCtrl', ['$location', '$scope', function($location, $scope){
    var ls = window.localStorage, path;

    // $scope.title = '本轮冠军';
    // slide menu switch
    $scope.showMenu = false;

    $scope.slideMenu = {
      '本轮冠军' : {route: 'home', icon: 'home'},
      '本轮概况' : {route: 'last', icon: 'database'},
      '个人详情' : {route: 'person', icon: 'user'},
      '成绩对比' : {route: 'compare', icon: 'line-chart'}
    };

    // global chart.js options
    $scope.chartOptions = {
      scaleLineColor: 'white',
      scaleFontColor: 'white',
      scaleBeginAtZero: true,
      tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>票',
    }

    // click action when slide menu
    $scope.menuJump = function(curMenu){
      var self = this;
      if(!curMenu) {
        path = $location.path();
        angular.forEach(self.slideMenu, function(val, key){
          if (path.indexOf(val.route) > 0) {
            self.title = key;
          }
        });

      } else {
        path = $scope.slideMenu[curMenu].route;
        $scope.title = curMenu;
        $scope.showMenu = !$scope.showMenu;
        $location.path('/' + path);
      }
    };
    $scope.menuJump();

    // 检测无本地文件时，返回首页加载数据
    if(!ls || !ls.getItem('awards')) {
      $location.replace();
    }
  }]);
})();
