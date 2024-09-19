import payment from "../models/payment-model.js";

/* -------------------------- Post Payment API ---------------------*/

export const postPaymentData = async (req, res) => {
    try {
        const { paymentId, orderId, paymentDate, paymentMethod, paymentStatus, amountPaid } = req.body;
        
        // Check if a payment already exists for this order
        const paymentExist = await payment.findOne({ orderId });
        if (paymentExist) {
            return res.status(400).json({ message: "Payment already exists for this order" });
        }

        // Create new payment record
        const newPayment = new payment({
            paymentId,
            orderId,
            paymentDate,
            paymentMethod,
            paymentStatus,
            amountPaid,
        });

        await newPayment.save();
        return res.status(200).json({ message: "Payment saved successfully", newPayment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* -----------------------------  Get All Payments API ------------------------ */

export const getAllPayments = async (req, res) => {
    try {
        const payments = await payment.find();
        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        return res.status(200).json({ success: true, payments });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/* -----------------------------  Get Payment By ID ------------------------ */

export const getPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const paymentDetails = await payment.findById(id);
        if (!paymentDetails) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ success: true, paymentDetails });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/* -----------------------------  Update Payment API ------------------------ */

export const updatePaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPayment = await payment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ success: true, message: "Payment updated successfully", updatedPayment });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

/* --------------------  Delete Payment API ------------------- */

export const deletePaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPayment = await payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        return res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
