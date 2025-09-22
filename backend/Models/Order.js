const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items:[{
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product",required : true },
        quantity: {type: Number, required: true},

    }],
        
    status: { type: String, enum: ["Pending", "Processing", "Completed"], default: "Pending"},
    tableNo: {type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    customerInfo:  { type: mongoose.Schema.Types.ObjectId, ref: "CustomerAccount",},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminAccount",required : false},
    
    createdAt: { type: Date, default: Date.now }
},{timestamps: true})

module.exports = mongoose.model("Order",orderSchema);