var config = require('./config');
var mongoose  =require('mongoose');

//สร้าง module เรียกใช้ mongoose
module.exports = function(){
  //MODEL 3.เตรียมการใช้งาน
	mongoose.set('debug', config.debug); //เพิ่ม ลบ ข้อมูลดาต้าเบส จะทำแค่ development
	var db = mongoose.connect(config.mongoUri);  //เชื่อมต่อ db

	require('../app/models/user.server.model');

	return db;
};
