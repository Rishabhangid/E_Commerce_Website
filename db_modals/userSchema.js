const mongoose  = require("mongoose")
const bcrypt = require("bcryptjs")
const jsonweb = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{ type:String , required:true },
    email:{ type:String , required:true },
    password:{ type:String , required:true },
    createdAt:{ type:Date, default:Date.now()}
})

// Pre Fuction to encrypt Password which runs before saving data in DB
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) { // it mean jb pass chnge ho tb hi ecrypt krna he.
        this.password = await bcrypt.hash(this.password, 12);

    }
    next();

})

// Token Generation
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jsonweb.sign({ _id: this._id }, process.env.SECRETKEY);
        // ( database tokens = db tokens({ db token:let token }) )
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;

    }
    catch (err) { console.log(err); }
}

const User = mongoose.model("Users", userSchema)
module.exports = User