"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuth_1 = require("./../../middlewares/checkAuth");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const uploadFile_1 = require("../../middlewares/uploadFile");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const userRouter = express_1.default.Router();
userRouter
    .route("/")
    .get((0, checkAuth_1.checkAuth)("ADMIN"), user_controller_1.UserController.getUsers)
    .post(uploadFile_1.uploadImage.single("image"), (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.create), user_controller_1.UserController.createUser);
userRouter.get("/find/:email", user_controller_1.UserController.getUserByEmail);
userRouter
    .route("/:id")
    .get(user_controller_1.UserController.getUserById)
    .put(user_controller_1.UserController.updateUser)
    .delete(user_controller_1.UserController.deleteUser);
exports.default = userRouter;
