"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const tour_service_1 = require("./tour.service");
exports.TourController = {
    createTour: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await tour_service_1.TourService.createTour(req);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "Tour created successfully",
            data: result,
        });
    }),
    updateTour: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await tour_service_1.TourService.updateTour(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Tour updated successfully",
            data: result,
        });
    }),
    getAllTours: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await tour_service_1.TourService.getAllTours(req.query);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Tours fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    }),
    getSingleTour: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await tour_service_1.TourService.getSingleTour(req.params.id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Tour details fetched",
            data: result,
        });
    }),
    deleteTour: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const result = await tour_service_1.TourService.deleteTour(req.params.id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: 200,
            message: "Tour deleted successfully",
            data: result,
        });
    }),
};
