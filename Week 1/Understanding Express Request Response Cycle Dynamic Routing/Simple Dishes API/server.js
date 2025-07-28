const express=require('express')
const app=express()
app.use(express.json())
const fs=require('fs')
const { json } = require('stream/consumers')

app.get('/dishes',(req,res)=>{
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    console.log(dishes)
    res.status(201).json({message:"All Dishes",dishes})
})
app.post('/add-dishes',(req,res)=>{
    let newDish=req.body
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    dishes.push(newDish)
    fs.writeFileSync('./db.json',JSON.stringify(data))

    res.status(201).json({message:"Dishe Added"})
})
app.put('/update-dish/:id',(req,res)=>{
    let id=req.params.id
    let updateDish=req.body
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    let index=dishes.findIndex((dish)=>dish.id==id)
    if(index==-1){
        res.status(404).json({msg:"Dish Not Found"})
    }
    else{
        let updateDishes=dishes.map((el,i)=>{
            if(el.id==id){
                return {...el,...updateDish}
            }
            else{
                return el
            }
        })
        data.dishes=updateDishes
        fs.writeFileSync('./db.json',JSON.stringify(data));
        res.status(201).json({message:"Dish Updated"})
    }
})
app.delete('/delete-dish/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    let index=dishes.findIndex(dish=>dish.id==id)
    if(index==-1){
        res.json({message:"Dish Not Found"})
    }
    else{
        let deletedDish=dishes.filter(dish=>dish.id!=id)
        return deletedDish

    }
    data.dishes=deletedDish
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(200).json({message:"Dish Deleted"})
})

app.get('/dish/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    let index=dishes.findIndex(dish=>dish.id==id)
    if(index==-1){
        res.status(404).json({message:"Dish Not Found"})
    }
    else{
        dishes.forEach((el,i)=>{
            if(el.id==id){
                res.status(200).json({message:"Dish Details",Dish:el})
            }
        })
    }
})
app.get('/dish-name',(req,res)=>{
    let name=req.query.name
    let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let dishes=data.dishes
    let flag=true
    dishes.forEach((el,i)=>{
        if(el.name.includes(name)){
            flag=false
            res.json({msg:"Dish By Name",dish:el})
        }
    })
    if(flag==true){
        res.status(404).json({msg:"Dish Not Found"})
    }
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found"})
})
app.listen(5000,()=>{
    console.log("Server started at port 5000")
})