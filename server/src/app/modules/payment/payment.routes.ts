import express from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { paymentZodSchema } from "./payment.validation";
import { PaymentService } from "./payment.service";

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

router.get("/", PaymentController.getPayments);

export const PaymentRoutes = router;
