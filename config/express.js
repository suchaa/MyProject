//3. สร้าง config ของ express instance และส่งค่าให้ routes
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var Validator = require('express-validator');
// var cookieSession = require('cookie-session');
var session = require('express-session');
var flash = require("connect-flash");
var passport = require('passport');

module.exports = function(){
  	var app = express();

    //เช็คว่าเป็น dev หรือ production
  	if(process.env.NODE_ENV === 'development'){
  		app.use(morgan('dev'));
  	}else{
 		   app.use(compression);
  	}

    app.use(session({
  		//secret: config.sessionSecret,
      secret: 'secret_key',
  		resave: false,
  		saveUninitialized: true
  	}));

   app.use(flash());
   app.use(passport.initialize()); //เริ่มทำงาน passport
   app.use(passport.session()); //ใช้ร่วมกับ express session

   app.use(bodyParser.urlencoded({
   		extended: true
   }));
   app.use(bodyParser.json());

 	 //ใส่ต่อจาก bodyParser ทันที
   app.use(Validator());

  //ใช้งาน jade
	 //app.set('views','./app/views');
   app.set('views', ['./app/views', './public']); //หา view ไฟล์ตามลำดับ
   app.set('view engine', 'jade');

	 require('../app/routes/index.server.routes')(app);
   require('../app/routes/user.server.routes')(app);
   require('../app/routes/partial.server.routes')(app);

//เอาไว้ก่อน express.static เพื่อคอมไพล์ก่อนค่อยส่ง response กลับ
	app.use(sass({
		src: './sass',
		dest: './public/css', //เวลาคอมไพล์แล้วไปอยู่ที่ไหน
		outputStyle: 'compact', //compact ไฟล์ css อ่านง่าย
		prefix: '/css', //ตัด css ทิ้ง เอาแค่ main.css
    debug: true //ถ้าไม่ใส่จะไม่มี debug ขึ้น
	}));

  //เอาไว้หลัง routing เพื่อความเร็ว
  app.use(express.static('./public'));

  return app;
};
