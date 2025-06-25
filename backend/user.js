const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true,  unique: true},
    // will later add email and email verification, not now.
    password: {type: String, required: true,}
}, {timestamps: true });

module.exports = mongoose.model('User', userSchema);