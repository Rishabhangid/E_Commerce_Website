const Product = require("../../db_modals/productSchema");

exports.getAllProducts = async(req,res)=>{
    try{
        const fetch_all_products = await Product.find()
        if(!fetch_all_products){
            res.status(500).json({success:false, error:"Cant fetch products"})
        }
        res.status(200).json({success:true, message:"Fetched all products", fetch_all_products})
    }
    catch(error){
        console.log(error)
    }
}