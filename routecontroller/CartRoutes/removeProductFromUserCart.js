const Cart = require("../../db_modals/cartSchema")

// removing a unique product from user`s cart.
exports.removeProductFromUserCart = async(req,res) =>{
    const product_id = req.params.id
    // const {user_id} = req.body
    const user_id = req.userID
    console.log("product to delete", product_id)
    console.log("user found ? ", user_id)   
    try{
        // finding do cart exists 
        const find_cart = await Cart.findOne({userId:user_id})
        if(!find_cart){
            res.status(500).json({success:false, error:"Cant find cart"})
        }
        // if cart exist then
        console.log("Cart found.",find_cart)
        // vo sare item return krdo jiski ye (user input id) nhi he

        // find_cart.items = find_cart.items.filter((item)=>item.productId.toString() !== product_id )
        find_cart.items = find_cart.items.filter((item)=>item.productId.toString() !== product_id.toString()
        );

        const save_changes = await find_cart.save()
        if(!save_changes){
            res.status(500).json({success:false, error:"Update cant be saved."})
        }
        res.status(200).json({success:true, message:"Product removed from cart.",save_changes})
        console.log("Product deleted.",save_changes) 
    }
    catch(error){
        console.log(error)
    }
}