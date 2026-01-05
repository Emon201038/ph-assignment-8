"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const appError_1 = __importDefault(require("../../helpers/appError"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const getUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, meta } = yield user_service_1.UserService.getAllUsers(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "users retrieved successfully",
        data: users,
        meta,
    });
}));
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "user created successfully",
        data,
    });
}));
const getUserById = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    if (!isValidId)
        throw new appError_1.default(400, "Invalid user id.");
    const data = yield user_service_1.UserService.getUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "user retrieved successfully",
        data,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "user updated successfully",
        // Todo : update user
        data: user_service_1.UserService.updateUser(req.params.id, req.body, user),
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "user deleted successfully",
        data: {},
    });
}));
exports.UserController = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
