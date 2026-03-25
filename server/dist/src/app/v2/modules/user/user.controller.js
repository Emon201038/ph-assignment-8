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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const pick_1 = require("../../../helpers/pick");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.pick)(req.query, paginationHelper_1.paginationHelper.paginationFields);
    const filters = (0, pick_1.pick)(req.query, [
        "searchTerm",
        "role",
        "country",
        "city",
        "topGuides",
    ]);
    const data = yield user_service_1.UserService.getAllUserFromDB(options, filters);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Users fetched successfully",
        statusCode: 200,
        success: true,
        meta: data.meta,
        data: data.data,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.sendResponse)(res, {
        message: "User fetched successfully",
        statusCode: 200,
        success: true,
        data: yield user_service_1.UserService.getSingleUserFromDB(req.params.id),
    });
}));
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.createUserInDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User created successfully",
        statusCode: 201,
        success: true,
        data,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.updateUserInDB(req.params.id, req.body, req.files);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User updated successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const hardDeleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.hardDeleteUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User deleted successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const softDeleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.softDeleteUser(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User deleted successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const addEmergencyContact = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.addEmergencyContact(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Emergency contact added successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const removeEmergencyContact = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.deleteEmergencyContact(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Emergency contact removed successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const getEmergencyContact = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.getEmergencyContact(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Emergency contact fetched successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
const updateEmergencyContact = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.updateEmergencyContact(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Emergency contact updated successfully",
        statusCode: 200,
        success: true,
        data,
    });
}));
exports.UserController = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    hardDeleteUser,
    softDeleteUser,
    addEmergencyContact,
    removeEmergencyContact,
    getEmergencyContact,
    updateEmergencyContact,
};
