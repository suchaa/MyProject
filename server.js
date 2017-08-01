//ถ้าตัวมันเองไม่เคยมีค่าให้เป็น development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//connect mongoDB
var mongoose = require('./config/mongoose'); //โหลดmongoose ให้เสร็จก่อนโหลดอย่างอื่น
// var uri = 'mongodb://localhost/my-project'; //ไม่ควร fig ไว้ตรงนี้ เผื่ออยากติดต่อ db อื่น หรือ host อื่น
// var db = mongoose.connect(uri);
var express = require('./config/express');
var passport = require('./config/passport')
var db = mongoose();
//4. สร้างแอพพลิเคชั่นเรียกใช้ config
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app; //เพื่อให้คนอื่นนำไปใช้ได้
console.log('Server running at http://localhost:3000');
