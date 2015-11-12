(function(){
  'use strict';
  angular.module('AwardControllers', ['HomeCtrlModule'])
  .controller('GlobCtrl', ['$scope', function($scope){

    $scope.showMenu = false;
    console.log('global!')
  }]);
})();
