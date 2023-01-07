const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtSign = promisify(jwt.sign);
const { SALT_ROUNDS, SECRET } = require('../../config/constants');

exports.registerUser = async (userData) => {
    const user = await User.find({ email: userData.email });

    if (user) {
        return "User with this email already exists!";
    } else {
        const password = await bcrypt.hash(userData.password, SALT_ROUNDS);
        const user = await User.create({ ...userData, password: password });
        return user;
    }
}

exports.generateToken = async (userData) => {
    const token = await jwtSign({ _id: userData._id }, SECRET, { expiresIn: '2d' });
    return token;
}