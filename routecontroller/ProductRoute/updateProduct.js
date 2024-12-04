const Product = require("../../db_modals/productSchema")

exports.updateProdcut = async(req,res)=>{
    const product_id = req.params.id
    const {title,description, price, catagory, qty, image} = req.body;

    console.log(product_id)
    try{
        const find_product = await Product.findByIdAndUpdate(product_id, {title,description, price, catagory, qty, image},{new:true})
        if(!find_product){
            return res.status(500).json({success:false, error:"Product not updated"})
        }
        return res.json({message:"product updated", find_product})
    }
    catch(error){
        console.log(error)
    }
}