const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
   
    tableNo: {type: String, required : true},
    seat: {type : Number , required : true },
    status : { type: String, enum: ["Available", "Booked"], default: "Available" },
    orderId : {type: mongoose.Schema.Types.ObjectId, ref: "Order"}
},{timestamps: true})

module.exports = mongoose.model("Table",tableSchema);