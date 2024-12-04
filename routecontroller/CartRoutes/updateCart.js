// // > when user click on "+ increase":"- decrease" button in cart then this routes workes
// // > check if cart exist or not
// // > if caer exist then check , is proudct already there in cart or not
// // > if already in cart, perfom action
// // > if not present then add the product product woth qty:1
// // > save the changes.
// const Cart = require("../../db_modals/cartSchema")

// exports.updateCart = async(req,res)=>{
//     const {product_id, action, user_id,title,price,qty,img} = req.body
//     console.log("*************", product_id, action, user_id,title,price,qty,img)
//     try{
//         // check cart exists?
//         const find_cart = await Cart.findOne({userId:user_id})
//         if(!find_cart){
//             return res.status(500).json({success:false,error:"Cart not found."})
//         }

//         // else cart present
//         // check if product already exist or not
//         const product_is_present = await find_cart.items.find( item=> item.productId.toString() === product_id )

//         // product already present
//         if(product_is_present){ 
//             if(action === "increase"){
//                 product_is_present.qty +=1
//                 product_is_present.price = price * product_is_present.qty
//             }
//             else if(action === "decrease"){
//                 product_is_present.qty = Math.max(1,product_is_present.qty - 1)
//                 product_is_present.price = price * product_is_present.qty
//             }

//             if(action === "increase"){
//                 product_is_present.qty +=1;
//                 product_is_present.price = price * product_is_present.qty; // Updated here
//             } else if (action === "decrease") {
//                 product_is_present.qty = Math.max(1,product_is_present.qty - 1);
//                 product_is_present.price = price * product_is_present.qty; // Updated here
//             }
//         }

//         // product not present
//         else if(action === "increase"){ // adding new product
//             find_cart.items.push({product_id, qty:1,title, price:price*1,img});
//             console.log("product pushed.")
//         }
//         else{ 
//            return res.status(500).json({success:false, error:"invalid action."})
//         }

//         // saving the changes
//         const save_changes = await find_cart.save()
//         if(!save_changes){
//             return res.status(500).json({success:false, error:"cant save changes."})
//         }
//         console.log(save_changes)
//         return res.status(200).json({success:true, error:"Changes saved.", save_changes})

//     }
//     catch(error){
//         console.log(error)
//     }
// }

const Cart = require("../../db_modals/cartSchema")
const Product = require("../../db_modals/productSchema")

// exports.updateCart = async (req, res) => {
//     const { product_id, action, user_id, title, price, qty, img } = req.body;
//     console.log("Request Data:", { product_id, action, user_id, title, price, qty, img });

//     try {
//         // Check if cart exists
//         const find_cart = await Cart.findOne({ userId: user_id });
//         if (!find_cart) {
//             return res.status(500).json({ success: false, error: "Cart not found." });
//         }

//         console.log("Cart Before Update:", find_cart.items);

//         // Check if product is present in the cart
//         const product_is_present = find_cart.items.find(item => item.productId.toString() === product_id);

//         if (product_is_present) {
//             // Update quantity and price
//             if (action === "increase") {
//                 product_is_present.qty += 1; // Increase quantity by 1
//                 product_is_present.price = price * product_is_present.qty; // Update price
//             } else if (action === "decrease") {
//                 product_is_present.qty = Math.max(1, product_is_present.qty - 1); // Decrease quantity
//                 product_is_present.price = price * product_is_present.qty; // Update price
//             }
//             console.log(`Updated Product: ${product_id} | Qty: ${product_is_present.qty}, Price: ${product_is_present.price}`);
//         } else if (action === "increase") {
//             // Add new product if not present
//             find_cart.items.push({ productId: product_id, qty: 1, title, price: price * 1, img });
//             console.log("New Product Added to Cart:", { product_id, qty: 1, title, price, img });
//         } else {
//             return res.status(500).json({ success: false, error: "Invalid action." });
//         }

//         // Save changes
//         const save_changes = await find_cart.save();
//         console.log("Cart After Update:", save_changes.items);

