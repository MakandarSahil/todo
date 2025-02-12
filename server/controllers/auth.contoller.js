const User = require('../models/socialLogin.models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { oauth2Client } = require("../utils/googleConfig");

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        // Get tokens from Google
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        // Get user info from Google
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        // Check if the user already exists in the database by email
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new user
            user = await User.create({
                name,
                email,
                image: picture
            });
        }

        // Generate a JWT token
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT
        });

        // Return success response with token and user data
        return res.status(200).json({
            message: 'Success',
            token,
            user
        });
    } catch (err) {
        console.log("Detailed error:", {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status
        });

        return res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

module.exports = {
    googleLogin,
};
