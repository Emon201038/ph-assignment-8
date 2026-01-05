"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../../utils/catchAsync");
const createCheckoutSession = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, tripId } = req.body;
    const userId = req.user.userId; // assuming auth middleware
    const result = yield payment_service_1.PaymentService.createCheckoutSession({
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
}));
const stripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield payment_service_1.PaymentService.handleStripeWebhook(req, res);
});
exports.PaymentController = {
    createCheckoutSession,
    stripeWebhook,
};
