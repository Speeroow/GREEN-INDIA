const express = require('express'),
	isAuth = require('../controllers/authMiddlewares.js').isAuth,
	isAdmin = require('../controllers/authMiddlewares.js').isAdmin,
	checkUser = require('../controllers/authMiddlewares.js').checkUser,
	userController = require('../controllers/user');
const router = express.Router();

const User = require('../models/user');

const multer = require('multer'),
	{ storage } = require('../cloudinary/config'),
	upload = multer({ storage });

//USER PAGE SHOW ROUTE
router.get('/users/:id', userController.userGet);

//USER PAGE EDIT ROUTE
router.get('/users/:id/edit', isAuth, checkUser, userController.editUser);

//USER PAGE UPDATE ROUTE
router.put('/users/:id', isAuth, checkUser, userController.userUpdate);

module.exports = router;
