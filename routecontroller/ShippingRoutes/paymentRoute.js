const Payment = require("../../db_modals/paymentSchema");
const Razorpay = require("razorpay")

const razorpay = new Razorpay({
    // key_id: 'rzp_test_PZbp4XYKuWrZk0',
    // key_secret: 'YOUR_KEY_SECRET',

    // key_id: 'rzp_test_Y2wy8t1wD1AFaA',
    // key_secret: 'zSqRMpIa2ljBBpkieFYGmfLa',

    // key_id: 'rzp_test_gHH711O4gcSjCq',
    // key_secret: 'Og3WlQQcVZ5qr1ZZP5UacAhu',
    key_id: process.env.KEY_ID ,
    key_secret: process.env.KEY_SECRET ,
});

// check 0ut
exports.checkout = async (req, res) => {
    const { amount, cartItems, userShipping, userId } = req.body
    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `recipt_${Date.now()}`
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({
            orerId: order.id,
            amount: amount,
            cartItems,
            userShipping,
            userId,
            payStatus: "created"
        });
    }
    catch (error) {
        console.log(error)
    }

    // const order =  await razorpay.orders.create(options, function (err, order) {
    //     console.log(order);
    // });
}

// verify , save to db
exports.verify = async (req, res) => {

    const { order_ID, payment_ID, payment_signature, order_amount, order_items, user_ID, user_shipping } = req.body
    // console.log("DATA FROM  FRNT *********888", order_ID, payment_ID, payment_signature, order_amount, order_items, user_ID, user_shipping)

    let orderConfirm = await Payment.create({
        order_ID,
        payment_ID,
        payment_signature,
        order_amount,
        order_items,
        user_ID,
        user_shipping,
        payStatus: "paid"
    })

    res.json({ message: "DONEEEEEE", success: true, orderConfirm })
}

// user specific order
exports.user_specific_order = async (req, res) => {
    // const user_id = req.userID ;
    const user_id = req.userID.toString();
    // console.log("**** ID *********",user_id)
    console.log("User ID from token:", user_id, typeof user_id);
    try {
        const order = await Payment.findOne({ user_ID:user_id }).sort({ orderDate: -1 })
        if (!order || order.length === 0) {
            console.log("order not found");
            return res.status(404).json({ message: "No orders found for this user" });
        }
        console.log("order found", order);
        res.status(200).json(order);
    }
    catch (error) {
        res.json({error})
        console.log(error)
    }
}

// fetch all orders for admin
exports.all_order = async (req, res) => {
    
    try {
        const order = await Payment.find()
        if (!order || order.length === 0) {
            console.log("orders not found");
            return res.status(404).json({ message: "No orders found." });
        }
        console.log("orders found", order);
        res.status(200).json({success:true, orders:order});
    }
    catch (error) {
        res.json({error})
        console.log(error)
    }
}