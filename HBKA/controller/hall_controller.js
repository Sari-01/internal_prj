const create_hall = require("../model/create_hall");
const validate_check = require("../validator/hall_controller_validate")
const checktoken = require("../middleware/checktoken")

module.exports.create_hall = (req, res) => {
    console.log(req.body);
    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    if (!check_Token.error_data) {
        const hall_create = new create_hall({
            // Hall_Id: req.body.hall_id,
            Location: req.body.location,
            Floor: req.body.floor,
            Hall_Name: req.body.hall_name,
            Block: req.body.block,
            Capacity: req.body.capacity,
        })

        const validator = validate_check.validate((req.body))
        if (validator.error) {
            console.log("?>?>?", validator.error.details[0].message)
            return res.send({
                code: 400,
                message: validator.error.details[0].message
            })
        }
        else {
            // create_hall.findOne({ Hall_Id: req.body.hall_id })
            // .then((data) => {
            // console.log(data)
            // if (!data) {
            create_hall.findOne({ Hall_Name: req.body.hall_name })
                .then((data1) => {
                    if ((data1) == null) {
                        console.log("create", data1)
                        hall_create.save()
                            .then((data) => {
                                console.log("data", data)
                                res.send({ code: 200, message: "Success", Hall: data })
                            })
                            .catch((err) => {
                                console.log(err)
                                res.send({ code: 400, message: "Failure", err })
                            })
                    }
                    else {
                        res.send({ code: 403, message: "Failure", error_data: "Already exists" })
                    }
                })
                // }
                // else {
                //     res.send({ code: 403, message: "Already exists" })
                // }
                // })
                .catch((err) => {
                    res.send({ code: 400, message: "Failure", error_data: "error" })
                })
        }
    }
    else (
        res.send(check_Token)
    )
}

module.exports.update_hall = (req, res) => {
    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    if (!check_Token.error_data) {
        create_hall.findOne({ Hall_Id: req.body.hall_id })
            .then((data) => {
                if (!data) {
                    console.log("No")
                    res.send({ code: 400, message: "Failure", error_data: "No Hall Exists" })
                }
                else {
                    create_hall.findOne({ Hall_Name: req.body.hall_name })
                        .then((data) => {
                            console.log("<><<>", data)
                            if ((data == null) || ((req.body.hall_id == data.Hall_Id) && (req.body.hall_name == data.Hall_Name))) {
                                console.log("aa")
                                create_hall.findOneAndUpdate({
                                    Hall_Id: req.body.hall_id
                                },
                                    {
                                        $set: {
                                            Hall_Name: req.body.hall_name,
                                            Location: req.body.location,
                                            Floor: req.body.floor,
                                            Block: req.body.block,
                                            Capacity: req.body.capacity
                                        }
                                    },
                                    { returnOriginal: false })
                                    .then((data) => {
                                        return res.send({ code: 200, message: "Success", UpdatedDetails: data })
                                    })
                                    .catch((err) => {
                                        res.send({ code: 400, message: "Failure", err })
                                    })
                            }
                            else if (req.body.hall_id != data.Hall_Id && req.body.hall_name == data.Hall_Name) {
                                res.send({ code: 403, message: "Failure", error_data: "Already Hall Name Exists" })
                            }
                            // else {
                            //     console.log("erer")
                            //     res.send({ code: 403, message: "Failure", error_data: "Already Hall Name Exists" })
                            // }
                        })
                        .catch((err) => {
                            res.send({ code: 400, message: "Failure", err })
                        })
                }
            })
    }
    else {
        res.send(check_Token)
    }

}
module.exports.delete_hall = (req, res) => {
    console.log(req.body)
    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    if (!check_Token.error_data) {
        create_hall.findOne({ Hall_Id: req.body.hall_id })
            .then((data) => {
                if (!data) {
                    res.send({ code: 400, message: "Failure", error_data: "No Hall Exists" })
                }
                else {
                    create_hall.findOneAndDelete({
                        Hall_Id: req.body.hall_id
                    })
                        .then((data) => {
                            res.send({ code: 200, message: "Success" })
                        })
                        .catch((err) => {
                            res.send({ code: 400, message: "Failure", error_data: "Error" })
                        })
                }
            })
            .catch((err) => {
                res.send({ code: 400, message: "Failure", err })
            })
    }
    else {
        res.send(check_Token)
    }
}

module.exports.get_all_hall_details = (req, res) => {
    var response = { code: 200, message: "Success" }
    var check_Token = checktoken(req, response);
    console.log(check_Token)
    if (!check_Token.error_data) {
        create_hall.find({}, { _id: 0, __v: 0 }).sort({ Location: 1 })
            .then((data) => {
                console.log(data)
                // res.code=200
                // res.message="Success"
                // res.HallDetails=data
                res.send({ code: 200, message: "Success", HallDetails: data })
            })
            .catch((err) => {
                // res.code=400
                // res.message="Failure"
                // res.HallDetails=err
                res.send({ code: 400, message: "Failure", err })
            })
    }
    else {
        res.send(check_Token)
    }
}
