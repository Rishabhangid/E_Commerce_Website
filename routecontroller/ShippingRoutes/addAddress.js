// const Address = require("../../db_modals/addressSchema")

// exports.addAddress = async(req,res)=>{
//     const { fullname, address, city, state, country, pincode, number, alt_number } = req.body
//     console.log(fullname, address, city, state, country, pincode, number, alt_number)
//     // const user_id = "6741708d0c60d97436ecc69d"
//     const user_id = req.rootUser

//     try{
//         const add_address = await new Address({userId:user_id,fullname, address, city, state, country, pincode, number,alt_number})
//         const save_address = await add_address.save()
//         if(!save_address){
//             console.log("ADDRESS NOT SAVED.")
//             res.status(500).json({success:false, error:"Cant save the address"})
//         }
//         console.log("ADDRESS SAVED.")
//         res.status(200).json({success:true, message:"Address Saved.",add_address})
//     }
//     catch(error){
//         console.log("ADDRESS NOT SAVED.")
//         console.log(error)
//         res.status(500).json({success:false, error:"Cant save the address"})
//     }
// }

const Address = require("../../db_modals/addressSchema");

exports.addAddress = async (req, res) => {
    const { fullname, address, city, state, country, pincode, number, alt_number } = req.body;
    const user_id = req.rootUser;

    try {
        // Check if the address already exists for this user
        const existingAddress = await Address.findOne({ userId: user_id });

        if (existingAddress) {
            // Update the existing address
            existingAddress.fullname = fullname;
            existingAddress.address = address;
            existingAddress.city = city;
            existingAddress.state = state;
            existingAddress.country = country;
            existingAddress.pincode = pincode;
            existingAddress.number = number;
            existingAddress.alt_number = alt_number;

            const updatedAddress = await existingAddress.save();

            if (!updatedAddress) {
                console.log("ADDRESS NOT UPDATED.");
                console.log(updatedAddress)
                return res.status(500).json({ success: false, error: "Unable to update the address." });
            }

            console.log("ADDRESS UPDATED.");
            return res.status(200).json({ success: true, message: "Address updated successfully.", updatedAddress });
        } else {
            // Create a new address if none exists
            const newAddress = new Address({
                userId: user_id,
                fullname,
                address,
                city,
                state,
                country,
                pincode,
                number,
                alt_number,
            });

            const savedAddress = await newAddress.save();

            if (!savedAddress) {
                console.log("ADDRESS NOT SAVED.");
                return res.status(500).json({ success: false, error: "Unable to save the address." });
            }

            console.log("ADDRESS SAVED.");
            return res.status(200).json({ success: true, message: "Address saved successfully.", savedAddress });
        }
    } catch (error) {
        console.log("ERROR WHILE SAVING/UPDATING ADDRESS.");
        console.error(error);
        return res.status(500).json({ success: false, error: "An error occurred while processing the address." });
    }
};
