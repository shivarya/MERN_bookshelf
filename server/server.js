const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const config = require("./config/index").get(process.env.NODE_ENV)

const auth = require('./middleware/auth')

dotenv.config(); //reading env file
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// mongoose
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); //creta index in mongo
mongoose.connect(config.database, { useNewUrlParser: true })
    .then(() => console.log("Mondodb Connected"))
    .catch(err => console.error(err));

//Routes
const books = require('./routes/books')
const users = require('./routes/users')

app.use('/api/user',users)
app.use('/api/book',books)

app.get("/", (req, res) => {
    res.send("Server working 🔥");
});

app.get('/api/auth',auth, (req,res) => {
    if(req.user){
        res.json({
            isAuth:true,
            id:req.user._id,
            email:req.user.email,
            name:req.user.name,
            lastname:req.user.lastname
        })
    }else{
        res.json({
            isAuth:false
        })
    }
})





const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));