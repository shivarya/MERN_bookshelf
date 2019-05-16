const express = require('express')
const Book = require('../models/book')


const books = express.Router();
//GET//
books.get("/", (req, res) => {
   let id = req.query.id;

   Book.findById(id,(err,book) => {
        if(err) return res.status(400).send(err)
        res.json(book)
   })
});

books.get("/books", (req, res) => {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;
    let order = req.query.order || "asc";
    Book.find().skip(skip).sort({name:order}).limit(limit).exec((err,books) => {
        if(err) return res.status(400).send(err)
        res.json(books)
    })
 });

 books.get('/reviewer',(req,res) => {
     Book.find({ownerId:req.query.user},(err,book) => {
        if(err) return res.status(400).send(err)
        res.json(book)
     })
 })

//POST//
books.post("/", (req, res) => {
    const book = new Book(req.body)

    book.save((err,doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
});

//UPDATE//

books.put('/',(req,res) => {
    let id = req.body._id;
    Book.findByIdAndUpdate(id,req.body,{new:true},(err,doc) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            success: true,
            book: doc
        })
    })
})

//DELETE//
books.delete('/',(req,res) => {
    let id = req.query.id;
    Book.findByIdAndRemove(id,(err,doc) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({
            success: true,
            book: doc
        })
    })
})

module.exports = books;
