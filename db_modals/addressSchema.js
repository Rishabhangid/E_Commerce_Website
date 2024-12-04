const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fullname:{ type:String , required:true },
    address:{ type:String , required:true },
    city:{ type:String , required:true },
    state:{ type:String , required:true },
    country:{ type:String , required:true },
    pincode:{ type:Number , required:true },
    number:  { type:Number , required:true },
    alt_number:  { type:Number , required:true },
    createdat:  { type:Date , default:Date.now() },

})

const Address = mongoose.model("Address", addressSchema)
module.exports = Address