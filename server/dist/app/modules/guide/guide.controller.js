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
exports.GuideController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const guide_service_1 = require("./guide.service");
const getGuides = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield guide_service_1.GuideService.getGuides(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guides fetched successfully",
        statusCode: 200,
        success: true,
        data: data.guides,
        meta: data.meta,
    });
}));
const getGuide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide fetched successfully",
        statusCode: 200,
        success: true,
        data: yield guide_service_1.GuideService.getGuide(req.params.id),
    });
}));
const getGuideTours = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide tours fetched successfully",
        statusCode: 200,
        success: true,
        data: yield guide_service_1.GuideService.getActiveTours(req.params.id),
    });
}));
const createGuide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide created successfully",
        statusCode: 201,
        success: true,
        data: yield guide_service_1.GuideService.createGuide(req),
    });
}));
const updateGuide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide updated successfully",
        statusCode: 200,
        success: true,
        data: yield guide_service_1.GuideService.updateGuide(req),
    });
}));
const deleteGuide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Guide deleted successfully",
        statusCode: 200,
        success: true,
        data: yield guide_service_1.GuideService.deleteGuide(req.params.id),
    });
}));
exports.GuideController = {
    getGuides,
    getGuide,
    getGuideTours,
    createGuide,
    updateGuide,
    deleteGuide,
};
