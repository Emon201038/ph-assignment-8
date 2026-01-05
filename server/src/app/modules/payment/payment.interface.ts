import { Types } from "mongoose";

export enum PaymentStatus {
  PENDING = "PENDING", // intent created
  REQUIRES_ACTION = "REQUIRES_ACTION",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentProvider {
  STRIPE = "STRIPE",
}

export interface IPayment {
  user: Types.ObjectId;
  booking: Types.ObjectId;
  trip: Types.ObjectId;

  amount: number; // stored in major unit (USD)
  currency: string;

  provider: PaymentProvider;
  providerPaymentIntentId: string;

  status: PaymentStatus;

  metadata?: Record<string, any>;

  createdAt?: Date;
  updatedAt?: Date;
}
