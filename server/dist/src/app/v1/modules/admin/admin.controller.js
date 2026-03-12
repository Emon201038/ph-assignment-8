"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const admin_service_1 = require("./admin.service");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = await admin_service_1.AdminService.createUser(req);
    (0, sendResponse_1.sendResponse)(res, {
        message: req.body.rol + " created successfully",
        statusCode: 201,
        success: true,
        data: user,
    });
});
const deleteUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = await admin_service_1.AdminService.deleteUser(req);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User deleted successfully",
        statusCode: 200,
        success: true,
        data: user,
    });
});
exports.AdminController = { createUser, deleteUser };
