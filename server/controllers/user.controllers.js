const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { oauth2Client } = require("../utils/googleConfig");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Some field is missing" });
        }

        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(403).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token (Removed role)
        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ message: "User created!", user, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Some field is missing" });
        }

        const userExisted = await User.findOne({ email }).select("+password");

        if (!userExisted) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExisted.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token (Removed role)
        const token = jwt.sign(
            {
                user_id: userExisted._id,
                email: userExisted.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "User logged in successfully", user: userExisted, token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {
    login,
    signup,
};
