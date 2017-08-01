//สร้าง routing state ด้วย $stateProvider
angular.module('hello').config([ //ทำงานตอนเริ่มแอพ
  '$stateProvider', //ไว้จัดการ state
  function($stateProvider){
    $stateProvider
      .state('hello', { //ชื่อ state
        url: '/', //url ที่ผูกกับ state
        //จะนำไปใส่ที่ div ui-view
        templateUrl: '/modules/hello/views/hello.client.view.jade'
      })
      .state('nohello',{
        url: '/nohello',
        template: '<a ui-sref="hello">Back to hello state<a/>'
      });
  }]);
