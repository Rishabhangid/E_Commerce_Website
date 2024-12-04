exports.userProfile = async (req, res) => {
    try {
        // console.log("**************8888")
        // console.log(req.rootUser)
        const { password, ...userWithoutPassword } = req.rootUser.toObject();

        console.log("Sending user data without password:", userWithoutPassword);
        console.log("bhej diya lnd")
        res.status(200).json({userinfo:userWithoutPassword})
    }
    catch (error) {
        console.log(error)
    }
}