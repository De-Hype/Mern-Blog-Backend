const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
    },
    password:{
        type:String,
        required:true
    }, 
    blogs: [
    { type: mongoose.Types.ObjectId, 
        ref: "Blog", 
        required: true 
    }],
});

module.exports = mongoose.model('User', UserSchema)

