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
exports.generateTrip = generateTrip;
const ai_1 = require("../../../config/ai");
function groqTrip(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield ai_1.groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        return completion.choices[0].message.content;
    });
}
function geminiTrip(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ai_1.geminiAI.generateContent(prompt);
        return result.response.text();
    });
}
function generateTrip(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Trying Gemini...");
            const result = yield geminiTrip(prompt);
            return { provider: "gemini", result };
        }
        catch (error) {
            console.error("Gemini failed:", error);
        }
        try {
            console.log("Trying Groq...");
            const result = yield groqTrip(prompt);
            return { provider: "groq", result };
        }
        catch (error) {
            console.error("Groq failed:", error);
        }
        throw new Error("All AI providers failed");
    });
}
