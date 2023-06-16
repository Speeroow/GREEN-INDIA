const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please enter your first name']
    },
    lastName:{
        type: String,
        required:[true,'Please enter your last name'],
    },
    email:{
        type:String,
        unique: true,
        lowercase:true,
    },
    isAdmin:{
        type:Boolean,
        default : false
    },
    
});

UserSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model('User', UserSchema);
