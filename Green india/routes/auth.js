const express = require('express'),
	passport = require('passport'),
	authController = require('../controllers/auth');
const router = express.Router();

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);
router.get('/login', authController.showLoginForm);
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}),
	authController.loginUser
);
router.get('/logout', (req, res)=>{
    req.logOut((err)=>{
        if (err){
            req.flash('error', 'try again')
            console.log(err);
            res.redirect('/');
        }
        req.flash('success', 'thank you, visit again')
        res.redirect('/jobs');
    })
});

module.exports = router;
