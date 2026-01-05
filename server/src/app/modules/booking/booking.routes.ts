import express from "express";
import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingZodSchema } from "./booking.validation";

const bookingRouter = express.Router();

bookingRouter.post(
  "/trip",
  checkAuth(...Object.values(UserRole)),
  validateRequest(bookingZodSchema),
  BookingController.createBooking
);

export default bookingRouter;
