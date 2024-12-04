const User = require("../../db_modals/userSchema")

// Register Route Code
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("Empty Feilds");
        return res.status(422).json({ error: "Empty Feilds." });
    }
    console.log(name,email,password)
    try {
        const finduser = await User.findOne({ email: email });
        if (finduser) {
            console.log("User with this email already exists");
            return res.status(500).json({ message: "User already with this email address." })
        }
        else {
            const user = new User({ name: name, email: email, password: password });
            const saveuser = await user.save();
            if (saveuser) {
                console.log("User registered succesfully.");
                return res.status(200).json({ success:true,user, message: "User registered succesfully." });
            }
            else {
                console.log("User Cant registered.");
                return res.status(400).json({ error: "User Cant registered." });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(422).json({ error: "catch error register route." })
    }
} 