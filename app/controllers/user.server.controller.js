//เรียก moduls mongoose
var User = require('mongoose').model('User');
//var x = require('../modules/users/views/signup.client.view.jade');

//เขียนค่าลง flash message
var getErrorMessage = function(err){
	var message = '';
  //กรณี index error
	if (err.code) {
		switch (err.code){
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}else{//validate error
		for(var errName in err.errors){
			if(err.errors[errName].message){
				message = err.errors[errName].message;
			}
		}
	}
	return message;
};
//CRUD: create User form model
exports.create = function(req, res, next){
	//สร้าง user ที่เกิดจากการ req
	var user  = new User(req.body);

	user.save(function(err){
		if(err){
			return next(err);
		}else{
			res.json(user);
		}
	});
};
//CRUD: read user form model
exports.list = function(req, res, next){
	User.find({}, function(err, users){
		if (err){
			return next(err);
		}else{
			res.json(users);
		}
	});
};
//CRUD: read 1 record
exports.read = function(req, res){
	res.json(req.user);
};
exports.userByUsername = function(req, res, next, username){
	User.findOne({
		username: username
	}, function(err , user){
		if(err){
			return next(err);
		}else{
			req.user = user;
			next();
		}
	});
};
//CRUD:update
exports.update = function(req, res, next){
	User.findOneAndUpdate({username: req.user.username}, req.body,
		function(err, user){
			if(err){
				return next(err);
			}else{
				res.json(user);
			}
		});
};
//CRUD:delete
exports.delete = function(req, res, next){
	req.user.remove(function(err){
		if(err){
			return next(err);
		}else{
			res.json(req.user);
		}
	});
};

exports.renderSignup = function(req, res){
	  if(!req.user){
		res.render('signup',{
			title: 'Sign up',
			messages: req.flash('error')
	 	});
	 }else{
	 		return res.require('/');
	 }
};

exports.signup = function(req, res, next){
	if(!req.user){
		var user = new User(req.body);
		console.log(user);
		// user.firstName ="firstName";
		// user.lastName = "lastName";
		user.provider = 'local';

		user.save(function(err){
			if(err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
				req.login(user, function(err){
					if(err) return next(err);
					return res.redirect('/');
				});
			});
		}else{
			return res.redirect('/');
		}
};

exports.renderLogin = function(req, res){
	if(!req.user){
		res.render('login',{
			title: 'Log in',
			messages: req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/');
	}
};

// //Login
// exports.login = function(req, res){
// 	//Validate emall เป็นค่าว่างหรือไม่ มีรูปแบบเป็น email หรือไม่
// 	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
// 	req.sanitizeBody('email').normalizeEmail(); //clean
// 	var errors = req.validationErrors(); //ถ้าเกิด error ตัวแปล error จะมีค่า
// 	if(errors){
// 		res.render('index',{
// 			title: 'There have been validateion errors :' + JSON.stringify(errors),
// 			isLoggedIn: false //login ไม่สำเร็จ
// 		});
// 		return;
// 	}
// 	//แสดง emall และ password
// 		console.log(req.body);
// 		console.log('Email: ' +req.body.email);
// 		console.log('Password: '+req.body.password);
// 	//check value === remember ? | yes == true
// 	if(req.body.remember === 'remember'){
// 		req.session.remember = true;
// 		req.session.email = req.body.email; //remember email
// 		req.session.cookie.maxAge = 60000; //milliseconds ==1seconds
// 	}
// 	//login complete goto render index.jade
// 		res.render('index',{
// 			title: 'Login in as ' +req.body.email,
// 			isLoggedIn: true
// 		});
// };

//Logout
exports.logout = function(req, res){
	// req.session = null;
	// //logout complete goto render index.jade
	// res.render('index',{
	// 	title: 'See you again later',
	// 	isLoggedIn: false
	// });
	req.logout();
	res.redirect('/');
};

//สร้าง OAuth User
exports.saveOAuthUserProfile = function(req, profile, done){
	User.findOne({
		provider: profile.provider,
		providerID: profile.providerID
	},function(err, user){
		if(err) return done(err);
		else{
			if(!user){
				var possibleUsername = profile.username
						|| (profile.email ? profile.email.split('@')[0] : '');
				User.findUniqueUsername(possibleUsername, null, function(availableUsername){
					profile.username = availableUsername;
					user = new User(profile);
					user.save(function(err){
						if(err){
							var message = getErrorMessage(err);
							req.flash('error', message);
							return res.redirect('/signup');
						}
						return done(err, user);
					});
				});
			}else{
				return done(err, user);
			}
		}
	});
};
