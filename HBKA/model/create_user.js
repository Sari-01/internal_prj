const mongoose=require('mongoose');

const create_user=mongoose.Schema({
    Name:String,
    Emp_Id:String,
    Location:String,
    Designation:String,
    BU:String,
    Email_Id:String,
    Role:String
})

module.exports=mongoose.model('create_user',create_user)