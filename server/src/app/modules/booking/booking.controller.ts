import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Booking created successfully",
    statusCode: 201,
    success: true,
    data: await BookingService.createBooking(req.body, req.user),
  });
});

export const BookingController = { createBooking };
