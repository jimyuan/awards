(function(){
  'use strict';
  angular.module('PersonCtrlModule', []).controller('PersonCtrl', ['Common', '$routeParams', '$location', '$scope', function(Common, $routeParams, $location, $scope){

    var id = $routeParams.id || '1',
        awards = Common.localStorage().get('awards'),
        labels = awards.catalog,
        person = awards.details.find(function(item){
          return item.id === id;
        }),
        stamps = person.stamps;

    $scope.person = person;

    $scope.chart = {
      labels: awards.catalog,
      data: [stamps],
      options: $scope.$parent.chartOptions
    };

    $scope.count = {
      max: Math.max.apply(null, stamps),
      min: Math.min.apply(null, stamps),
      avg: function(){
        return Math.round(this.sum() / stamps.length);
      },
      sum: function(){
        var s = 0;
        for(var i = 0, x = stamps.length; i < x; i ++) {
          s += stamps[i];
        }
        return s;
      }
    };

    $scope.changePerson = function() {
      var _id = parseInt(id, 10) + arguments[0];
      console.log(stamps.length);
      if(arguments[0] !== 0 && _id > 0 && _id <= awards.details.length) {
        $location.path('/person/' + _id);
      } else if (arguments[0] === 0) {
        $location.path('/last');
      }
    }

  }]);
})();
