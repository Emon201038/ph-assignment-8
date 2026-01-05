"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest_1 = require("./../../middlewares/validateRequest");
const express_1 = __importDefault(require("express"));
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const tripRouter = express_1.default.Router();
tripRouter
    .route("/")
    .get(trip_controller_1.TripController.getAllTrips)
    .post((0, validateRequest_1.validateRequest)(trip_validation_1.tripSchema), trip_controller_1.TripController.createTrip);
tripRouter.route("/tour/:id").get(trip_controller_1.TripController.getTourTrips);
tripRouter.route("/hard-delete/:id").delete(trip_controller_1.TripController.hardDeleteTrip);
tripRouter
    .route("/:id")
    .get(trip_controller_1.TripController.getSingleTripDetails)
    .put(trip_controller_1.TripController.updateTrip)
    .delete(trip_controller_1.TripController.softDeleteTrip);
exports.default = tripRouter;
