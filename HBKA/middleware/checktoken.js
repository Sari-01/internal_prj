const jwt = require('jsonwebtoken');
const secret_key = process.env.PRIVATE_KEY;
const userlastactivity = {}
var lastActivity = Date.now()
var firstapicall = true;
const { login, logout, arr, arr2 } = require("../controller/login_controller");
const { deleteOne } = require('../model/create_user');

function updateLastRequestTime(req, res) {
  const token = req.headers['authorization']
  if (token) {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (!err) {
        console.log(userlastactivity[token])
        console.log("decoded.last", decoded.lastActivityTimestamp)
        if (firstapicall == true) {
          lastActivity = decoded.lastActivityTimestamp;
          firstapicall = false;
        }
        if (Date.now() - lastActivity > 60000) {
          delete userlastactivity[token]
          console.log("login again")
          firstapicall = true;
          res.code = 401
          res.message = "Failure"
          res.error_data = "Session Expired.Login Again"
        }
        else {
          lastActivity = Date.now();
          console.log("KKK", lastActivity)
        }

      }
      else {
        // arr.filter((element)=>element!==req.headers.authorization)
        res.code = 400
        res.message = "Failure"
        res.error_data = err
      }
    })
  }
  else {
    res.code = 401
    res.message = "Failure"
    res.error_data = "Unauthorized"
  }
  return res
}

module.exports = updateLastRequestTime