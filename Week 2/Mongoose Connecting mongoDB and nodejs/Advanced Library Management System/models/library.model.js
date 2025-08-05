


const mongoose = require('mongoose')

let librarySchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{type:String,required:true},
        status:{
            type:String,
            enum:['available','borrowed','reserved'],
            required:true,
            default:"available"
        },
        borrowerName:String,
        borrowDate:{type:Date},
        returnDate:{type:Date},
        dueDate:{type:Date},
        overdueFees:{type:Number,default:0}
    }
)

let LibraryModel = mongoose.model('LibrarySystem',librarySchema)


module.exports = LibraryModel