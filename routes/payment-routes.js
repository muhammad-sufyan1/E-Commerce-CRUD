import express from "express";
import {
    postPaymentData,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
} from "../controller/payment-controller.js";

const paymentRoute = express.Router();

paymentRoute.post("/postPayment", postPaymentData);  // Create a new payment
paymentRoute.get("/getPayments", getAllPayments);    // Get all payments
paymentRoute.get("/getPayment/:id", getPaymentById); // Get a specific payment by ID
paymentRoute.put("/updatePayment/:id", updatePaymentById); // Update payment by ID
paymentRoute.delete("/deletePayment/:id", deletePaymentById); // Delete payment by ID

export default paymentRoute;
