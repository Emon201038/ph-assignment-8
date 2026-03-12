"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const trip_service_1 = require("./trip.service");
const getAllTrips = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trips fetched successfully",
        statusCode: 200,
        success: true,
        data: await trip_service_1.TripService.getTrips(),
    });
});
const getTourTrips = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { data, meta } = await trip_service_1.TripService.getTourTrips(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trips fetched successfully",
        statusCode: 200,
        success: true,
        data,
        meta,
    });
});
const getSingleTripDetails = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip fetched successfully",
        statusCode: 200,
        success: true,
        data: await trip_service_1.TripService.getSingleTripDetails(req.params.id),
    });
});
const createTrip = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip created successfully",
        statusCode: 201,
        success: true,
        data: await trip_service_1.TripService.createTrip(req.body),
    });
});
const updateTrip = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip updated successfully",
        statusCode: 200,
        success: true,
        data: await trip_service_1.TripService.updateTrip(req.params.id, req.body),
    });
});
const softDeleteTrip = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip deleted successfully",
        statusCode: 200,
        success: true,
        data: await trip_service_1.TripService.softDeleteTrip(req.params.id),
    });
});
const hardDeleteTrip = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip deleted successfully",
        statusCode: 200,
        success: true,
        data: await trip_service_1.TripService.hardDeleteTrip(req.params.id),
    });
});
exports.TripController = {
    getAllTrips,
    getTourTrips,
    getSingleTripDetails,
    createTrip,
    updateTrip,
    softDeleteTrip,
    hardDeleteTrip,
};
