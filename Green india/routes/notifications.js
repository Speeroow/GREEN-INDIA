const express = require('express'),
	isAuth = require('../controllers/authMiddlewares.js').isAuth,
	isAdmin = require('../controllers/authMiddlewares.js').isAdmin,
	notifController = require('../controllers/notification'),
	router = express.Router();
const Notification = require('../models/notification');

//NOTIFICATION LANDING PAGE
router.get('/notifications', notifController.notificationsLanding);
//NOTIFICATION NEW FORM ROUTE
router.get('/notifications/new', isAuth, isAdmin, notifController.notificationsNewForm);
//NOTIFICATION CREATE ROUTE
router.post('/notifications', isAuth, isAdmin, notifController.notificationsCreate);
//NOTIFICATION DELETE ROUTE
router.delete('/notifications/:id', isAuth, isAdmin, notifController.notificationsDelete);

module.exports = router;
