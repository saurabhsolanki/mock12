const mongoose = require("mongoose")

const EmiSchema = new mongoose.Schema({
    user_id:{type:String,required:true},
    loan:{type:Number,required: true},
    rate: {type:Number, required: true},
    tenure: {type:Number,required: true},
    emi: {type:Number,required: true},
    totalamount: {type:Number,required: true},
    interest: {type:Number,required: true},
})

const EmiModel = mongoose.model("emi",EmiSchema)

module.exports= EmiModel