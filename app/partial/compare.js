(function(){
  'use strict';
  angular.module('CompareCtrlModule', []).controller('CompareCtrl', ['Common',  '$routeParams', '$scope', function(Common, $routeParams, $scope){

    var ls = Common.localStorage(), awards = ls.get('awards');


    var lineChart = function(date){
      var chartOption = {
        labels: awards.catalog,
        options: angular.extend(
          $scope.$parent.ctGlobOpts,
          $scope.$parent.ctLineOpts,
          {datasetFill : false}
        )
      };
      var _obj = angular.extend(chartOption, {
        series: date.map(function(item){
          return item.name;
        }),
        data: date.map(function(item){
          return item.stamps;
        })
      });

      return _obj;
    };

    $scope.showList = false;
    $scope.compareList = [];

    if($routeParams) {
      $scope.mates = awards.details.filter(function(item) {
        if(item.id !== $routeParams.id) {
          return item;
        } else {
          $scope.compareList.push(item);
        }
      });
      $scope.chart = lineChart($scope.compareList);
    }
    console.log($scope.compareList);

    /*
      对比候选名单，存入$sope.mates
    */
    $scope.candidateSwitch = function(){
      this.showList = !this.showList;

      if(!this.mates) {
        this.mates = awards.details;
      }
    };

    /*
      选择需对比的记录，存入$scope.compareList
    */
    $scope.addCompare = function(index){
      if(this.compareList.length>=4) {
        alert('人太多，挤不下啦！');
      } else {
        var _compare = this.mates.splice(index, 1);
        this.compareList.push(_compare[0]);
        $scope.chart = lineChart(this.compareList);
        // $scope.chart = angular.extend(chart, {
        //   series: this.compareList.map(function(item){
        //     return item.name;
        //   }),
        //   data: this.compareList.map(function(item){
        //     return item.stamps;
        //   })
        // });
      }
    };

    /*
      从$scope.compareList里移除记录，放回$scope.mates里
    */
    $scope.removeCompare = function(index){
      var _compare = this.compareList.splice(index, 1);
      this.mates.push(_compare[0]);

      // $scope.chart = angular.extend(chart, {
      //   series: this.compareList.map(function(item){
      //     return item.name;
      //   }),
      //   data: this.compareList.map(function(item){
      //     return item.stamps;
      //   })
      // });
      $scope.chart = lineChart(this.compareList);
    };

  }]);
})();
