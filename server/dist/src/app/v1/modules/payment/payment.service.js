"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const mongoose_1 = __importDefault(require("mongoose"));
const payment_model_1 = require("./payment.model");
const payment_interface_1 = require("./payment.interface");
const env_1 = require("../../../config/env");
const booking_model_1 = require("../booking/booking.model");
const booking_interface_1 = require("../booking/booking.interface");
const trip_model_1 = require("../trip/trip.model");
const tour_model_1 = __importDefault(require("../tour/tour.model"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const trip_interface_1 = require("../trip/trip.interface");
const stripe = new stripe_1.default(env_1.envVars.STRIPE_SECRET_KEY);
const createCheckoutSession = async (payload) => {
    const trip = await trip_model_1.Trip.findById(payload.tripId);
    if (!trip)
        throw new appError_1.default(404, "Trip not found");
    const booking = await booking_model_1.Booking.findById(payload.bookingId);
    if (!booking)
        throw new appError_1.default(404, "Booking not found");
    const tour = await tour_model_1.default.findById(trip.tourId);
    if (!tour)
        throw new appError_1.default(404, "Tour not found");
    if (trip.status !== trip_interface_1.TripStatus.OPEN)
        throw new appError_1.default(400, "Trip is not open");
    if (trip.bookedSeats >= trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    if (trip.bookedSeats + booking.seats > trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    // 1️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: payload.userEmail,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: Math.round(tour.price * 100),
                    product_data: {
                        name: "Trip Booking " + tour.title,
                    },
                },
                quantity: booking.seats,
            },
        ],
        metadata: {
            bookingId: payload.bookingId,
            tripId: payload.tripId,
            userId: payload.userId,
        },
        success_url: `${env_1.envVars.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env_1.envVars.CLIENT_URL}/payment-cancel`,
    });
    // 2️⃣ Save payment record
    await payment_model_1.Payment.create({
        user: payload.userId,
        booking: payload.bookingId,
        trip: payload.tripId,
        amount: booking.pricePaid,
        provider: payment_interface_1.PaymentProvider.STRIPE,
        providerPaymentIntentId: session.payment_intent,
        status: payment_interface_1.PaymentStatus.PENDING,
        metadata: {
            checkoutSessionId: session.id,
        },
    });
    return {
        checkoutUrl: session.url,
    };
};
const handleStripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, env_1.envVars.STRIPE_WEBHOOK_SECRET);
        console.log(event, "stripe event");
    }
    catch (err) {
        console.log("webhook error:", err);
        return res.status(400).send("Webhook signature verification failed");
    }
    // ✅ Payment success
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;
        const tripId = session.metadata?.tripId;
        const mongoSession = await mongoose_1.default.startSession();
        mongoSession.startTransaction();
        try {
            await payment_model_1.Payment.findOneAndUpdate({ "metadata.checkoutSessionId": session.id }, {
                status: payment_interface_1.PaymentStatus.SUCCEEDED,
                providerPaymentIntentId: session.payment_intent,
            }, { session: mongoSession });
            await booking_model_1.Booking.findByIdAndUpdate(bookingId, { status: booking_interface_1.BookingStatus.CONFIRMED }, { session: mongoSession });
            await trip_model_1.Trip.findByIdAndUpdate(tripId, { $inc: { bookedSeats: 1 } }, { session: mongoSession });
            await mongoSession.commitTransaction();
        }
        catch (error) {
            console.log(error, "update error");
            await mongoSession.abortTransaction();
            throw error;
        }
        finally {
            mongoSession.endSession();
        }
    }
    res.json({ received: true });
};
const getPayments = async () => {
    return await payment_model_1.Payment.find();
};
exports.PaymentService = {
    createCheckoutSession,
    handleStripeWebhook,
    getPayments,
};
