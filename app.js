const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const routes=require("./routes/routes")
const app=express();
const env=require('dotenv')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/routes",routes)

mongoose.Promise=global.Promise;

const uri="mongodb+srv://Sariha:Sabarish15*@cluster0.rdbdb.mongodb.net/HBKA?retryWrites=true&w=majority"

mongoose.connect(uri,{
    useNewUrlParser:true
})
.then((data)=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log("ERROR",err)
})
app.listen(8000,(req,res)=>{
    console.log("Listening at the port 8000....")
})