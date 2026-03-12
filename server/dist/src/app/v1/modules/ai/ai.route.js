"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const aiRoutes = express_1.default.Router();
aiRoutes.post("/get-tour-suggestion", ai_controller_1.AiController.tripPlanner);
exports.default = aiRoutes;
