const mongoose = require('mongoose');

const AdminAccountSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    phoneNumber : {type: String, required: true},
    email:{type: String, required : true},
    password: {type:String,required:true},
    address: {type: String, required: true},
    role: {type: String,
        enum: ["cashier","manager","admin"],
        default: "cashier",
        required: true
    },
    extraPermissions: [ String], // e.g. ['CREATE_PRODUCT']
  revokedPermissions: [ String], // if you want to override role defaults
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
},{timestamps: true})

module.exports = mongoose.model("AdminAccount",AdminAccountSchema);