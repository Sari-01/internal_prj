const express = require("express");
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/user", userRouter)

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://Sariha:Sabarish15*@cluster0.rdbdb.mongodb.net/mvc_pattern?retryWrites=true&w=majority"; //mongo db connection

mongoose.connect(uri, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("err", err)
})
app.listen('8000', (req, res) => {
    console.log("Listening at the port 8000....")
})