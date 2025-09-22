const mongoose = require('mongoose');

const CustomerAccountSchema = new mongoose.Schema({
    name:{ type: String},
    phoneNumber : {type: String},
    address: {type: String},
    point: {type: Number},
    orderId : { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminAccount" },
    
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

module.exports = mongoose.model("CustomerAccount",CustomerAccountSchema);