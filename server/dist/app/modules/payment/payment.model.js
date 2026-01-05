"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const payment_interface_1 = require("./payment.interface");
const paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true,
        index: true,
    },
    trip: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "usd",
    },
    provider: {
        type: String,
        enum: Object.values(payment_interface_1.PaymentProvider),
        default: payment_interface_1.PaymentProvider.STRIPE,
    },
    providerPaymentIntentId: {
        type: String,
        // required: true,
        // unique: true,
        // index: true,
    },
    status: {
        type: String,
        enum: Object.values(payment_interface_1.PaymentStatus),
        default: payment_interface_1.PaymentStatus.PENDING,
        index: true,
    },
    metadata: mongoose_1.Schema.Types.Mixed,
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
