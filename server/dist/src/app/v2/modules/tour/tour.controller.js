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
exports.TourController = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const pick_1 = require("../../../helpers/pick");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const tour_service_1 = require("./tour.service");
const getAllTours = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.pick)(req.query, paginationHelper_1.paginationHelper.paginationFields);
    const filters = (0, pick_1.pick)(req.query, [
        "searchTerm",
        "category",
        "country",
        "city",
        "minPrice",
        "maxPrice",
        "language",
    ]);
    const data = yield tour_service_1.TourService.getAllTourFromDB(options, filters);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tours fetched successfully",
        statusCode: 200,
        success: true,
        meta: data.meta,
        data: data.data,
    });
}));
const getSingleTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tour fetched successfully",
        statusCode: 200,
        success: true,
        data: yield tour_service_1.TourService.getSingleTour(req.params.id),
    });
}));
const createTour = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const data = yield tour_service_1.TourService.createTourInDB(req.body, userId);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Tour created successfully",
        statusCode: 201,
        success: true,
        data,
    });
}));
exports.TourController = { getAllTours, getSingleTour, createTour };
