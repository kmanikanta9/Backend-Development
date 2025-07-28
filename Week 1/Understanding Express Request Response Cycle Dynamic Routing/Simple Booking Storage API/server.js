const express = require("express");
const app = express();
app.use(express.json());
const fs=require('fs');
const { title } = require("process");

app.get("/test", (req, res) => {
  res.status(201).json({ msg: "This is the Test Route." });
});
app.get("/all-books",(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books
    console.log(books)
    res.status(201).json({msg:"All books",books})
})

app.post('/add-book',(req,res)=>{
    let newBook=req.body
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books
    books.push(newBook)
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(201).json({msg:"Book Added",books})
})
app.put('/update-book/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books
    let updatedBook=req.body
    let index=books.findIndex(book=>book.id==id)
    if(index==-1){
        res.status(404).json({msg:'Book Not Found'})
    }
    else{
        let updatedBooks=books.map((el,i)=>{
            if(el.id==id){
                return {...el,...updatedBook}
            }
            else{
                return el
            }
        })
        data.books=updatedBooks
        fs.writeFileSync('./db.json',JSON.stringify(data))
        res.status(201).json({msg:'Book Updated'})
    }

})
app.delete('/delete-book/:id',(req,res)=>{
    let id=req.params.id;
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books
    let index=books.findIndex(book=>book.id==id)
    if(index==-1){
        res.status(404).json({msg:"Book Not Found"})
    }

    let deleteBook=books.filter(book=>book.id!=id)
    data.books=deleteBook
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(201).json({msg:"Book Deleted"})
})

app.get('/book/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books

    let index=books.findIndex(book=>book.id==id)
    if(index==-1){
        res.status(404).json({msg:'Boook Not Found'})
    }
    else{
        books.forEach((el,id)=>{
            if(el.id==id){
                res.status(201).json({msg:'Book Details',book:el})
            }
        })
    }
})
app.get('/book-name',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let books=data.books;
    let flag=true
    books.forEach((el,i)=>{
        if(el.title.includes(title)){
            flag=false
            res.json({msg:'Book',Book:el})
        }
    })
    if(flag==true){
        res.json({msg:"Book Not Found"})
    }
})
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});
app.listen(4000, () => {
  console.log("server started the port 4000");
});
