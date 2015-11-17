(function(){
  'use strict';
  angular.module('HomeCtrlModule', []).controller('HomeCtrl', ['Common', '$scope', '$http', function(Common, $scope, $http){
    /*
      打开页面后，发起ajax请求
      1. 将数据JSON化后存入本地
      2. 获取本地获奖数据
      3. 获取本轮章最多的同学
      4. 显示夺冠票数
      5. 显示夺冠轮次
      6. 显示图表
    */
    var request = function(){
      var last = Common.last,
          ls = Common.localStorage(),
          awards;

      $http.get('data/awards.csv').then(function(req){
        // 1
        ls.set('awards', Common.dataHandle(req.data));
        // 2
        awards = ls.get('awards');
        // 3
        $scope.champion = awards.details.sort(function(a, b){
          return last(b.stamps) - last(a.stamps);
        })[0];
        // 4
        $scope.stamp = last($scope.champion.stamps);
        // 5
        $scope.catalog = last(awards.catalog);
        // 6
        $scope.chart = {
          labels: awards.catalog,
          data: [$scope.champion.stamps],
          options: angular.extend(
            $scope.$parent.ctGlobOpts,
            $scope.$parent.ctLineOpts
          )
        }
      });
    }();
  }]);
})();
