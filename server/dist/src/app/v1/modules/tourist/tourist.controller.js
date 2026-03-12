"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const tourist_service_1 = require("./tourist.service");
const getTourists = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const data = await tourist_service_1.TouristService.getTourists(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourists fetched successfully",
        statusCode: 200,
        success: true,
        data: data.tourists,
        meta: data.meta,
    });
});
const getTouristById = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist fetched successfully",
        statusCode: 200,
        success: true,
        data: await tourist_service_1.TouristService.getTouristById(req.params.id),
    });
});
const createTourist = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist created successfully",
        statusCode: 201,
        success: true,
        data: await tourist_service_1.TouristService.createTourist(req),
    });
});
const updateTourist = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist updated successfully",
        statusCode: 200,
        success: true,
        data: await tourist_service_1.TouristService.updateTourist(req.params.id, req.body),
    });
});
const deleteTourist = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist deleted successfully",
        statusCode: 200,
        success: true,
        data: await tourist_service_1.TouristService.deleteTourist(req.params.id),
    });
});
exports.TouristController = {
    getTourists,
    getTouristById,
    createTourist,
    updateTourist,
    deleteTourist,
};
