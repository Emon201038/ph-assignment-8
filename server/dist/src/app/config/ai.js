"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiAI = exports.groq = exports.openai = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("./env");
const generative_ai_1 = require("@google/generative-ai");
exports.openai = new openai_1.default({
    apiKey: env_1.envVars.OPENAI_API_KEY,
});
exports.groq = new openai_1.default({
    apiKey: env_1.envVars.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});
const genAI = new generative_ai_1.GoogleGenerativeAI(env_1.envVars.GEMINI_API_KEY);
exports.geminiAI = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});
