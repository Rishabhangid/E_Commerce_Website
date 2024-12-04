const Cart = require("../../db_modals/cartSchema")

// > fetching complete user cart from database and sending
exports.fetchUserCart = async (req, res) => {
    console.log("hy")
    // const {user_id} = req.body
    // const user_id = "673eb7eba8356bc70a592663"
    const user_id = req.rootUser
    console.log("User id of which cart to end:", user_id)

    try {
        const find_cart = await Cart.findOne({ userId: user_id })
        if (!find_cart) {
            res.status(500).json({ success: false, error: "No Cart Found" })
        }
        res.status(200).json({ success: true, message: "Cart Found", find_cart })
        console.log("Cart Bhejdi")
    }
    catch (error) {
        console.log(error)
    }

}