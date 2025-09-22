const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    subCategory: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    createdAt: { type: Date, default: Date.now }
},{timestamps: true});

module.exports = mongoose.model("SubCategory", SubCategorySchema);