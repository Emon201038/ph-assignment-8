"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const review_validation_1 = require("./review.validation");
const reviewRouter = express_1.default.Router();
reviewRouter.post("/", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), (0, validateRequest_1.validateRequest)(review_validation_1.createReviewSchema), review_controller_1.ReviewController.createReview);
reviewRouter.get("/:targetType/:targetId", review_controller_1.ReviewController.getReviews);
reviewRouter.get("/stats/:targetType/:targetId", review_controller_1.ReviewController.getReviewStats);
exports.default = reviewRouter;
