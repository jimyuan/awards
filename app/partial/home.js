(function(){
  'use strict';
  angular.module('HomeCtrlModule', []).controller('HomeCtrl', ['Common', '$scope', '$http', function(Common, $scope, $http){
    var ls = window.localStorage;
    // page title
    $scope.$parent.title = 'Home Page';

    /*
      打开页面后，发起ajax请求
      1. 将数据格式化备用
      2. 获取本轮章最多的同学
      3. 将数据存入本地供再次调用
    */
    var request = function(){
      $http.get('data/awards.csv').then(function(req){
        // 1
        $scope.awards = Common.dataHandle(req.data)
        // 2
        $scope.champion = $scope.awards.details.sort(function(a, b){
          var last = Common.last;
          return last(b.stamps) - last(a.stamps);
        })[0];
        // 3
        ls.setItem('awards', awards);
      });
    }();
  }]);
})();
