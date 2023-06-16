const User = require('../models/user');

module.exports.userGet = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('appliedJobs');
		res.render('users/show', { user, page: 'Profile' });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('/');
	}
};

module.exports.editUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.render('users/edit', { user, page: 'Profile Edit' });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('/');
	}
};

module.exports.userUpdate = async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body.user);
		req.flash('success', 'Successfully updated your profile!');
		res.redirect(`/users/${req.params.id}/edit`);
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect(`/users/${req.params.id}`);
	}
};
