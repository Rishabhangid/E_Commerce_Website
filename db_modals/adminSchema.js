const mongoose  = require("mongoose")
const jsonweb = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
  
    email:{ type:String , required:true },
    password:{ type:String , required:true },

})

// Token Generation
adminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jsonweb.sign({ _id: this._id }, process.env.SECRETKEY);
        // ( database tokens = db tokens({ db token:let token }) )
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;

    }
    catch (err) { console.log(err); }
}







const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin
