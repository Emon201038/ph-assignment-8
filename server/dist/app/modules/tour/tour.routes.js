"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tour_validation_1 = require("./tour.validation");
const tour_controller_1 = require("./tour.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const uploadFile_1 = require("../../middlewares/uploadFile");
const tourRouter = (0, express_1.Router)();
tourRouter
    .route("/")
    .get(tour_controller_1.TourController.getAllTours)
    .post((0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.GUIDE), uploadFile_1.uploadImage.array("images", 3), (0, validateRequest_1.validateRequest)(tour_validation_1.TourValidation.create), tour_controller_1.TourController.createTour);
tourRouter
    .route("/:id")
    .get(tour_controller_1.TourController.getSingleTour)
    .put(uploadFile_1.uploadImage.array("images", 3), (0, validateRequest_1.validateRequest)(tour_validation_1.TourValidation.update), tour_controller_1.TourController.updateTour)
    .delete(tour_controller_1.TourController.deleteTour);
exports.default = tourRouter;
