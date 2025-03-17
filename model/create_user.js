const mongoose=require('mongoose');

const create_user_poc=mongoose.Schema({
    Name:String,
    Emp_Id:String,
    Location:String,
    Designation:String,
    BU:String,
    Email_Id:String,
    Role:String
})

module.exports=mongoose.model('create_user_poc',create_user_poc)