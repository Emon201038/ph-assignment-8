"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trip_controller_1 = require("./trip.controller");
const validateRequest_1 = require("../../../middlewares/validateRequest");
const trip_validation_1 = require("./trip.validation");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const enums_1 = require("../../../../../prisma/generated/enums");
const tripRoutes = express_1.default.Router();
tripRoutes
    .route("/includes")
    .get(trip_controller_1.TripController.getTripInclude)
    .post((0, checkAuth_1.checkAuth)("ADMIN"), (req, res) => {
    res.status(501).json({ message: "Not yet implemented" });
});
tripRoutes
    .route("/")
    .get(trip_controller_1.TripController.getAllTrips)
    .post((0, checkAuth_1.checkAuth)("ADMIN", "GUIDE"), (0, validateRequest_1.validateRequest)(trip_validation_1.createTripSchema), trip_controller_1.TripController.createTrip);
tripRoutes
    .route("/:id")
    .get(trip_controller_1.TripController.getSingleTrip)
    .put((0, checkAuth_1.checkAuth)(enums_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(trip_validation_1.createTripSchema), trip_controller_1.TripController.updateTrip)
    .delete((0, checkAuth_1.checkAuth)(enums_1.UserRole.ADMIN), trip_controller_1.TripController.softDeleteTrip);
exports.default = tripRoutes;
