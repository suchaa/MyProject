//1. สร้าง routes ไปเรียก controller ของฟีเจอร์
module.exports = function(app){
	//ไปเรียกไฟล์ index.server.controller
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render); //เรียก function
};
