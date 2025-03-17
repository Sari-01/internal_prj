const mongoose = require("mongoose");

const mvc_pattern = mongoose.Schema({
    id: Number,
    name: String,
    location: String
})

module.exports = mongoose.model('mvc_pattern', mvc_pattern)