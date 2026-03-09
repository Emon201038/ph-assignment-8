import OpenAI from "openai";
import { envVars } from "./env";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const openai = new OpenAI({
  apiKey: envVars.OPENAI_API_KEY!,
});

export const groq = new OpenAI({
  apiKey: envVars.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const genAI = new GoogleGenerativeAI(envVars.GEMINI_API_KEY);

export const geminiAI = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
