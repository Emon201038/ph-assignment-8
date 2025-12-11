import express from "express";
import corse from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";

const app = express();

// middleware
app.use(
  corse({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://parcel-delivery-system-tau.vercel.app",
      "https://assignment-6-snowy-nine.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1", router);

// health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Parcel Delevery System api is working.",
  });
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
