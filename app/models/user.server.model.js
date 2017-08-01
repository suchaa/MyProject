var mongoose  = require('mongoose');
var crypto = require('crypto'); //การเข้ารหัส มีมาให้อยู่แล้วใน express
var Schema  = mongoose.Schema;

// MODEL 1. สร้าง Schema
var UserSchema  = new Schema({
 	firstName:{
    type:  String,
    //required:'firstName is required'
  },
	lastName: {
    type: String,
  //  required:'lastName is required'
  },
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
	//email: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\.+/
  },
  // role:{
  //   type: String,
  //   enum: ['Admin', 'Owner', 'User'],
  // },
 	password: {
    type: String,
/*
    validate:[
      function(password){
        return password && password.length >= 6;


      },'password must be at least 6 characters']
      */
  },


  salt:{ //ใช้ทำ password hash
    type: String
  },

  provider:{ //strategy ที่ user ลงทะเบียน
    type: String,
    required:'Provider is required'
  },
  //user id ที่ได้จาก provider
  providerID: String,
  providerData: {}, //ไว้เก็บข้อมูลจาก OAuth provider
  create: {type: Date, default: Date.now}

});

UserSchema.pre('save', function(next) {
    if (this.password) {
        //this.password = this.saltHashPassword(this.password);
        //console.log(this.password);
        this.salt = crypto.randomBytes(Math.ceil(16/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,16);
        this.password = this.sha512(this.password);

        console.log('Salt pre save = '+  this.salt);
        console.log('password pre save = '+this.password);
    }
    next();
});

// UserSchema.methods.genRandomString = function(length){
//     this.salt = new Buffer(crypto.randomBytes(Math.ceil(length/2))
//             .toString('hex') /** convert to hexadecimal format */
//             .slice(0,length), 'base64');   /** return required number of characters */
//
//     return this.salt;
// };

UserSchema.methods.sha512 = function(password){
    var hash = crypto.createHmac('sha512', this.salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    // return {
    //     salt:salt,
    //     passwordHash:value
    // };
    return value;
};

// UserSchema.methods.saltHashPassword = function(password){
//     //this.salt = this.genRandomString(16); /** Gives us salt of length 16 */
//     passwordData = this.sha512(password, this.salt);
//
//     //console.log('UserPassword = '+password);
//     //console.log('salt === '+this.salt);
//     ///console.log('Passwordhash = '+passwordData.passwordHash);
//
//     return passwordData.passwordHash;
// }

UserSchema.methods.authenticate =  function(password) {
  /*
    console.log('password in DB = '+ this.password);
    console.log('password for user = '+password);
    console.log('password for user + hash ='+this.sha512(password));
  */
    return this.password === this.sha512(password);
};

/*
//ก่อน save ให้เข้ารหัส password
UserSchema.pre('save', function(next){
  if(this.password){
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
    console.log('salt = '+this.salt);
    console.log('password = '+this.password);
  }
  next;
});

//สร้าง method ให้กับ model instance
UserSchema.methods.hashPassword = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 1000000, 64, 'sha1').toString('base64');
  //console.log(crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64'));
};

UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
}
*/

/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my-project2', function(err){
    if(err){
        console.log('database not connected');
    }
});
var Schema = mongoose.Schema;
var userschema = new Schema ({});
var user = mongoose.model('users', userschema);
user.findOne({username:this.username},function(err,data){
         if(err){
         console.log(err);
         }
        console.log(data);
    });

*/
//สร้าง OAuth User

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
  var _this = this;
  var possibleUsername = username + (suffix || '');
  _this.findOne({
    username: possibleUsername
  }, function(err, user){
    if(!err){
      if(!user) callback(possibleUsername);
      else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
    }else{
      callback(null);
    }
  });
};

//MODEL 2.สร้าง Model User=ชื่อ model
mongoose.model('User', UserSchema); //เรียกใช้
