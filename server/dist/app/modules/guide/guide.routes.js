"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFile_1 = require("./../../middlewares/uploadFile");
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const guide_controller_1 = require("./guide.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const guide_validation_1 = require("./guide.validation");
const guideRouter = express_1.default.Router();
guideRouter
    .route("/")
    .get((0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.GUIDE), guide_controller_1.GuideController.getGuides)
    .post(uploadFile_1.uploadImage.single("image"), (0, validateRequest_1.validateRequest)(guide_validation_1.guideSchema), guide_controller_1.GuideController.createGuide);
guideRouter.get("/tours/:id", guide_controller_1.GuideController.getGuideTours);
guideRouter
    .route("/:id")
    .get(guide_controller_1.GuideController.getGuide)
    .put((0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.GUIDE), guide_controller_1.GuideController.updateGuide)
    .delete((0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.GUIDE), guide_controller_1.GuideController.deleteGuide);
exports.default = guideRouter;
