import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const cart = mongoose.model("Cart", cartSchema);

export default cart;
