"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const trip_model_1 = require("../trip/trip.model");
const trip_interface_1 = require("../trip/trip.interface");
const booking_model_1 = require("./booking.model");
const booking_interface_1 = require("./booking.interface");
const createBooking = async (data, loggedInUser) => {
    const trip = await trip_model_1.Trip.findById(data.tripId).populate("tourId", "price");
    if (!trip)
        throw new appError_1.default(404, "Trip not found");
    if (trip.status !== trip_interface_1.TripStatus.OPEN)
        throw new appError_1.default(400, "Trip is not open");
    if (trip.bookedSeats >= trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    if (trip.bookedSeats + parseInt(data.seats) > trip.maxCapacity)
        throw new appError_1.default(400, "Trip is full");
    const isExists = await booking_model_1.Booking.findOne({
        user: loggedInUser.userId,
        trip: data.tripId,
    });
    let lastMsg = "Visit your dashboard for more details.";
    if (isExists?.status !== booking_interface_1.BookingStatus.CONFIRMED)
        lastMsg = `Your last booking is ${isExists?.status}. ${isExists?.status === booking_interface_1.BookingStatus.PENDING
            ? "Visit your dashboard for and complete payment."
            : "You can book another trip."}`;
    if (isExists?.status !== booking_interface_1.BookingStatus.COMPLETED)
        lastMsg = `Your last booking is ${isExists?.status}. ${isExists?.status === booking_interface_1.BookingStatus.PENDING
            ? "Visit your dashboard and complete payment."
            : "You can book another trip."}`;
    if (isExists)
        throw new appError_1.default(400, `You have already booked this trip. ${lastMsg}`);
    const booking = await booking_model_1.Booking.create({
        user: loggedInUser.userId,
        trip: data.tripId,
        seats: parseInt(data.seats),
        pricePaid: trip.tourId?.price * parseInt(data.seats),
        status: booking_interface_1.BookingStatus.PENDING,
    });
    return booking;
};
exports.BookingService = { createBooking };
