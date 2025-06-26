import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function getDinnerIdea(ingredients: string, style: string) {
    const userPrompt = `
    I have: ${ingredients}.  
    I want a ${style} dinner. 
    
    Please provide your answer in tow part: 
    1) Recipe with instructions
    2) Dinner table conversation starter

    Separate these two part clearly, for example with labels "Recipe:" and "Conversation Starters:".
    `;

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