var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var user = require('../../app/controllers/user.server.controller');

module.exports = function(){
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    //profileFields: ['id', 'email', 'name'],
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done){
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'google',
      providerID: profile.id,
      providerData: providerData
    };
    user.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
