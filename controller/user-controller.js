import { request } from "http";
import user from "../models/user-model.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
/* -------------------------- Post User Data API ---------------------*/

export const postUserData= async(req,res)=>{
    try{
            const {userName, email,password,address}= req.body;
            console.log(userName, email,password,address);

            const userExist = await user.findOne({userName:userName});
            if(userExist){
                return res.status(400).json({message:"user already exist"});
                }
            const userData= new user({
                userName,
                email,
                password,
                address
            })
            await userData.save();
            return res.status(200).json({ message: "user saved succesfully"})

    }
    catch(error){
        res.status(500).json(error.message);
    }
}


/* -----------------------------  Get one Products API ------------------------ */

export const getUserData= async(req,res)=>{
    try{
        const userData = await user.find();
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({success:true, userData});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }
}

// /* -----------------------------  Get User by ID ------------------------ */

export const getUserById  = async( req,res ) =>{
    try{
        const id = req.params.id;
        const getUser = await user.findById(id);
        if(!getUser){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({success:true, getUser});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }}


// /* -----------------------------  Update User API ------------------------ */

export const updateUserById = async( req,res ) => {
    try{
        const id = req.params.id;
        const updateUser = await user.findByIdAndUpdate(id, req.body, {new:true});
        if(!updateUser){
            return res.status(404).json({message:"User not found"});
            }
            return res.status(200).json({success:true, message:"User updated successfully", updateUser});
            }
        catch(err){
                return res.status(500).json({message:err.message});
                
    }
}



// /* --------------------  Delete User API ------------------- */

export const deleteUserById = async( req,res ) => {
    try{
        const id = req.params.id;
        const deleteUser = await user.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message:"User not found"});
            }
            return res.status(200).json({success:true, message:"User deleted successfully"});
            }
            catch(err){
                return res.status(500).json({message:err.message});
                
    }
} 


/* --------------------- Register User API */

import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    let userData = re.body;
    let isEmailExist = await user.findOne({ email: userData.email });
    if (isEmailExist) return res.json({message: "Email already exist"});

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const User = await user.create(userData);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    
  }
 }; 


 // login API

 export const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await user.findOne({ email: userData.email });
    if (!user) return res.json({ message: "Email not found" });

    const isValidPassword = await bcrypt.compare(userData.password, user.password);
    if (!isValidPassword) {
      return res.status(200).json({ message: "password not valid" });
    }
    const jwtToken = await jwt.sign({ id: user._id },process.env.PRIVATE_KEY,{expiresIn:"5m"});
    return res.status(200).json({success:true, message: "Login successful",userData, token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
} 