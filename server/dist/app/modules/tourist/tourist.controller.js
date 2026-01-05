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
exports.TouristController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const tourist_service_1 = require("./tourist.service");
const getTourists = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield tourist_service_1.TouristService.getTourists(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourists fetched successfully",
        statusCode: 200,
        success: true,
        data: data.tourists,
        meta: data.meta,
    });
}));
const getTouristById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist fetched successfully",
        statusCode: 200,
        success: true,
        data: yield tourist_service_1.TouristService.getTouristById(req.params.id),
    });
}));
const createTourist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist created successfully",
        statusCode: 201,
        success: true,
        data: yield tourist_service_1.TouristService.createTourist(req),
    });
}));
const updateTourist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist updated successfully",
        statusCode: 200,
        success: true,
        data: yield tourist_service_1.TouristService.updateTourist(req.params.id, req.body),
    });
}));
const deleteTourist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tourist deleted successfully",
        statusCode: 200,
        success: true,
        data: yield tourist_service_1.TouristService.deleteTourist(req.params.id),
    });
}));
exports.TouristController = {
    getTourists,
    getTouristById,
    createTourist,
    updateTourist,
    deleteTourist,
};
