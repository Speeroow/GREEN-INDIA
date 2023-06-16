const User = require('../models/user');

exports.showRegisterForm = (req, res) => {
	res.render('register', { page: 'Sign Up' });
};

exports.registerUser = async (req, res) => {
	let user = new User(req.body.user);
	let registeredUser = await User.register(user, req.body.password);
	req.login(registeredUser, function(err) {
		if (err) {
			console.log('error while registering user');
		}
		req.flash('Welcome To GREEN INDIA!!');
		res.redirect('/');
	});
};

exports.showLoginForm = (req, res) => {
	res.render('login', { page: 'Login' });
};

exports.loginUser = (req, res) => {
	req.flash('success', 'Welcome Back!!');
	res.redirect('/');
};


