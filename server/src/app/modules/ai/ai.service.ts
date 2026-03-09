import { geminiAI, groq } from "../../config/ai";

async function groqTrip(prompt: string) {
  const completion = await groq.chat.completions.create({
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

async function geminiTrip(prompt: string) {
  const result = await geminiAI.generateContent(prompt);

  return result.response.text();
}

export async function generateTrip(prompt: string) {
  try {
    console.log("Trying Gemini...");
    const result = await geminiTrip(prompt);
    return { provider: "gemini", result };
  } catch (error) {
    console.error("Gemini failed:", error);
  }

  try {
    console.log("Trying Groq...");
    const result = await groqTrip(prompt);
    return { provider: "groq", result };
  } catch (error) {
    console.error("Groq failed:", error);
  }

  throw new Error("All AI providers failed");
}
