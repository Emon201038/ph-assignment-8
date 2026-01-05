import { JwtPayload } from "jsonwebtoken";
import AppError from "../../helpers/appError";
import { Trip } from "../trip/trip.model";
import { TripStatus } from "../trip/trip.interface";
import { Booking } from "./booking.model";
import { IGuide } from "../guide/guide.interface";
import { ITour } from "../tour/tour.interface";
import { BookingStatus } from "./booking.interface";

const createBooking = async (data: any, loggedInUser: JwtPayload) => {
  const trip = await Trip.findById(data.tripId).populate<{ tourId: ITour }>(
    "tourId",
    "price"
  );

  if (!trip) throw new AppError(404, "Trip not found");

  if (trip.status !== TripStatus.OPEN)
    throw new AppError(400, "Trip is not open");

  if (trip.bookedSeats >= trip.maxCapacity)
    throw new AppError(400, "Trip is full");
  if (trip.bookedSeats + parseInt(data.seats) > trip.maxCapacity)
    throw new AppError(400, "Trip is full");

  const isExists = await Booking.findOne({
    user: loggedInUser.userId,
    trip: data.tripId,
  });

  let lastMsg: string = "Visit your dashboard for more details.";
  if (isExists?.status !== BookingStatus.CONFIRMED)
    lastMsg = `Your last booking is ${isExists?.status}. ${
      isExists?.status === BookingStatus.PENDING
        ? "Visit your dashboard for and complete payment."
        : "You can book another trip."
    }`;
  if (isExists?.status !== BookingStatus.COMPLETED)
    lastMsg = `Your last booking is ${isExists?.status}. ${
      isExists?.status === BookingStatus.PENDING
        ? "Visit your dashboard and complete payment."
        : "You can book another trip."
    }`;
  if (isExists)
    throw new AppError(400, `You have already booked this trip. ${lastMsg}`);

  const booking = await Booking.create({
    user: loggedInUser.userId,
    trip: data.tripId,
    seats: parseInt(data.seats),
    pricePaid: trip.tourId?.price * parseInt(data.seats),
    status: BookingStatus.PENDING,
  });

  return booking;
};

export const BookingService = { createBooking };
