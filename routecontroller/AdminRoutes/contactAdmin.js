const Admin = require("../../db_modals/adminSchema")
const Contact = require("../../db_modals/contactSchema")



exports.contactAdmin = async (req, res) => {
    const { name, email, number, message } = req.body
    console.log(name, email, number, message)
    try {
        const add_data = new Contact({ name, email, number, message })
        Admin.create({email:"rr@gmail.com", password:"abcd"})
        const save_data = await add_data.save()
        if (!save_data) {
            res.json({ success: false, error: "Cant save the data" })
        }
        res.json({ success: true, message: "Data saved" })
    }
    catch (error) {
        console.log(error)
    }
}