const User = require('../models/user')
const express = require('express')
const auth = require('../middleware/auth')

const users = express.Router();


users.get('/getReviewers/', (req,res) => {
    let id = req.query.id;
    User.findById(id,(err,user) => {
        if(err) return res.status(400).send(err)
        if(user){
            res.json({
                name: user.name,
                lastname: user.lastname
            })
        }else{
            res.json()
        }
   })
    
})

users.get("/users", (req, res) => {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;
    let order = req.query.order || "asc";
    User.find().skip(skip).sort({name:order}).limit(limit).exec((err,users) => {
        if(err) return res.status(400).send(err)
        res.json(users)
    })
 });

//register
users.post("/register", (req,res) => {
    const user = new User(req.body)

    user.save((err,doc) => {
        if(err) return res.status(400).send({success:false})
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

//login
users.post("/login",(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(400).send({success:false})
        if(!user) return res.json({success:false,isAuth:false,msg:"Auth Failed: user not found"})
        user.comparePassword(req.body.password, (err,isMatched) => {
            if(err) return res.status(400).send({success:false})
            if(!isMatched) return res.json({success:false,isAuth:false,msg:"Not a valid password"})
            //give a token
            user.generateToken((err,user) => {
                if(err) return res.status(400).send({success:false})
                res.cookie("auth",user.token).json({
                    success: true,
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

users.get('/logout', auth, (req,res) => {
    if(req.user){
        req.user.deleteToken(req.token, (err,user) => {
            if(err) return res.status(400).send({success:false})
            res.clearCookie('auth').sendStatus(200)
        })
    }else{
        res.clearCookie('auth').sendStatus(200)
    }
})

module.exports = users;