const User = require("../../db_modals/userSchema")

exports.getAllUsers = async(req,res)=>{
    try{
        const allUsers = await User.find().sort({createdAt:-1})
        if(!allUsers){
            res.status(500).json({error:"Cant Fetch all Users.", success: false})
        }
        res.status(200).json({error:"Succesfully Fetched all Users.", success: true, allUsers})



    }
    catch(error){
        console.log(error)
    }
}