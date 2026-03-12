import { Schema, model } from "mongoose";
import { IPayment, PaymentStatus, PaymentProvider } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
      index: true,
    },

    trip: {
      type: Schema.Types.ObjectId,
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
      enum: Object.values(PaymentProvider),
      default: PaymentProvider.STRIPE,
    },

    providerPaymentIntentId: {
      type: String,
      // required: true,
      // unique: true,
      // index: true,
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      index: true,
    },

    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
