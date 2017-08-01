angular.module('users').controller('AuthController', [
  '$scope',
  '$http',
  '$state',
  //'Auth',
  function($scope, $http, $state){
    //*$scope.auth = Auth; //เพื่อให้เรียกใช้ได้
    $scope.signup = function(isValid){
      if(isValid){
        //alert('Ready to sent signup request');
        $http.post('/signup', $scope.user)
        .success(function(response){
        $state.go('home');
        //window.location.href='/';
        })
        .error(function(response){
          $scope.error = response.message;
        });
      }
    };

    $scope.login = function(isValid){
      if (isValid) {
        //alert('Ready to sent login request');
        $http.post('/login', $scope.user)
        .success(function(response){
        $state.go('home');
        //window.location.href='/';
        })
        .error(function(response){
          $scope.error = response.message;
        });
      }
    };
  }
]);
