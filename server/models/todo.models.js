const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:String
    },
    isChecked:{
        type:Boolean,
        default: false
    },
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps: true});

export const Todo = mongoose.model("Todo", todoSchema);