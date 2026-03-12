"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const ai_service_1 = require("./ai.service");
const tripPlanner = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { prompt } = req.body;
    if (!prompt) {
        throw new appError_1.default(400, "Prompt is required");
    }
    const trip = await (0, ai_service_1.generateTrip)(prompt);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Trip fetched successfully",
        statusCode: 200,
        success: true,
        data: {
            ...trip,
        },
    });
});
exports.AiController = { tripPlanner };
