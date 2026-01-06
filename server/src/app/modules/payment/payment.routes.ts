import express from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { paymentZodSchema } from "./payment.validation";

const router = express.Router();

/**
 * Create Stripe Checkout Session
 */
router.post(
  "/trip/checkout-session",
  checkAuth(...Object.values(UserRole)),
  validateRequest(paymentZodSchema),
  PaymentController.createCheckoutSession
);

/**
 * Stripe Webhook
 * NOTE: this route MUST use express.raw()
 */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.stripeWebhook
);

router.get("/", PaymentController.getPayments);

export const PaymentRoutes = router;
