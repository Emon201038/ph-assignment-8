"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Booking created successfully",
        statusCode: 201,
        success: true,
        data: await booking_service_1.BookingService.createBooking(req.body, req.user),
    });
});
exports.BookingController = { createBooking };
