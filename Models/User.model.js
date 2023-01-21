const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {type:String, required: true},
    email:{type:String,required: true},
    password: {type:String,required: true},
    emi:{type:Number, default:0}
})

const UserModel = mongoose.model("user",userSchema)

module.exports= UserModel;