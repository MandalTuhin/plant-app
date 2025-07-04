const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    description: {type: String, required:true}, 
    img: {type: String, required: true},
}, {
    timestamps: true
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;