"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const admin_controller_1 = require("./admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.post("/create-user", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), admin_controller_1.AdminController.createUser);
// hard delete
adminRouter.delete("/delete-user/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), admin_controller_1.AdminController.deleteUser);
exports.default = adminRouter;
