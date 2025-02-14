const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure the email is unique
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);  // Model name 'User'

module.exports = User;
