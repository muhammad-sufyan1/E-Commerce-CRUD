import mongoose from "mongoose";

const paymentSchema= new mongoose.Schema({
    paymentId:{
        type:String,
        required : true
    },
    orderId:{
        type:String,
        required : true,
        unique: true,
    },
    paymentDate:{
        type:String,
        required : true
    
    },
    paymentMethod:{
        type:String,
        required : true,
    },
    paymentStatus:{
        type:String,
        required : true,
    },
    amountPaid:{
        type:String,
        required : true,
    },
},{
    timestamps : true,
})
let payment=mongoose.model("payment",paymentSchema);

export default payment;

