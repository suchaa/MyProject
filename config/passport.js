var passport = require('passport');
var mongoose = require('mongoose'); //มีการเชื่อมต่อกัย db

module.exports = function(){
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done){
		done(null, user.id); //authenticate เสร็จเอาค่า id เก็บใน cookie
	});

	passport.deserializeUser(function(id, done){
		User.findOne({_id: id}, function(err, user){
			done(err, user); //เมื่อใช้ user id จะดึงมาจาก db
		});
	});
	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
	require('./strategies/google.js')();
};
