"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const booking_validation_1 = require("./booking.validation");
const bookingRouter = express_1.default.Router();
bookingRouter.post("/trip", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), (0, validateRequest_1.validateRequest)(booking_validation_1.bookingZodSchema), booking_controller_1.BookingController.createBooking);
exports.default = bookingRouter;
