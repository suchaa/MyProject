angular.module('users').config([ //ทำงานตอนเริ่มแอพ
  '$stateProvider', //ไว้จัดการ state
  function($stateProvider){
    $stateProvider
      .state('login', { //ชื่อ state
        url: '/login', //url ที่ผูกกับ state
        //จะนำไปใส่ที่ div ui-view
        templateUrl: '/modules/users/views/login.client.view.jade'
      })
      .state('signup',{
        url: '/signup',
        templateUrl: '/modules/users/views/signup.client.view.jade'
      });
  }]);
