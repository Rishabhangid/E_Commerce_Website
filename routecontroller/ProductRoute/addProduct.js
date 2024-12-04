const Product = require("../../db_modals/productSchema");


exports.addProduct = async(req,res)=>{
    const {title,description, price, catagory, qty, image} = req.body;
    console.log(title,description, price, catagory, qty, image)
    try{
        const add_product = new Product({title,description, price, catagory, qty, image})
        const save_product = add_product.save();
        if(!save_product){
            res.status(500).json({success:false, error:"product not saved"})
        }
        res.status(200).json({success:true, message:"product saved"})

    }
    catch(error){
        console.log(error)
    }
}