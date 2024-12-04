const Address = require("../../db_modals/addressSchema")

exports.fetchAddress = async(req,res)=>{
    // const user_id = "6741708d0c60d97436ecc69d"
    const user_id = req.rootUser

    try{
         const address = await Address.find({userId:user_id})
         if(!address){
            res.status(500).json({success:false, error:"No address found."})
        }
        res.status(200).json({success:true, message:"Address found", address})
    }
    catch(error){
        console.log(error)
    }
}