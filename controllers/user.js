const user_model = require("../model/user_model");

module.exports.create_user = (req, res) => {
    console.log(req.body)

    const user = new user_model({
        id: req.body.id,
        name: req.body.name,
        location: req.body.location
    });
    console.log(user)
    user_model.findOne({ id: user.id })
        .then((data) => {
            if (data == null) {
                user.save()
                    .then((data) => {
                        console.log(data)
                        res.send({ code: 200, message: "Successfully created", data })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send({ code: 400, message: "ERROR", err })
                    })
            }
            else {
                res.send({ code: 400, message: "USER ALREADY EXISTING....", data })
            }
        })
}

module.exports.update_user = (req, res) => {
    console.log(req.body);

    user_model.findOneAndUpdate({
        id: req.body.id
    },
        {
            $set: {
                name: req.body.name,
                location: req.body.location
            }
        },
        { returnOriginal: false })
        .then((data) => {
            res.send({ code: 200, message: "Updated successfully", data });
        })
        .catch((err) => {
            res.send({ code: 400, message: "Error on updating...", err })
        })

}

module.exports.delete_user = (req, res) => {
    console.log(req.body);

    user_model.findOneAndDelete({
        id: req.body.id,
    })
        .then((data) => {
            res.send({ code: 200, message: "Deleted successfully" });
        })
        .catch((err) => {
            res.send({ code: 400, message: "Error in deleting...", err })
        })
}

module.exports.get_all = (req, res) => {
    console.log("res")
    user_model.find().sort({ Id: 1 })
        .then((data) => {
            res.send({ code: 200, message: data })
        })
        .catch((err) => {
            res.send({ code: 400, message: "Error on fetching data...", err })
        })

}