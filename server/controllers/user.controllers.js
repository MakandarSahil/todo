const  User  = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if(!name || !email || !password){
            return res.status(402).json({message:"some filed is missing"})
        }
        const userFound = await User.findOne({email});
        if(userFound){
            return res.status(403).json({message:"user already exists!"});
        }

        bcrypt.hash(password, 10,async function(err, hash) {
            if(err)
                return res.status(400).json({err});
            else{
                const user = await User.create({
                    name,
                    email,
                    password:hash,
                })

                return res.status(201).json({message:"user created!", user});
            }
        });
        
    } catch (error) {
        return res.status(501).json({message: "Internal serve error", error});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(402).json({message:"some filed is missing"})
        }
        const userExisted = await User.findOne({email}, {password});

        if(!userExisted){
            return res.status(404).json({message: "user not found"})
        }

        const token = jwt.sign({email:userExisted.email, name: userExisted.name}, process.env.JWT_SECRET)
        res.cookie("token", token);
        return res
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });

    }catch(error){
        return res.status(501).json({message: "Internal serve error", error});
    }
}


module.exports = {
    login,
    signup
}