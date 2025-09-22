const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productID:{ type: String, required: true},
    productName:{ type: String, required: true},
    originalPrice:  {type: Number, required: true},
    salePrice : {type: Number, required: true},
    wholeSalePrice: {type: Number},
    quantity: {type: Number, required: true},
    alertQuantity: {type: Number, default:5 ,required: true},
    unitQuantity: {type: Number,required: true},
    unit:{ type: mongoose.Schema.Types.ObjectId, ref: "UnitSchema" },
    description: {type:String,required:true},
    photo: [{type: String}],
    category: { type: String,  required: true },
    subCategory: { type: String},
    options: [{
        subProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        
        additionalPrice: { type: Number, default: 0 }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminAccount" },
    createdAt: { type: Date, default: Date.now }
},{timestamps: true})

module.exports = mongoose.model("Product",ProductSchema);