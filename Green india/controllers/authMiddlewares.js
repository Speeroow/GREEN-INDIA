const User = require('../models/user');

module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash('error', 'You need to be logged in to do that!!');
		res.redirect('/login');
	}
};

module.exports.isAdmin = (req, res, next) => {
	if (req.user.isAdmin) {
		next();
	} else {
		req.flash('error', "You don't have permission to do that!!");
		res.redirect('back');
	}
};

module.exports.checkUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const foundUser = await User.findById(id);
		if (foundUser._id.equals(req.user._id) || req.user.isAdmin) next();
		else {
			req.flash('error', "You don't have permission to do that!");
			res.redirect('back');
		}
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('back');
	}
};
