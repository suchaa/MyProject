//factory หลายๆที่สามารถใช้ร่วมกันได้
/*
angular.module('users').factory('Auth', [
  function(){
    return {
      user: window.user
    };
  }
]);
*/

// Authentication service for user variables
angular.module('users').factory('Auth', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
]);
