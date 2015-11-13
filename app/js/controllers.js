(function(){
  'use strict';
  angular.module('AwardControllers', ['HomeCtrlModule'])
  .controller('GlobCtrl', ['$location', '$scope', function($location, $scope){
    var ls = window.localStorage;

    $scope.showMenu = false;
    
    // 检测无本地文件时，返回首页加载数据
    if(!ls || !ls.getItem('awards')) {
      $location.replace();
    }
    console.log('global!')
  }]);
})();
