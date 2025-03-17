const mongoose=require("mongoose")
// const autoIncrement=require('mongoose-sequence')(mongoose);
const autoIncrement = require('../middleware/midddleware')



const create_hall=mongoose.Schema({
    // Room_Id:String,
    "Hall_Id":String,
        // default: 0,
        // unquie:true
    "Location":String,
    "Floor":String,
    "Hall_Name":String,
    "Block":String,
    "Capacity":String
})
// create_hall.plugin(autoIncrement,{inc_field:'Hall_Id'})
create_hall.pre('save',autoIncrement('create_hall','Hall_Id'));


module.exports=mongoose.model("create_hall",create_hall)