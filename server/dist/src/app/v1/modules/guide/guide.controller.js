"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const guide_service_1 = require("./guide.service");
const getGuides = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const data = await guide_service_1.GuideService.getGuides(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guides fetched successfully",
        statusCode: 200,
        success: true,
        data: data.guides,
        meta: data.meta,
    });
});
const getGuide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide fetched successfully",
        statusCode: 200,
        success: true,
        data: await guide_service_1.GuideService.getGuide(req.params.id),
    });
});
const getGuideTours = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide tours fetched successfully",
        statusCode: 200,
        success: true,
        data: await guide_service_1.GuideService.getActiveTours(req.params.id),
    });
});
const createGuide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide created successfully",
        statusCode: 201,
        success: true,
        data: await guide_service_1.GuideService.createGuide(req),
    });
});
const updateGuide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide updated successfully",
        statusCode: 200,
        success: true,
        data: await guide_service_1.GuideService.updateGuide(req),
    });
});
const deleteGuide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide deleted successfully",
        statusCode: 200,
        success: true,
        data: await guide_service_1.GuideService.deleteGuide(req.params.id),
    });
});
exports.GuideController = {
    getGuides,
    getGuide,
    getGuideTours,
    createGuide,
    updateGuide,
    deleteGuide,
};
