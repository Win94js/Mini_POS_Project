const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
},{timestamps: true});
// CategorySchema.pre('save', function (next) {
//     if (this.category) {
//         this.category = this.category.toLowerCase().trim();
//     }
//     next();
// });
module.exports = mongoose.model("Category", CategorySchema);