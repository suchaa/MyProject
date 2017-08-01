//รองรับ request จาก ng-include ให้ jade render
module.exports = function(app){
  var partial = require('../controllers/partial.server.controller');
  app.get('/modules/:module/views/:partial', partial.render);
  //:module คือ parameter
};
