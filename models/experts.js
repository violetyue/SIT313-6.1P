const mongoose = require("mongoose")
const expertSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required:'Please enter the id'
        },
        expert_name: {
            type: String,
            required:'Please enter the name'
        },
        address: {
            type: String,
            required:'Please enter the address'
        },
        mobile: {
            type: String,
            required:'Please enter the mobile number'
        },
        password: {
            type: String,
            required:'Please enter the password'
        },
        creation_data: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Expert", expertSchema);