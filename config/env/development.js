module.exports = {
	debug: true,
	mongoUri: 'mongodb://localhost/my-project2',
	sessionSecret: 'dev_secret_key',
	facebook: {
		clientID: '153435971887998',
		clientSecret: '5281af2a20d420823e15cb81756af663',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	google: {
		clientID: '981990566387-f2m57gph6uorvuq7k0b0mv0tn4orj3is.apps.googleusercontent.com',
		clientSecret: 'fOD3VmicPoc9eCCadp_f5nsH',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};
