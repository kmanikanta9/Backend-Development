

const fs =  require('fs')
const { getData, addOrUpdateBook } = require('../models/book.model')

const allBooks = (req,res)=>{
    const {data,books} =getData()
     res.status(201).json({msg:"All Books",books})

}

const addBook =  (req,res)=>{
    let newBook = req.body
    const {data,books}=getData()
    books.push(newBook)
    addOrUpdateBook(data)
    res.status(201).json({msg:"New Book Added",newBook})

}

const updateBook = (req,res)=>{
    let id = req.params.id
    let updatedBook = req.body;
    const {data,books}=getData()

    let index = books.findIndex(book=>book.id==id)
    if(index==-1){
        res.status(404).json({msg:"The Book is not found."})
    }
    else{
        let updatedBooks = books.map((el,i)=>{
            if(el.id==id){
                return {...el,...updatedBook}
            }
            else{
                return el
            }
            
        })
        data.books = updatedBooks;
        addOrUpdateBook(data)
        res.status(201).json({msg:"Book updated",updatedBook})
    }
    
}

const deleteBook = (req,res)=>{
    let id = req.params.id
    const {data,books}=getData()

    let index = books.findIndex(book=>book.id==id)
    if(index==-1){
        res.status(404).json({msg:"The Book is not found."})
    }
    else{
        let deleteBook = books.filter(book=>book.id!=id)
        data.books = deleteBook;
        addOrUpdateBook(data)
        res.status(201).json({msg:"Book Deleted"})
    }
    
}

const bookByName = (req,res)=>{
    let title = req.query.title;

    const {data,books}=getData()
    
{
            books.forEach((el,i)=>{
                if(el.title.includes(title)){
                    res.status(200).json({msg:"Task Details",Book:el})
                }
            })}
    
}

module.exports = {bookByName,allBooks,addBook,deleteBook,updateBook}