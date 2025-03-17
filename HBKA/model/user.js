const mongoose=require("mongoose");

const users=mongoose.Schema({
    Name:String,
    Emp_Id:String,
    Location:String,
    Designation:String,
    BU:String,
    Email_Id:String,
    Password:String,
    Role:String
})

module.exports=mongoose.model('users',users)