const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add name'],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength:6,
        select:false
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum:['admin','seller','user'],
        default: 'user'
    },
    history: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});


// // Encrypt password using bcrypt
// UserSchema.pre('save', async function(next){
    
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// //Sign jwt and return
// UserSchema.methods.getSignedJwtToken = function(){
//     return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// }

// //Match user entered password to hashed password in database
// UserSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// //Generate and hash password token
// UserSchema.methods.getResetPasswordToken = function(){
//     //Generate token
//     const resetToken = crypto.randomBytes(20).toString('hex');
 
//     //Hash token and set to set to resetPsswordToken field
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     // Set expire
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// }


export default mongoose.models.user || mongoose.model('User', UserSchema)
