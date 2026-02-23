const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")


async function registercontroller(req,res){
    const {email,username,password,bio,profileImage} = req.body


    //  const isUserExistsByEmail = await userModel.findOne({email})

    //  if (isUserExistsByEmail){
    //     return res.status(409).json({
    //         message:"user already exists with same email"
    //     })
    //  }
    //  const isUserExistsByUsername = await userModel.findOne({username})

    //  if (isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"user already exists with same username"
    //     })
    //  }

    // here we are requesing server 2 time 
    // better way
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email} 
            
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exist" + (isUserAlreadyExists.email == email ? "Email already exist":"username already exist")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

   const token =  jwt.sign({
         id:user._id
    },process.env.JWT_SERCET,{expiresIn:"1d"})

    res.cookie("token", token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage: user.profileImage

        }
            

        
    })
}



async function logincontroller(req,res){
    const {username,email,password}=req.body

    const user = await userModel.findOne({
        $or:[
            {
                username:username
            },{
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const ispasswordvalid = hash == user.password

    if(!password){
        return  res.status(401).json({
            message:'password invalid'
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SERCET,
    {expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"user loggedIn successfully",
        user:{
            username : user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}


module.exports = {
    registercontroller,
    logincontroller
}

