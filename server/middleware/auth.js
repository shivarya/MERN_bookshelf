const User = require('../models/user')

let auth = (req,res,next) => {
    let token = req.cookies.auth;
    if(token){
        User.findByToken(token, (err,user) => {
            if(err) return res.json({
                error:err
            })
            if(!user) return res.json({
                error:true
            })
    
            req.token = token
            req.user=user
            next()
        })
    }else{
        next()
    }
    
}

module.exports = auth;