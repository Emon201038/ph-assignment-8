"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.createStripePaymentIntent = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const payment_interface_1 = require("../v1/modules/payment/payment.interface");
const env_1 = require("./env");
const payment_model_1 = require("../v1/modules/payment/payment.model");
const booking_model_1 = require("../v1/modules/booking/booking.model");
const booking_interface_1 = require("../v1/modules/booking/booking.interface");
exports.stripe = new stripe_1.default(env_1.envVars.STRIPE_SECRET_KEY);
const createStripePaymentIntent = async ({ booking, trip, user, amount, }) => {
    const intent = await exports.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // cents
        currency: "usd",
        metadata: { booking, trip, user },
        automatic_payment_methods: { enabled: true },
    });
    await payment_model_1.Payment.create({
        user,
        booking,
        trip,
        amount,
        providerPaymentIntentId: intent.id,
        status: payment_interface_1.PaymentStatus.PENDING,
    });
    return {
        clientSecret: intent.client_secret,
    };
};
exports.createStripePaymentIntent = createStripePaymentIntent;
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = exports.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error`);
    }
    if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object;
        await payment_model_1.Payment.findOneAndUpdate({ providerPaymentIntentId: intent.id }, { status: payment_interface_1.PaymentStatus.SUCCEEDED });
        await booking_model_1.Booking.findByIdAndUpdate(intent.metadata?.booking, {
            status: booking_interface_1.BookingStatus.CONFIRMED,
        });
    }
    if (event.type === "payment_intent.payment_failed") {
        const intent = event.data.object;
        await payment_model_1.Payment.findOneAndUpdate({ providerPaymentIntentId: intent.id }, { status: payment_interface_1.PaymentStatus.FAILED });
    }
    res.json({ received: true });
};
exports.stripeWebhook = stripeWebhook;
