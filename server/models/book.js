const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Book = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'N/A'
    },
    pages: {
        type: String,
        default:'N/A'
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5
    },
    price:{
        type: String,
        default:'N/A'
    },
    ownerId:{
        type: String,
    }
},{timestamps:true});



module.exports = mongoose.model("Book", Book);