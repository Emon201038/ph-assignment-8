"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrip = generateTrip;
const ai_1 = require("../../../config/ai");
async function groqTrip(prompt) {
    const completion = await ai_1.groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return completion.choices[0].message.content;
}
async function geminiTrip(prompt) {
    const result = await ai_1.geminiAI.generateContent(prompt);
    return result.response.text();
}
async function generateTrip(prompt) {
    try {
        console.log("Trying Gemini...");
        const result = await geminiTrip(prompt);
        return { provider: "gemini", result };
    }
    catch (error) {
        console.error("Gemini failed:", error);
    }
    try {
        console.log("Trying Groq...");
        const result = await groqTrip(prompt);
        return { provider: "groq", result };
    }
    catch (error) {
        console.error("Groq failed:", error);
    }
    throw new Error("All AI providers failed");
}
