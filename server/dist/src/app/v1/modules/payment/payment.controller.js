"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const httpStatus_1 = require("../../../utils/httpStatus");
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = require("../../../utils/catchAsync");
const createCheckoutSession = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { bookingId, tripId } = req.body;
    const userId = req.user.userId; // assuming auth middleware
    const result = await payment_service_1.PaymentService.createCheckoutSession({
        bookingId,
        tripId,
        userId,
        userEmail: req.user.email,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Checkout session created",
        data: result,
    });
});
const stripeWebhook = async (req, res) => {
    await payment_service_1.PaymentService.handleStripeWebhook(req, res);
};
const getPayments = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: httpStatus_1.HTTP_STATUS.OK,
        success: true,
        message: "Payments fetched successfully",
        data: await payment_service_1.PaymentService.getPayments(),
    });
});
exports.PaymentController = {
    createCheckoutSession,
    stripeWebhook,
    getPayments,
};
