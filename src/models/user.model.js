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
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/cdhy5ue7m/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
    }

        
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel

