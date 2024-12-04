const Product = require("../../db_modals/productSchema")

exports.getUniqueProdcut = async(req,res)=>{
    const prodcut_id = req.params.id
    console.log(prodcut_id)
    try{
        const find_product = await Product.find({_id:prodcut_id})
        if(!find_product){
            res.status(500).json({success:false, error:"product not found."})
        }
        res.status(200).json({success:true, message:"product found.", find_product})

    }
    catch(error){
        console.log(error)
    }
}