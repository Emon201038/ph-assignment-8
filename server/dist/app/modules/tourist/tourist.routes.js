"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFile_1 = require("./../../middlewares/uploadFile");
const express_1 = __importDefault(require("express"));
const tourist_controller_1 = require("./tourist.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const tourist_validation_1 = require("./tourist.validation");
const touristRouter = express_1.default.Router();
touristRouter
    .route("/")
    .get(tourist_controller_1.TouristController.getTourists)
    .post(uploadFile_1.uploadImage.single("image"), (0, validateRequest_1.validateRequest)(tourist_validation_1.touristSchema), tourist_controller_1.TouristController.createTourist);
touristRouter
    .route("/:id")
    .get(tourist_controller_1.TouristController.getTouristById)
    .put(tourist_controller_1.TouristController.updateTourist)
    .delete(tourist_controller_1.TouristController.deleteTourist);
exports.default = touristRouter;
