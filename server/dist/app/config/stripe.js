"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.createStripePaymentIntent = exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const payment_interface_1 = require("../modules/payment/payment.interface");
const env_1 = require("./env");
const payment_model_1 = require("../modules/payment/payment.model");
const booking_model_1 = require("../modules/booking/booking.model");
const booking_interface_1 = require("../modules/booking/booking.interface");
exports.stripe = new stripe_1.default(env_1.envVars.STRIPE_SECRET_KEY);
const createStripePaymentIntent = (_a) => __awaiter(void 0, [_a], void 0, function* ({ booking, trip, user, amount, }) {
    const intent = yield exports.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // cents
        currency: "usd",
        metadata: { booking, trip, user },
        automatic_payment_methods: { enabled: true },
    });
    yield payment_model_1.Payment.create({
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
});
exports.createStripePaymentIntent = createStripePaymentIntent;
const stripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        yield payment_model_1.Payment.findOneAndUpdate({ providerPaymentIntentId: intent.id }, { status: payment_interface_1.PaymentStatus.SUCCEEDED });
        yield booking_model_1.Booking.findByIdAndUpdate((_a = intent.metadata) === null || _a === void 0 ? void 0 : _a.booking, {
            status: booking_interface_1.BookingStatus.CONFIRMED,
        });
    }
    if (event.type === "payment_intent.payment_failed") {
        const intent = event.data.object;
        yield payment_model_1.Payment.findOneAndUpdate({ providerPaymentIntentId: intent.id }, { status: payment_interface_1.PaymentStatus.FAILED });
    }
    res.json({ received: true });
});
exports.stripeWebhook = stripeWebhook;
