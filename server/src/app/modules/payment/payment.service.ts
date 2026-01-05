import Stripe from "stripe";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Payment } from "./payment.model";
import { PaymentProvider, PaymentStatus } from "./payment.interface";
import { envVars } from "../../config/env";
import { Booking } from "../booking/booking.model";
import { BookingStatus } from "../booking/booking.interface";
import { Trip } from "../trip/trip.model";
import Tour from "../tour/tour.model";
import AppError from "../../helpers/appError";
import { TripStatus } from "../trip/trip.interface";

const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

interface CreateCheckoutSessionPayload {
  bookingId: string;
  tripId: string;
  userId: string;
  userEmail: string;
}

const createCheckoutSession = async (payload: CreateCheckoutSessionPayload) => {
  const trip = await Trip.findById(payload.tripId);
  if (!trip) throw new AppError(404, "Trip not found");

  const booking = await Booking.findById(payload.bookingId);
  if (!booking) throw new AppError(404, "Booking not found");

  const tour = await Tour.findById(trip.tourId);
  if (!tour) throw new AppError(404, "Tour not found");

  if (trip.status !== TripStatus.OPEN)
    throw new AppError(400, "Trip is not open");
  if (trip.bookedSeats >= trip.maxCapacity)
    throw new AppError(400, "Trip is full");
  if (trip.bookedSeats + booking.seats > trip.maxCapacity)
    throw new AppError(400, "Trip is full");

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

    success_url: `${envVars.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${envVars.CLIENT_URL}/payment-cancel`,
  });

  // 2️⃣ Save payment record
  await Payment.create({
    user: payload.userId,
    booking: payload.bookingId,
    trip: payload.tripId,
    amount: booking.pricePaid,
    provider: PaymentProvider.STRIPE,
    providerPaymentIntentId: session.payment_intent as string,
    status: PaymentStatus.PENDING,
    metadata: {
      checkoutSessionId: session.id,
    },
  });

  return {
    checkoutUrl: session.url,
  };
};

const handleStripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      envVars.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send("Webhook signature verification failed");
  }

  // ✅ Payment success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;
    const tripId = session.metadata?.tripId;

    const mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();

    try {
      await Payment.findOneAndUpdate(
        { "metadata.checkoutSessionId": session.id },
        {
          status: PaymentStatus.SUCCEEDED,
          providerPaymentIntentId: session.payment_intent as string,
        },
        { session: mongoSession }
      );

      await Booking.findByIdAndUpdate(
        bookingId,
        { status: BookingStatus.CONFIRMED },
        { session: mongoSession }
      );

      await Trip.findByIdAndUpdate(
        tripId,
        { $inc: { bookedSeats: 1 } },
        { session: mongoSession }
      );

      await mongoSession.commitTransaction();
    } catch (error) {
      await mongoSession.abortTransaction();
      throw error;
    } finally {
      mongoSession.endSession();
    }
  }

  res.json({ received: true });
};

export const PaymentService = {
  createCheckoutSession,
  handleStripeWebhook,
};
