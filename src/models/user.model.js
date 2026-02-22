const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already exists"],
        required:[true,"user name required"]

    },

    email:{
        type:String,
        unique:[true,"user name already exists"],
        required:[true,"user name required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio :String,
    
        
})