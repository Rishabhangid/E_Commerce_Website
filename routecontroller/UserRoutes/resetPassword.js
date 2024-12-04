const jsonweb = require("jsonwebtoken");
const User = require("../../db_modals/userSchema");


// Reset Pasword Code
exports.resetPassword = async (req, res) => {
    const { token } = req.params; // getting token form fronted to verify it with DB ,wheather the token is active or expired.
    const { password } = req.body;
    try {
        const verifyy = await jsonweb.verify(token, process.env.KEY);
        const id = verifyy.id;
        const updatepassword = await bcrypt.hash(password, 12);
        const updateDB = await User.findByIdAndUpdate({ _id: id }, { password: updatepassword })
        console.log("password updated succesfully.");
        return res.status(200).json({ message: "password updated." })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "error in updating password." });
    }
}