//         if (!save_changes) {
//             return res.status(500).json({ success: false, error: "Unable to save changes." });
//         }

//         return res.status(200).json({ success: true, save_changes });
//     } catch (error) {
//         console.log("Error:", error);
//         return res.status(500).json({ success: false, error: "An error occurred." });
//     }
// };

// exports.updateCart = async (req, res) => {
//     const { product_id, action, user_id, title, price, qty, img } = req.body;
//     console.log("Request Data:", { product_id, action, user_id, title, price, qty, img });

//     try {
//         // Find user's cart
//         const find_cart = await Cart.findOne({ userId: user_id });
//         if (!find_cart) {
//             return res.status(500).json({ success: false, error: "Cart not found." });
//         }

//         // Check if the product exists in the cart
//         const product_is_present = find_cart.items.find(item => item.productId.toString() === product_id);

//         if (product_is_present) {
//             let aa = product_is_present.price
//             console.log("BASE PRICE : ", aa)
//             if (action === "increase") {
//                 // Increase quantity
//                 product_is_present.qty += 1;
//                 product_is_present.price = price * product_is_present.qty;
//             } else if (action === "decrease") {
//                 // Decrease quantity (minimum 1)
//                 // if (product_is_present.qty > 1) {
//                 //     product_is_present.qty -= 1;
//                 //     product_is_present.price = price * product_is_present.qty; // Correctly update the price
//                 // } else {
//                 //     return res.status(400).json({ success: false, error: "Minimum quantity reached." });
//                 // }
//                 console.log(`Before Decrease: Qty=${product_is_present.qty}, Price=${product_is_present.price}`);
//                 product_is_present.qty = Math.max(1, product_is_present.qty - 1);
//                 product_is_present.price = price * product_is_present.qty;
//                 console.log(`After Decrease: Qty=${product_is_present.qty}, Price=${product_is_present.price}`);

//             }
//         } else if (action === "increase") {
//             // Add new product to cart
//             find_cart.items.push({ productId: product_id, qty: 1, title, price: price * 1, img });
//         } else {
//             return res.status(500).json({ success: false, error: "Invalid action." });
//         }

//         // Save updated cart
//         const save_changes = await find_cart.save();
//         if (!save_changes) {
//             return res.status(500).json({ success: false, error: "Failed to save changes." });
//         }

//         // Respond with updated cart
//         return res.status(200).json({ success: true, save_changes });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ success: false, error: "An error occurred." });
//     }
// };


exports.updateCart = async (req, res) => {
    const { product_id, action, user_id, title, qty, img } = req.body;
    console.log("Request Data:", { product_id, action, user_id, title, qty, img });

    try {
        // Fetch the product from the Product collection to get its base price
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found." });
        }
        const basePrice = product.price;

        // Find the user's cart
        const cart = await Cart.findOne({ userId: user_id });
        if (!cart) {
            return res.status(404).json({ success: false, error: "Cart not found." });
        }

        // Check if the product exists in the cart
        const productInCart = cart.items.find(item => item.productId.toString() === product_id);

        if (productInCart) {
            // Update the quantity and price based on the action
            if (action === "increase") {
                productInCart.qty += 1;
            } else if (action === "decrease") {
                productInCart.qty = Math.max(1, productInCart.qty - 1); // Ensure quantity does not go below 1
            } else {
                return res.status(400).json({ success: false, error: "Invalid action." });
            }
            // Recalculate the price based on the base price
            productInCart.price = basePrice * productInCart.qty;
        } else if (action === "increase") {
            // Add the new product to the cart
            cart.items.push({
                productId: product._id,
                title: product.title,
                price: basePrice, // Use the base price
                qty: 1,
                img,
            });
        } else {
            return res.status(400).json({ success: false, error: "Cannot decrease quantity of a product not in the cart." });
        }

        // Save the updated cart
        const updatedCart = await cart.save();
        if (!updatedCart) {
            return res.status(500).json({ success: false, error: "Failed to save cart updates." });
        }

        // Respond with the updated cart
        return res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "An error occurred while updating the cart." });
    }
};

