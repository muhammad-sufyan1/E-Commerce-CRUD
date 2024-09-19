import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required : true
    },
    productTitle:{
        type:String,
        required : true,
        unique: true,
    },
    productDescription:{
        type:String,
        required : true
    
    },
    productPrice:{
        type:String,
        required : true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required : true

    }
},{
    timestamps : true,
})
let product=mongoose.model("product",productSchema);

export default product;

