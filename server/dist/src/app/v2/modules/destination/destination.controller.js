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
exports.DestinationController = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const pick_1 = require("../../../helpers/pick");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const destination_service_1 = require("./destination.service");
const getAllDestinations = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.pick)(req.query, paginationHelper_1.paginationHelper.paginationFields);
    const filters = (0, pick_1.pick)(req.query, ["searchTerm", "date", "popular"]);
    const data = yield destination_service_1.DestinationService.getDestinationsFromDb(options, filters);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Destinations fetched successfully",
        statusCode: 200,
        success: true,
        meta: data.meta,
        data: data.destinations,
    });
}));
const getSingleDestination = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Destination fetched successfully",
        statusCode: 200,
        success: true,
        data: yield destination_service_1.DestinationService.getSingleDestination(req.params.id),
    });
}));
const getNearbyDestinations = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "Nearby Destinations fetched successfully",
        statusCode: 200,
        success: true,
        data: yield destination_service_1.DestinationService.getNearbyDestinations(Number(req.query.lat), Number(req.query.lng)),
    });
}));
exports.DestinationController = {
    getAllDestinations,
    getSingleDestination,
    getNearbyDestinations,
};
