(function(){
  'use strict';
  angular.module('HomeCtrlModule', []).controller('HomeCtrl', ['$scope', function($scope){

    $scope.$parent.title = 'Home Page';
    // code here
  }]);
})();
