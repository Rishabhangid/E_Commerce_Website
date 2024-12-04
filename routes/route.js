const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser"); // passing cookie between both end

// importing middleware
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/adminAuth")

// Importing Routing Functions
// ** testing route *********** 
const {testingRoute} = require("../routecontroller/testingRoute")
// ** user routes ************
const {registerUser} = require("../routecontroller/UserRoutes/registerUser")
const {loginUser} = require("../routecontroller/UserRoutes/loginUser")
const {forgotPassword} = require("../routecontroller/UserRoutes/forgotPassword")
const {resetPassword} = require("../routecontroller/UserRoutes/resetPassword")
const { getAllUsers } = require("../routecontroller/UserRoutes/getAllUsers")
// ** products routes **********
const { addProduct } = require("../routecontroller/ProductRoute/addProduct")
const { getAllProducts } = require("../routecontroller/ProductRoute/getAllProducts")
const { getUniqueProdcut } = require("../routecontroller/ProductRoute/getUniqueProduct")
const { updateProdcut } = require("../routecontroller/ProductRoute/updateProduct")
const { deleteProdcut } = require("../routecontroller/ProductRoute/deleteProduct")
// ** cart routes
const { addtoCart } = require("../routecontroller/CartRoutes/addtoCart")
const { fetchUserCart } = require("../routecontroller/CartRoutes/fetchUserCart")
const { deleteUserCart } = require("../routecontroller/CartRoutes/deleteUserCart");
const { removeProductFromUserCart } = require("../routecontroller/CartRoutes/removeProductFromUserCart");
const { updateCart } = require("../routecontroller/CartRoutes/updateCart");
const { addAddress } = require("../routecontroller/ShippingRoutes/addAddress");
const { fetchAddress } = require("../routecontroller/ShippingRoutes/fetchAddress");
const { userProfile } = require("../routecontroller/UserRoutes/userProfile");
const { checkout, verify, user_specific_order, all_order } = require("../routecontroller/ShippingRoutes/paymentRoute");
const { contactAdmin } = require("../routecontroller/AdminRoutes/contactAdmin");
const { adminLogin } = require("../routecontroller/AdminRoutes/adminLogin");
// const { paymentRoute, checkout } = require("../routecontroller/ShippingRoutes/paymentRoute");



// middlewares
router.use(cookieParser());
router.use(express.json());

// ################################## USER ROUTES ###############################################################
// ** TESTING ROUTE **************
router.get("/test", testingRoute);

// ** USER REGISTER ROUTE ****************
router.post("/registerUser", registerUser);

// ** USER REGISTER ROUTE ***********
router.post("/loginUser", loginUser);

// ** USER REGISTER ROUTE ********************
router.post("/forgotPassword", forgotPassword);

// ** USER REGISTER ROUTE ******************
router.post("/resetPassword", resetPassword);

// ** GET ALL USERS ROUTE *************
router.get("/getallusers", getAllUsers);


// ** SEND SINGLE USER PROFILEROUTE *************
router.get("/getuser",auth, userProfile);



// ################################# PRODUCTS ROUTES ###################################################################

// ** ADD PRODUCT ROUTE **************
router.post("/addproduct",adminAuth , addProduct);

// ** GET ALL PRODUCT ROUTE *******************
router.get("/fetchallproducts", getAllProducts);

// ** FIND PRODUCT BY ID ROUTE ****************
router.get("/getproduct/:id", getUniqueProdcut);

// ** UPDATE PRODUCT ROUTE *********************
router.put("/updateproduct/:id", updateProdcut );

// ** DELETE PRODUCT ROUTE ************************
router.delete("/deleteproduct/:id", deleteProdcut );


// ################################# CART ROUTES ###################################################################

// ** ADD TO CART ROUTE ************
router.post("/addtocart",auth, addtoCart);

// ** FETCH USER CART ROUTE **********
router.get("/usercart", auth, fetchUserCart);

// ** DELETE COMPLETE USER CART ROUTE *******
router.delete("/deletecart", auth, deleteUserCart );

// ** REMOVE SPECIFIC ITEM FROM CART ROUTE ********************
router.delete("/removefromcart/:id", auth, removeProductFromUserCart );

// ** ++/-- QUANTITY ROUTE **********
router.put("/updatecart", updateCart);


// ################################# SHIPPING ADDRESS ROUTES ###################################################################

// ** ADD ADDRESS ROUTE ************
router.post("/postaddress",auth, addAddress );

// ** FETCH USER ADDRESS ROUTE ************
router.get("/getaddress",auth, fetchAddress );

// ################################# PAYMENT GATEWAy ROUTES ###################################################################

// ** PAYMENT CHECKOUT ROUTEs ************
router.post("/payment",  checkout );

// ** PAYMENT VERIFY  ROUTE ************
router.post("/verifypayment", verify );

// ** PAYMENT VERIFY  ROUTE ************
router.get("/sendorder",auth, user_specific_order );





// ** ALL ORDERS FRO ADMIN  ROUTE ************
router.get("/allorder", adminAuth , all_order  );

// ** CONTACT OUS  ROUTE ************
router.post("/contact", contactAdmin  );

// ** ADMIN LOGIN  ROUTE ************
router.post("/adminlogin", adminLogin  );





module.exports = router; //exporting to use in index.js