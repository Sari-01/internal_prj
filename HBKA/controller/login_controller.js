const user = require("../model/user");
const validate_check = require("../validator/login_validate");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './.env' })
const blacklist = new Set();

var arr = []
var arr2 = []
module.exports = { arr, arr2 }

module.exports.login = (req, res) => {
    console.log("hey", process.env.PUBLIC_KEY)
    console.log(req.body);
    const payload = {
        email_id: req.body.email_id,
        password: req.body.password,
        lastActivityTimestamp: Date.now(),
    }

    const validator = validate_check.validate(req.body)
    if (validator.error) {
        console.log("?>?>?", validator.error.details[0].message)
        return res.send({
            code: 400,
            message: validator.error.details[0].message
        })
    }
    else {
        const result = user.findOne({ Email_Id: payload.email_id, Password: payload.password }, { _id: 0, __v: 0 })
            .then((result) => {
                console.log(result)
                if (result != null) {
                    // var token = create_token(result.Email_Id,result.Password, result.Role)
                    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: "24hr" })
                    res.setHeader('Authorization', `${token}`)
                    console.log("data", token);
                    arr.push(token)
                    console.log("pushed", arr)
                    res.send({ code: 200, message: "Success", result })
                }
                else {
                    console.log("No User")
                    res.send({ code: 400, message: "Failed!! No user exists" })
                }
            })
            .catch((err) => {
                console.log(err)
                res.send({ code: 400, message: err })
            })
    }
}

// function create_token(Email_Id, password, role) {
//     console.log(Email_Id)
//     const secret_key = crypto.randomBytes(32).toString('base64');
//     console.log("secret_key", secret_key)
//     return jwt.sign({ Email_Id, password, role }, secret_key, { expiresIn: "2m" });
// }

module.exports.logout = (req, res) => {
    const token = req.headers.authorization
    console.log(token)
    if (!token) {
        console.log(token)
        return res.send({ code: 401, message: "Failure", error_data: "Unauthorized" })
    }
    else {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            console.log("error", err)
            console.log("user", user)
            if (err) {
                return res.send({ code: 401, message: "Failure", error_data: err })
            }
            else {
                console.log("First time", arr)
                // arr=arr.filter((element)=>element!==req.headers.authorization)
                // console.log("removed",arr)
                console.log("location", (arr.indexOf(token)))
                // jwt.sign(req.headers.authorization, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: 0 })
                return res.send({ code: 200, message: "Success", success_data: "Logged Out Successfully" })
            }
        })
    }
    // else
    // {
    //     jwt.verify(token,process.env.PRIVATE_KEY,(user,err)=>{
    //         if(err){
    //             return res.send({code:401,message:"Failure",err})
    //         }
    //         else
    //         {
    //             var ver=jwt.verify(token,process.env.PRIVATE_KEY,(user,err)=>
    //             {
    //                 console.log(user)
    //             })
    //             console.log("verrr",ver)
    //             var decode=jwt.decode(token)
    //             if(Date.now()>=decode.exp*1000)
    //             {
    //                 console.log(decode)
    //                 console.log(Date.now())
    //                 res.send({code:400,message:"Failure",error_data:"Token Expired"})
    //             }
    //             else
    //             {
    //                 console.log(decode)
    //                 console.log(Date.now())
    //                 blacklist.add(token)
    //                 console.log("aaaa",blacklist)
    //                 return res.send({code:200,message:"Success",success_data:"Logged Out Successfully"})
    //             }
    //         }
    //     })

    // }
    // blacklist.add(token)
    // return res.send({code:200,message:"Success",success_data:"Logged Out Successfully"})
    // var dec=jwt.decode(token)
    // console.log(Date.now())
    // console.log(dec.exp)
    // if(Date.now()>=dec.exp)
    //     {
    //         console.log("wwww")
    //     }
    // if(logout){
    //     console.log("yes")
    // }
    // else{
    //     console.log("no")
    // }

    // jwt.sign(token,"",{expiresIn:1},(logout,err)=>
    // {
    //     var decode=jwt.decode(token)
    //     console.log(decode)
    //     if(Date.now>=decode.exp*1000)
    //     {
    //         console.log("wwww")
    //     }
    //     // if(logout){
    //     //     console.log("yes")
    //     // }
    //     else{
    //         console.log("no")
    //     }
    // })



}

