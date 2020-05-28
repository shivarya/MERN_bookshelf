const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config').get(process.env.NODE_ENV);
const SALT_I = 10;


const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default:0
    },
    token: {
        type: String
    }
});


User.pre("save", function(next){
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,(err,salt) => {
            if(err) return next(err)
            bcrypt.hash(user.password,salt, (err,hash) => {
                if(err) return next(err)
                user.password = hash;
                next()
            })
        })
    }else{
        next()
    }
})

User.methods.comparePassword = function(givenPassword, cb){
    bcrypt.compare(givenPassword,this.password, (err,isMatched) => {
        if(err) return cb(err)
        cb(null,isMatched)
    })
}

User.methods.generateToken = function(cb){
    let token = jwt.sign(this._id.toHexString(),config.SECRET);

    this.token = token;
    this.save((err, user) => {
        if(err) return cb(err)
        cb(null,user)
    })
}

User.statics.findByToken = function(token,cb){
    jwt.verify(token,config.SECRET,(err, user_id) => {
        if(err) return cb(err)
        this.findOne({_id:user_id,token:token},(err,user) => {
            if(err) return cb(err)
            cb(null,user)
        })
    })
}

User.methods.deleteToken = function(cb){
    this.update({$unset:{token:null}}, (err,user) => {
        if(err) return cb(err)
        cb(null,user)
    })
}


module.exports = mongoose.model("User", User);