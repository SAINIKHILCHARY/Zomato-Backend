import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Success" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", PaymentSchema);
