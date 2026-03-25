"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../../middlewares/checkAuth");
const uploadFile_1 = require("../../../middlewares/uploadFile");
const userRoutes = express_1.default.Router();
userRoutes
    .route("/")
    .get(user_controller_1.UserController.getAllUsers)
    .post((0, validateRequest_1.validateRequest)(user_validation_1.createUserSchema), user_controller_1.UserController.createUser);
userRoutes
    .route("/:id")
    .get(user_controller_1.UserController.getSingleUser)
    .put(uploadFile_1.uploadImage.fields([
    {
        name: "avatar",
        maxCount: 1,
    },
    {
        name: "banner",
        maxCount: 1,
    },
]), (0, checkAuth_1.checkAuth)("ADMIN", "TRAVELER", "GUIDE"), (0, validateRequest_1.validateRequest)(user_validation_1.updateUserSchema), user_controller_1.UserController.updateUser)
    .delete((0, checkAuth_1.checkAuth)("ADMIN", "TRAVELER", "GUIDE"), user_controller_1.UserController.hardDeleteUser);
userRoutes.delete("/soft-delete/:id", user_controller_1.UserController.softDeleteUser);
userRoutes
    .route("/emergency-contacts/:id")
    .post(user_controller_1.UserController.addEmergencyContact)
    .get(user_controller_1.UserController.getEmergencyContact)
    .put(user_controller_1.UserController.updateEmergencyContact)
    .delete(user_controller_1.UserController.removeEmergencyContact);
exports.default = userRoutes;
