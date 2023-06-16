const express = require('express'),
	homeC = require('../controllers/home');
const router = express.Router();

router.get('/', homeC.homeGet);

module.exports = router;
