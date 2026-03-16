const { default: mongoose } = require("mongoose");
const { createCollection } = require("./user.model");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""

    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl required for creating a post"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user id is required for creating a post     "]
    }
})

const postModel = mongoose.model("post",postSchema)
module.exports = postModel