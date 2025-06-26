import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

export async function getDinnerIdea(ingredients: string, style: string) {
    const userPrompt = `I have: ${ingredients}.  I want a ${style} dinner.  Suggest a recipe with instructions and a fun dinner table conversation starter`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a helpful, fun, and creative meal planner." },
            { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
    });

    return response.choices[0].message?.content;
}