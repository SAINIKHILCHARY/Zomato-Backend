import processPayment from "../models/Payment.js";

export const processPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;

        // Simulate a successful payment
        const paymentStatus = "Success";
        res.status(200).json({ message: "Payment successful", paymentStatus });
    } catch (err) {
        res.status(500).json({ message: "Payment failed" });
    }
};
