
const express=require('express')
const app=express()
app.use(express.json())

const fs=require('fs')

app.get('/test',(req,res)=>{
    res.status(200).json({msg:"This is the rest Route"})
})

app.get('/all-students',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students
    console.log(students)
    res.status(200).json({msg:"All students",students})
})
app.post('/add-student',(req,res)=>{
    let newStudent=req.body

    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students

    students.push(newStudent)
    fs.writeFileSync('./db.json',JSON.stringify(data))
    res.status(201).json({msg:"New student Added",newStudent})
})
app.put('/update-student/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students
    let updatedStudent=req.body

    let index=students.findIndex(student=>student.id==id)
    if(index==-1){
        res.status(404).json({msg:"Student Not Found"})
    }
    else{
        let updatedStudents=students.map((el,i)=>{
            if(el.id==id){
                return {...el,...updatedStudent}
            }
            else{
                return el
            }
        })
        data.students=updatedStudents
        fs.writeFileSync('./db.json',JSON.stringify(data))
        res.status(201).json({msg:"Student data updated",student:updatedStudent})
    }
})
app.delete('/delete-student/:id',(req,res)=>{
    let id=req.params.id
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students

    let index=students.findIndex(student=>student.id==id)
    if(index==-1){
        res.status(404).json({msg:"Student Not Found"})
    }
    else{
        let deleteStudent=students.filter(student=>student.id!=id)

        data.students=deleteStudent
        fs.writeFileSync('./db.json',JSON.stringify(data))
        res.status(201).json({msg:"Deleted Student"})
    }
})
app.get('/studentname',(req,res)=>{
    let name=req.query.name
    let data=JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students

    let flag=true
    students.forEach((el,i)=>{
        if(el.name.includes(name)){
            flag=false
            res.json({msg:"Student details...",student:el})
        }
    })
    if(flag==true){
        res.status(404).json({msg:"Student not found"})
    }
})
app.get('/student/:id',(req,res)=>{
    let id=req.params.id
    let data = JSON.parse(fs.readFileSync('./db.json','utf-8'))
    let students=data.students

    let index=students.findIndex(student=>student.id==id)

    if(index==-1){
        res.status(404).json({msg:"Student Not Found"})
    }
    else{
        students.forEach((el,i)=>{
            if(el.id==id){
                res.status(200).json({msg:"Student details",student:el})
            }
        })
    }
})
app.listen(3000,()=>{
    console.log("Server start the port 3000")
})