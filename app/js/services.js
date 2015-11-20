(function(){
  'use strict';
  angular.module('AwardServices', []).factory('Common', ['$http', function($http){

    return{
      /*
        处理来自cvs文件的数据，构造Object
        {
          catalog: String,
          details: [{
            id: Number,       学号
            name: String,     姓名
            gender: String,   性别，按学号分，16号以上为女性
            stamps: Array      争章数据
          }]
        }
      */
      dataHandle: function(data, source){
        var _data = data.split(/\r\n/).slice(0,38), chooseStart, chooseEnd;
        switch (source) {
          case 'term1-2':
            chooseStart = 2;
            chooseEnd = 10;
            break;
          case 'term2-1':
            chooseStart = 10;
            chooseEnd = 1e5;
            break;
          default:
            break;
        }

        return {
          catalog: _data[0].split(',').slice(chooseStart, chooseEnd),
          details: _data.slice(1).map(function(item){
            var _arr = item.split(',');

            return {
              id: _arr[0],
              name: _arr[1],
              gender: _arr[0] > 21 ? 'female' : 'male',
              stamps: _arr.slice(chooseStart, chooseEnd).map(function(item){
                return parseInt(item, 10);
              })
            };
          })
        };
      },

      localStorage: function(){
        var ls = window.localStorage;

        /*
          get: 获取json parse后的的值
          set: 将值stringify后存入本地
          clear: 清除所有本地缓存
          remove: 清除指定的缓存，并返回该值
        */
        return {
          get: function(key) {
            return JSON.parse(ls.getItem(key));
          },

          set: function(key, val) {
            var _val = JSON.stringify(val);
            ls.setItem(key, _val);
            return _val;
          },

          clear: function(){
            ls.clear();
            return null;
          },

          remove: function(key) {
            var _val = this.get(key);
            ls.removeItem(key);
            return _val;
          }
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
