import Cart from "../models/cart-model.js";

/* -------------------------- Add Item to Cart API ---------------------*/

export const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, price } = req.body;

        // Check if the cart exists for the user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if the product already exists in the cart
            const productIndex = cart.items.findIndex(item => item.productId === productId);

            if (productIndex > -1) {
                // If product exists, update its quantity and price
                let productItem = cart.items[productIndex];
                productItem.quantity += quantity;
                productItem.price = price;
                cart.items[productIndex] = productItem;
            } else {
                // If product does not exist, add it to the cart
                cart.items.push({ productId, quantity, price });
            }

            // Recalculate total price and quantity
            cart.totalPrice += price * quantity;
            cart.totalQuantity += quantity;

        } else {
            // If no cart exists, create a new one
            const newCart = new Cart({
                userId,
                items: [{ productId, quantity, price }],
                totalPrice: price * quantity,
                totalQuantity: quantity
            });
            cart = newCart;
        }

        await cart.save();
        return res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* -------------------------- Get Cart By User ID API ---------------------*/

export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* -------------------------- Update Cart Item Quantity API ---------------------*/

export const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.items.findIndex(item => item.productId === productId);
        if (productIndex > -1) {
            let productItem = cart.items[productIndex];

            // Update quantity
            const quantityDifference = quantity - productItem.quantity;
            productItem.quantity = quantity;
            cart.items[productIndex] = productItem;

            // Recalculate total price and quantity
            cart.totalPrice += productItem.price * quantityDifference;
            cart.totalQuantity += quantityDifference;

            await cart.save();
            return res.status(200).json({ success: true, message: "Cart updated successfully", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* -------------------------- Delete Item From Cart API ---------------------*/

export const deleteItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.items.findIndex(item => item.productId === productId);
        if (productIndex > -1) {
            let productItem = cart.items[productIndex];

            // Update total price and quantity
            cart.totalPrice -= productItem.price * productItem.quantity;
            cart.totalQuantity -= productItem.quantity;

            // Remove item from cart
            cart.items.splice(productIndex, 1);

            await cart.save();
            return res.status(200).json({ success: true, message: "Item removed from cart", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/* -------------------------- Clear Cart API ---------------------*/

export const clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        cart.totalPrice = 0;
        cart.totalQuantity = 0;

        await cart.save();
        return res.status(200).json({ success: true, message: "Cart cleared successfully", cart });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
