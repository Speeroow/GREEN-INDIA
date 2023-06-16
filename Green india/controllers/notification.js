const Notification = require('../models/notification');

module.exports.notificationsLanding = async (req, res) => {
	try {
		const notifs = await Notification.find().sort({ _id: -1 });
		res.render('notifications/home', { notifs, page: 'Notifications' });
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('/');
	}
};

module.exports.notificationsNewForm = (req, res) => {
	res.render('notifications/new', { page: 'New Notification' });
};

module.exports.notificationsCreate = async (req, res) => {
	try {
		const newNotification = new Notification({
			description: req.body.description,
			author: req.body.author
		});
		await newNotification.save();
		req.flash('success', 'Successfully posted notification');
		res.redirect('/notifications');
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('/notifications');
	}
};

module.exports.notificationsDelete = async (req, res) => {
	try {
		await Notification.findByIdAndDelete(req.params.id);
		req.flash('success', 'Successfully deleted notification');
		res.redirect('/notifications');
	} catch (error) {
		req.flash('error', 'Something went wrong in the database');
		console.log(error);
		res.redirect('/notifications');
	}
};
