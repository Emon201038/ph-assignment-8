"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_validation_1 = require("./tour.validation");
const tour_controller_1 = require("./tour.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const tourRoute = (0, express_1.Router)();
tourRoute
    .route("/")
    .get(tour_controller_1.TourController.getAllTours)
    .post((0, validateRequest_1.validateRequest)(tour_validation_1.TourValidation.create), tour_controller_1.TourController.createTour);
tourRoute
    .route("/:id")
    .get(tour_controller_1.TourController.getSingleTour)
    .patch((0, validateRequest_1.validateRequest)(tour_validation_1.TourValidation.update), tour_controller_1.TourController.updateTour)
    .delete(tour_controller_1.TourController.deleteTour);
exports.default = tourRoute;
