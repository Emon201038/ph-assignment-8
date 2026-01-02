import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TripService } from "./trip.service";

const getAllTrips = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trips fetched successfully",
    statusCode: 200,
    success: true,
    data: await TripService.getTrips(),
  });
});

const getTourTrips = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trips fetched successfully",
    statusCode: 200,
    success: true,
    data: await TripService.getTourTrips(req.params.id),
  });
});

const getSingleTripDetails = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip fetched successfully",
    statusCode: 200,
    success: true,
    data: await TripService.getSingleTripDetails(req.params.id),
  });
});

const createTrip = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip created successfully",
    statusCode: 201,
    success: true,
    data: await TripService.createTrip(req.body),
  });
});

const updateTrip = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip updated successfully",
    statusCode: 200,
    success: true,
    data: await TripService.updateTrip(req.params.id, req.body),
  });
});

const softDeleteTrip = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip deleted successfully",
    statusCode: 200,
    success: true,
    data: await TripService.softDeleteTrip(req.params.id),
  });
});

const hardDeleteTrip = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip deleted successfully",
    statusCode: 200,
    success: true,
    data: await TripService.hardDeleteTrip(req.params.id),
  });
});

export const TripController = {
  getAllTrips,
  getTourTrips,
  getSingleTripDetails,
  createTrip,
  updateTrip,
  softDeleteTrip,
  hardDeleteTrip,
};
