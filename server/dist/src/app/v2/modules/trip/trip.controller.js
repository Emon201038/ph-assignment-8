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
exports.TripController = void 0;
const pick_1 = require("../../../helpers/pick");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const trip_service_1 = require("./trip.service");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const getTripInclude = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, ["searchTerm", "category"]);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip includes fetched successfully",
        statusCode: 200,
        success: true,
        data: yield trip_service_1.TripService.getTripInclude(filters),
    });
}));
const getAllTrips = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.pick)(req.query, paginationHelper_1.paginationHelper.paginationFields);
    const filters = (0, pick_1.pick)(req.query, [
        "searchTerm",
        "status",
        "tourId",
        "guideId",
        "minPrice",
        "maxPrice",
    ]);
    const data = yield trip_service_1.TripService.getAllTripsFromDB(options, filters);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trips fetched successfully",
        statusCode: 200,
        success: true,
        meta: data.meta,
        data: data.data,
    });
}));
const getSingleTrip = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip fetched successfully",
        statusCode: 200,
        success: true,
        data: yield trip_service_1.TripService.getSingleTrip(req.params.id),
    });
}));
const createTrip = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield trip_service_1.TripService.createTripInDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip created successfully",
        statusCode: 201,
        success: true,
        data,
    });
}));
exports.TripController = {
    getTripInclude,
    getAllTrips,
    getSingleTrip,
    createTrip,
};
