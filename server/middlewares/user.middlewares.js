const j = require("joi")
const jwt = require("jsonwebtoken")
const User = require("../models/user.models")
const userSchema = j.object({
    name: j.string().min(3).max(100).required(),
    email: j.required(),
    password: j.string().min(4).max(16).required()
})

const loginSchema = j.object({
    email: j.required(),
    password: j.string().min(4).max(16).required()
})

const registerValidations = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if(error){
        return res.status(401).json({message: "Bad Request", error});
    }

    next();
}

const loginValidations = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if(error){
        return res.status(401).json({message: "Bad Request", error});
    }

    next()
}

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
            return res.status(400).json({message:"not logged in"})
    
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const userFound = await User.findOne({email, name});
    if(!userFound)
        return res.status(400).json({message:"User not found"});

    next();
}

module.exports = {
    loginValidations,
    registerValidations,
    userAuth
}