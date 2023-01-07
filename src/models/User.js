const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minLength: [3, "The username must be at least 3 characters!"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "The password must be at least 6 characters!"]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;