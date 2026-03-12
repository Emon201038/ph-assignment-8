"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const appError_1 = __importDefault(require("../helpers/appError"));
const validateRequest = (zodSchema) => async (req, res, next) => {
    try {
        for (const key in req.body) {
            if (req.body[key] === "true") {
                req.body[key] = true;
            }
            if (req.body[key] === "false") {
                req.body[key] = false;
            }
        }
        if (!req.body)
            throw new appError_1.default(400, "Request body is empty.");
        if (req.body.body)
            req.body.body = JSON.parse(req.body.body);
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateRequest = validateRequest;
