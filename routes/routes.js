const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const user = require("../model/user.js")
const create_user = require("../model/create_user");
const crypto=require('crypto');

router.post("/create_user",async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.emp_id, salt)

    const new_user = new create_user({
        Name: req.body.name,
        Emp_Id: req.body.emp_id,
        Location: req.body.location,
        Designation: req.body.designation,
        BU: req.body.bu,
        Email_Id: req.body.email_id,
        Role: req.body.role
    })

    var a = req.body
    // console.log("bbbb",JSON.parse(req))
    console.log("ccccc", req.toString())
    var b = JSON.stringify(a);
    console.log("aaaaa", JSON.parse(b))

    create_user.findOne({ Emp_Id: new_user.Emp_Id })
    const users = new user({
        Name: new_user.Name,
        Emp_Id: new_user.Emp_Id,
        Location: new_user.Location,
        Role: new_user.Role,
        Designation: new_user.Designation,
        Bu: new_user.BU,
        Email_Id: new_user.Email_Id,
        Password: hashedPassword
    })
    user.findOne({ Emp_Id: users.Emp_Id })
        .then((data) => {
            if (data == null) {
                new_user.save()
                users.save()
                    .then((data) => {
                        console.log(data);
                        res.send({ code: 200, message: "Successfully added" })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send({ code: 400, message: "Error on storing", err })
                    })
            }
            else {
                res.send({ code: 403, message: "Already Exists" })
            }
        })
})

router.post("/login",async(req,res)=>{
    const email_id = req.body.email_id;
    const password = req.body.password;

    const response = { code: 200, message: "Success" };
    const result=await user.findOne({ Email_Id: email_id})
    console.log(result)
    if(!result)
    {
        console.log("res")
        response.message="No user found"
    }
    if(!await bcrypt.compare(password,result.Password))
    {
        console.log("res1")
        response.message="Invalid password"
    }
    const secret_key=crypto.randomBytes(32).toString('base64');
    console.log("sss",secret_key)
    // const token=jwt.sign(req.body,secret_key,{expiresIn:'1h'})
    var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbF9JZCI6Im9wb29AdnZkbnRlY2guaW4iLCJwYXNzd29yZCI6IlZWRE4vMjMyMyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjk1Mjk4MTA2LCJleHAiOjE2OTUyOTgyMjZ9.mAVHQXvTCV30hejbKRAIR0h22BikNBkbyXzjwAHmc1E";

    res.setHeader('Authorization',`${token}`)
    var dec=jwt.decode(token)
                    console.log("decoded",dec)
                    console.log("date",Date.now())
                    if (Date.now() >= dec.exp*1000) {
                        // return false;
                        console.log("Expired")
                      }
                    //   const secret_key = crypto.randomBytes(32).toString('base64');
                    //   var vv=jwt.verify(token,secret_key)
                    //   console.log("090909",vv)


                    // jwt.verify(token, JWT_SECRET, (error, user) => {
                    //     if (error) {
                    //         return response.status(401).send({
                    //         status: "error",
                    //         message: error.message,
                    //         });
                    //     }
    res.send(response)
})
module.exports=router