import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique: true,
    },
    password:{
        type:Number,
        required : true    
    },
    address:{
        type:String,
        required : true,
    }
},{
    timestamps : true,
})
let user=mongoose.model("user",userSchema);

export default user;

