'use strict';

var mainAppModuleName = 'Main';
//ใส่ hello คือ เรียกใช้ module hello
var mainAppModule = angular.module(mainAppModuleName, ['ui.router', 'core', 'users']); //ลงทะเบียน module

//var mainAppModule = angular.module('Main', []); //ลงทะเบียน module

angular.element(document).ready(function(){
  angular.bootstrap(document.querySelector('#mainApp'), [mainAppModuleName],{
    strictDi: true
  });
});

mainAppModule.controller('NameController', ['$scope','$http', function($scope, $http){
  $scope.yourName = 'No Name'; //bind กับ yourName ใน view
  var users_json = $http.get('user'); //ใส่แลัว error
}]);

mainAppModule.filter('sayhello', function(){
  return function(name){
    return 'Hello, ' + name;
  };
});
