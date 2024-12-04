const User = require("../../db_modals/userSchema")
const bcrypt = require("bcryptjs")

// Login Route Code
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Empty Data Fields, Please fill the data properly.");
        return res.status(400).json({ success:false, error: "Empty Data Fields, Please fill the data properly." });
    }
    try {
        const finduser = await User.findOne({ email: email });
        if (!finduser) {
            console.log("User not found.");
            return res.status(422).json({ success:false, error: "User not found." });
        }
        console.log("User found.");

        // Compare the provided password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(password, finduser.password);

        if (isPasswordValid) { 
            const token = await finduser.generateAuthToken();
            console.log(token);
            // sending cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: "/",
                // sameSite: "strict",
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
            });
            console.log("Login successful.");
            return res.status(200).json({ success:true, message: "Login successful.",token, finduser });
        } else {
            console.log("Wrong Password.");
            return res.status(401).json({ success:false, error: "Wrong Password." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};