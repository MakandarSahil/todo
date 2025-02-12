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
    image: {
        type: String
    }
});

const User = mongoose.model('social-login', userSchema);  // Model name 'User'

module.exports = User;
