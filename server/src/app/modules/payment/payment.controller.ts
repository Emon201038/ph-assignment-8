import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createCheckoutSession = catchAsync(async (req, res, next) => {
  const { bookingId, tripId } = req.body;
  const userId = req.user.userId; // assuming auth middleware

  const result = await PaymentService.createCheckoutSession({
    bookingId,
    tripId,
    userId,
    userEmail: req.user.email,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Checkout session created",
    data: result,
  });
});

const stripeWebhook = async (req: Request, res: Response) => {
  await PaymentService.handleStripeWebhook(req, res);
};

export const PaymentController = {
  createCheckoutSession,
  stripeWebhook,
};
