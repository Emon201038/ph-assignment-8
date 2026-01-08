import express from "express";
import corse from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";
import { envVars } from "./app/config/env";
import { PaymentService } from "./app/modules/payment/payment.service";

const app = express();

// stripe webhook
app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  PaymentService.handleStripeWebhook
);

// middleware
app.use(
  corse({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://parcel-delivery-system-tau.vercel.app",
      "https://assignment-6-snowy-nine.vercel.app",
      envVars.CLIENT_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1", router);

// health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Local guide api is working.",
  });
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
