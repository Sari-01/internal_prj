const create_user = require("../model/create_user");
const user = require("../model/user");
const validate_check = require("../validator/admin_controller_validate")
const { MongoClient } = require('mongodb');
const checktoken = require("../middleware/checktoken")
const {login,logout,arr, arr2}=require("./login_controller");
const { message } = require("../validator/admin_controller_validate");

module.exports.create_user = (req, res) => {
    console.log(req.body);

    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    if (!check_Token.error_data) {
        const new_user = new create_user({
            Name: req.body.name,
            Emp_Id: req.body.emp_id,
            Location: req.body.location,
            Designation: req.body.designation,
            BU: req.body.bu,
            Email_Id: req.body.email_id,
            Role: req.body.role
        })
        // var a = req.body
        // console.log("bbbb",JSON.parse(req))
        // console.log("ccccc", req.toString())
        // var b = JSON.stringify(a);
        // console.log("aaaaa", JSON.parse(b))
        const validator = validate_check.validate(req.body)
        if (validator.error) {
            console.log("?>?>?", validator.error.details[0].message)
            return res.send({
                code: 400,
                message: validator.error.details[0].message
            })
        }
        else {
            create_user.findOne({ Emp_Id: new_user.Emp_Id })
            const users = new user({
                Name: new_user.Name,
                Emp_Id: new_user.Emp_Id,
                Location: new_user.Location,
                Role: new_user.Role,
                Designation: new_user.Designation,
                Bu: new_user.BU,
                Email_Id: new_user.Email_Id,
                Password: new_user.Emp_Id
            })
            user.findOne({ Emp_Id: users.Emp_Id })
                // console.log("eee",fff)
                .then((data) => {
                    if (data == null) {
                        new_user.save()
                        users.save()
                            .then((data) => {
                                console.log(data);
                                res.send({ code: 200, message: "Success", User: data })
                            })
                            .catch((err) => {
                                console.log(err)
                                res.send({ code: 400, message: "Failure", err })
                            })
                    }
                    else {
                        res.send({ code: 403, message: "Failure", error_data: "Already User Name Exists" })
                    }
                })
        }
    }
    else {
        res.send(check_Token)
    }
}

module.exports.update_user = (req, res) => {
    console.log(req.body)

    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    if (!check_Token.error_data) {
        if (!req.body.emp_id) {
            res.send({ code: 400, message: "Failure", error_data: "Empolyee ID is Missing" })
        }
        else {
            create_user.findOneAndUpdate({
                Emp_Id: req.body.emp_id
            },
                {
                    $set: {
                        Name: req.body.name,
                        Location: req.body.location,
                        Designation: req.body.designation,
                        BU: req.body.bu,
                        Email_Id: req.body.email_id
                    }
                },
                { returnOriginal: false })
                .then((data) => {
                    console.log("update", data);
                    res.send({ code: 200, message: "Success", UpdatedDetails: data })
                })
                .catch((err) => {
                    res.send({ code: 400, message: "Failure", err })
                })
        }
    }
    else {
        res.send(check_Token)
    }
}

module.exports.delete_user = async (req, res) => {
    const uri = "mongodb+srv://Sariha:Sabarish15*@cluster0.rdbdb.mongodb.net/HBKA?retryWrites=true&w=majority"
    // Define the criteria for data deletion (e.g., based on a field value)
    const deleteCriteria = { Emp_Id: req.body.emp_id };
    // Define an array of collection names you want to delete data from
    const collectionNames = ['users', 'create_users'];
    const response = { code: 200, message: "Success" };
    // Call the function to start the deletion process
    var check_Token = checktoken(req, response)
    if (!check_Token.error_data) {
        var result = await deleteDataFromCollections(uri, deleteCriteria, collectionNames, response);
        res.send(result)
    }
    else {
        res.send(check_Token)
    }
}

async function deleteDataFromCollections(uri, deleteCriteria, collectionNames, response) {
    try {
        // Create a MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        // Connect to MongoDB Atlas
        await client.connect();
        // Access and delete data from each collection
        for (const collectionName of collectionNames) {
            const db = client.db(); // No need to specify the database name in the URI
            console.log("db", db)
            const collection = db.collection(collectionName);
            // Delete documents that match the criteria
            const result = await collection.deleteOne(deleteCriteria); // Use deleteOne if you want to delete only one document
            console.log("ress", result)
            // Check the result if needed
            if (result.deletedCount > 0) {
                console.log(`Deleted ${result.deletedCount} documents from ${collectionName}`);
                // response.message = "Success"
            } else {
                console.log(`No documents were deleted from ${collectionName}`);
                response.message = "Failure"
                response.error_data = "No Data Found"
            }
        }
        await client.close();
    } catch (err) {
        response.code = 400
        response.message = "Failure"
        // response.message = err.message
    }
    return response
}

module.exports.get_all_users = (req, res) => {
    console.log("arrr",arr2)
    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    console.log(check_Token)
    console.log("Contains", arr)
    // if(arr.includes(req.headers.authorization)==true)
    // {
        if (!check_Token.error_data ) {
            if(!arr2.includes(req.headers.authorization))
            {
                create_user.find({}, { _id: 0, __v: 0 }).sort({ Emp_Id: 1 })
                .then((data) => {
                    console.log(data)
                    res.send({ code: 200, message: "Success", UserDetails: data })
                })
                .catch((err) => {
                    res.send({ code: 400, message: "Failure", err })
                })
            }
            else
            {
                res.send({code:400,message:"Failure",error_data:"User logged out already"})
            }
        }
        else {
            res.send(check_Token)
        }
    // }
    // else
    // {
    //     console.log("pls ensure the token")
    //     res.send({code:400,message:"Failure",error_data:"User Logged out already"})
    // }
    
}