import Stripe from "stripe";
import { PaymentStatus } from "../modules/payment/payment.interface";
import { envVars } from "./env";
import { Payment } from "../modules/payment/payment.model";
import { Request, Response } from "express";
import { Booking } from "../modules/booking/booking.model";
import { BookingStatus } from "../modules/booking/booking.interface";

export const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async ({
  booking,
  trip,
  user,
  amount,
}: {
  booking: string;
  trip: string;
  user: string;
  amount: number;
}) => {
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // cents
    currency: "usd",
    metadata: { booking, trip, user },
    automatic_payment_methods: { enabled: true },
  });

  await Payment.create({
    user,
    booking,
    trip,
    amount,
    providerPaymentIntentId: intent.id,
    status: PaymentStatus.PENDING,
  });

  return {
    clientSecret: intent.client_secret,
  };
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;

    await Payment.findOneAndUpdate(
      { providerPaymentIntentId: intent.id },
      { status: PaymentStatus.SUCCEEDED }
    );

    await Booking.findByIdAndUpdate(intent.metadata?.booking, {
      status: BookingStatus.CONFIRMED,
    });
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;

    await Payment.findOneAndUpdate(
      { providerPaymentIntentId: intent.id },
      { status: PaymentStatus.FAILED }
    );
  }

  res.json({ received: true });
};
