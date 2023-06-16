const express = require('express'),
flash = require('connect-flash'),
session = require('express-session'),
passport = require('passport'),
localStrategy = require('passport-local'),
mongoose = require("mongoose"),
methodOverride = require('method-override'),
moment= require('moment');

require('dotenv').config();
const app = express();

//MONGOOSE CONNECTION
const DB_USERNAME = process.env.DB_USERNAME,
DB_USERPASS=process.env.DB_USERPASS;
const URI = `mongodb+srv://${DB_USERNAME}:${DB_USERPASS}@greenindia.agjzynj.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(URI).then(()=>{
    console.log('db is working');
})
.catch((err)=>{
    console.log(err);
});

// SESSION CONFIGURATION
const sessionPass = process.env.SESSION_PASS;
app.use(session({
            secret: sessionPass,
            resave : false,
            saveUninitialized:true,
            cookie:{
                maxAge: 10*60*1000, //10 minutes in milliseconds
                httpOnly: true,
                expires: Date.now()+1000*60*60*24
            }
        })
);

// REQUIRED MODELS
const Notif = require('./models/notification'),
        User = require('./models/user');

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//LOCAL CONFIGURATION
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(async (req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	res.locals.moment = moment;
	res.locals.recentNotifs = await Notif.find().sort({ _id: -1 }).limit(4);
	next();
});

// REQUIRING ROUTES
const authRoutes = require('./routes/auth'),
	homeRoutes = require('./routes/home'),
	notificationRoutes = require('./routes/notifications'),
	userRoutes = require('./routes/users');

// USING ROUTES
app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use(notificationRoutes);
app.use(userRoutes);
app.get('*',(req, res)=>{
    res.render('404', {page:'404'});
});

// PORT CONNECTION
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('server started');
});