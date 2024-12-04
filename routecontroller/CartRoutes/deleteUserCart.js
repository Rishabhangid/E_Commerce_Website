const Cart = require("../../db_modals/cartSchema")

// deleting the user cart
exports.deleteUserCart = async (req, res) => {
    // const { user_id } = req.body
    const user_id = req.rootUser
    console.log(user_id)
    try {
        const find_user_cart = await Cart.findOneAndDelete({ userId:user_id })
        if (!find_user_cart) {

            return res.status(500).json({ success: false, error: "cant delete cart" })
        }
       return  res.status(200).json({ success: true, message: "Cart deleted.",find_user_cart })
    }
    catch (error) {
        console.log(error)
    }
}