"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../helpers/appError"));
const httpStatus_1 = require("../utils/httpStatus");
const jwt_1 = require("../utils/jwt");
const checkAuth = (...roles) => (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.UNAUTHORIZED, "You are not logged in.");
    }
    const decoded = (0, jwt_1.verifyJwt)(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (!decoded) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.UNAUTHORIZED, "You are not logged in.");
    }
    if (!roles.includes(decoded.role)) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.UNAUTHORIZED, "You are not authorized to access this route.");
    }
    req.user = decoded;
    next();
});
exports.checkAuth = checkAuth;
