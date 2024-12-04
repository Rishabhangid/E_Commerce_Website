const Product = require("../../db_modals/productSchema")

// > deleting a product from database
exports.deleteProdcut = async(req,res)=>{
    const product_id = req.params.id
    console.log(product_id)
    try{
        const find_product = await Product.findByIdAndDelete(product_id)
        if(!find_product){
            res.status(500).json({success:false, error:"product not deleted."})
        }
        res.status(200).json({success:true, message:"product deleted."})
    }
    catch(error){
        console.log(error)
    }
}
