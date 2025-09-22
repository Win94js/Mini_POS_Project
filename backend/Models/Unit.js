const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    unit: { type: String, 
       
        default:"kg",
        required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Unit", UnitSchema);