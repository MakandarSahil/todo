const mongoose = require("mongoose");

const ConnectDB = async () => {
    try{
        const url = process.env.MONGOD_URI
        await mongoose.connect(url);
        console.log("MongoDB Connected....");
    }catch{
        console.log("MongoDB connection failed...", error);
    }
}

module.exports = ConnectDB;