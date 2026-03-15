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
exports.UserController = { getAllUsers, getSingleUser, createUser };
