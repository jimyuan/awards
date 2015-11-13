(function(){
  'use strict';
  angular.module('AwardServices', []).factory('Common', ['$http', function($http){

    return{
      /*
        处理来自cvs文件的数据，构造Object
        {
          catalog: String,
          detail:[{
            id: Number,       学号
            name: String,     姓名
            gender: String,   性别，按学号分，16号以上为女性
            stamps: Array      争章数据
          }]
        }
      */
      dataHandle: function(data){
        var _data = data.split(/\r\n/);
        return {
          catalog: _data[0].split(',').splice(2),
          details: _data.slice(1, _data.length-1).map(function(item){
            var _arr = item.split(',');
            return {
              id: _arr[0],
              name: _arr[1],
              gender: _arr[0] > 16 ? 'female' : 'male',
              stamps: _arr.slice(2).map(function(item){
                return parseInt(item, 10);
              })
            };
          })
        };
      },

      /*
        获取数组最后一个元素
      */
      last: function(arr) {
        return arr[arr.length - 1];
      }
    };
  }]);
})();
