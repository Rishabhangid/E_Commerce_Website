//  basically hm kya kr rhe her ki, jb user kisi product pr add to cart krega, to sbse phle :
// > check agr cart phle se se he ya nhi ,nhi heto nyi cart bnao or product save krdo
// > if cart already exits krti he to, check ki jo product hm add kr rhe he vo phle se cart me he ya nhi
// > if vo product phlese cart meexist krta he to bs uski qty or price chage krdo
// > if phle se nhi he to us cart me product add krdo(pudh krdo),
// > then update krdo cart ko

const Cart = require("../../db_modals/cartSchema")

exports.addtoCart = async (req, res) => {
    // jb kisi bhi product pr add to cart pr click krenge, tb frnt se uski detail bhenjenge bcknd pr
    const { productId, title, price, qty, img } = req.body
    console.log("**********88",productId, title, price, qty, img)
    const user_id = req.rootUser
    try {
        const find_cart = await Cart.findOne({ userId: user_id })
        if (!find_cart) {
            const new_item = new Cart({ userId: user_id, items: [] })
            new_item.items.push({ productId, title, price, qty, img })
            const save_item = await new_item.save()
            if (!save_item) {
                res.status(500).json({ error: "Cant add to cart", success: false })
            }
            res.status(200).json({ message: "Added to cart", success: true })
            console.log("Added to Cart. ")
        }

        const already_exist = find_cart.items.findIndex((item) => item.productId.toString() === productId);
        if (already_exist > -1) {
            find_cart.items[already_exist].qty += qty
            find_cart.items[already_exist].price += price * qty
            console.log("it runs")
            console.log(find_cart)
            // res.json({ find_cart })
        } else {
            find_cart.items.push({ productId, title, price, qty, img })
        }

        const update_cart = await find_cart.save()
        if(!update_cart){
            res.status(500).json({error:"cart not updated" ,success: false})
        }

        res.status(200).json({message:"cart updated" ,success: true, find_cart})





    }
    catch (error) {
        console.log(error)
    }



}