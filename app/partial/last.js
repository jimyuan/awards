(function(){
  'use strict';
  angular.module('LastCtrlModule', []).controller('LastCtrl', ['Common', '$location', '$scope', function(Common, $location, $scope){

    var ls = Common.localStorage(),
        details = ls.get('awards').details,
        lastStamp = [];

    for(var i = 0, x = details.length; i < x; i++) {
      lastStamp.push({
        id: details[i].id,
        name: details[i].name,
        stamp: Common.last(details[i].stamps)
      });
    }

    $scope.lastStamp = lastStamp;

    $scope.personPage = function(id){
      var path = '/person/' + id;
      $scope.$parent.title = '个人详情';
      $location.path(path);
    };

  }]);
})();
