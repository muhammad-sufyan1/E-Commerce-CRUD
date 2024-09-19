import express from "express";
import {
    addItemToCart,
    getCartByUserId,
    updateCartItem,
    deleteItemFromCart,
    clearCart
} from "../controller/cart-controller.js";

const cartRoute = express.Router();

cartRoute.post("/addItemToCart", addItemToCart); // Add item to cart
cartRoute.get("/getCart/:userId", getCartByUserId); // Get cart by user ID
cartRoute.put("/updateCartItem", updateCartItem); // Update item quantity in cart
cartRoute.delete("/deleteItemFromCart", deleteItemFromCart); // Remove item from cart
cartRoute.delete("/clearCart/:userId", clearCart); // Clear cart

export default cartRoute;
