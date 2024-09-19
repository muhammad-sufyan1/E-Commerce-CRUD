import { request } from "http";
import product from "../models/product-model.js";


/* -------------------------- Post Product API ---------------------*/

export const postProductData= async(req,res)=>{
    try{
            const {productName, productTitle,productDescription,productPrice,user}= req.body;
            console.log(productName, productTitle,productDescription,productPrice);

            const productExist = await product.findOne({productName:productName});
            if(productExist){
                return res.status(400).json({message:"product already exist"});
                }
            const productData= new product({
                productName,
                productTitle,
                productDescription,
                productPrice,
                user
            })
            await productData.save();
            return res.status(200).json({ message: "product saved succesfully"})

    }
    catch(error){
        res.status(500).json(error.message);
    }
}

/* -----------------------------  Get Products By User ID API ------------------------ */ 

export const getProductsByUserId = async (req, res) => {
    try {
        const productData = await product.find().populate("user");
        res.status(200).json({success: true, productData});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


/* -----------------------------  Get one Products API ------------------------ */

export const getProductData= async(req,res)=>{
    try{
        const productData = await product.find();
        if(!productData){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({success:true, productData});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }
}

/* -----------------------------  Get Product by ID ------------------------ */

export const getProductById  = async( req,res ) =>{
    try{
        const id = req.params.id;
        const getProduct = await product.findById(id);
        if(!getProduct){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({success:true, getProduct});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }}


/* -----------------------------  Update Product API ------------------------ */

export const updateProductById = async( req,res ) => {
    try{
        const id = req.params.id;
        const updateProduct = await product.findByIdAndUpdate(id, req.body, {new:true});
        if(!updateProduct){
            return res.status(404).json({message:"Product not found"});
            }
            return res.status(200).json({success:true, message:"Product updated successfully", updateProduct});
            }
        catch(err){
                return res.status(500).json({message:err.message});
                
    }
}



/* --------------------  Delete Product API ------------------- */

export const deleteProductById = async( req,res ) => {
    try{
        const id = req.params.id;
        const deleteProduct = await product.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(404).json({message:"Product not found"});
            }
            return res.status(200).json({success:true, message:"Product deleted successfully"});
            }
            catch(err){
                return res.status(500).json({message:err.message});
                
    }
} 


