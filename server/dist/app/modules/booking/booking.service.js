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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const appError_1 = __importDefault(require("../../helpers/appError"));
const trip_model_1 = require("../trip/trip.model");
const trip_interface_1 = require("../trip/trip.interface");
const booking_model_1 = require("./booking.model");
const booking_interface_1 = require("./booking.interface");
const createBooking = (data, loggedInUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const trip = yield trip_model_1.Trip.findById(data.tripId).populate("tourId", "price");
    if (!trip)
        throw new appError_1.default(404, "Trip not found");
    if (trip.status !== trip_interface_1.TripStatus.OPEN)
        throw new appError_1.default(400, "Trip is not open");
    if (trip.bookedSeats >= trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    if (trip.bookedSeats + parseInt(data.seats) > trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    const isExists = yield booking_model_1.Booking.findOne({
        user: loggedInUser.userId,
        trip: data.tripId,
    });
    let lastMsg = "Visit your dashboard for more details.";
    if ((isExists === null || isExists === void 0 ? void 0 : isExists.status) !== booking_interface_1.BookingStatus.CONFIRMED)
        lastMsg = `Your last booking is ${isExists === null || isExists === void 0 ? void 0 : isExists.status}. ${(isExists === null || isExists === void 0 ? void 0 : isExists.status) === booking_interface_1.BookingStatus.PENDING
            ? "Visit your dashboard for and complete payment."
            : "You can book another trip."}`;
    if ((isExists === null || isExists === void 0 ? void 0 : isExists.status) !== booking_interface_1.BookingStatus.COMPLETED)
        lastMsg = `Your last booking is ${isExists === null || isExists === void 0 ? void 0 : isExists.status}. ${(isExists === null || isExists === void 0 ? void 0 : isExists.status) === booking_interface_1.BookingStatus.PENDING
            ? "Visit your dashboard and complete payment."
            : "You can book another trip."}`;
    if (isExists)
        throw new appError_1.default(400, `You have already booked this trip. ${lastMsg}`);
    const booking = yield booking_model_1.Booking.create({
        user: loggedInUser.userId,
        trip: data.tripId,
        seats: parseInt(data.seats),
        pricePaid: ((_a = trip.tourId) === null || _a === void 0 ? void 0 : _a.price) * parseInt(data.seats),
        status: booking_interface_1.BookingStatus.PENDING,
    });
    return booking;
});
exports.BookingService = { createBooking };
