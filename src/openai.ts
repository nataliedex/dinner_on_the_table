import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function getDinnerIdea(ingredients: string, style: string, duration: string) {
    const userPrompt = `
    I have: ${ingredients}.  
    I want a ${style} dinner.
    I want dinner for ${duration} days. 

    If the ${duration} is a week, please provide a 7-day dinner plan. For each day, include: 

    - a recipe title with the source
    - the ingredients
    - the instructions
    - a dinner time conversation starter

    Format it like this: 

    Day 1: 
    Recipe: ...
    Ingredients: ...
    Instructions: ...
    Conversation Starter: ...

    Day 2: 
    ...
    (Continue through Day 7)

    If the ${duration} is one, please provide a 1-day dinner plan, include: 
    - a recipe title with the source
    - the ingredients
    - the instructions
    - a dinner time conversation starter

    Format it like this: 

    Recipe: ...
    Ingredients: ...
    Instructions: ...
    Conversation Starter: ...
    

    Pull the 70% recipes from popular websites like pinchofyum.com, thedefineddish.com, halfbakedharvest.com, thekitchn.com, rachlmansfield.com, cooking.nytimes.com and create the other 30% of the recipes with simple to follow instructions.

    if the ${ingredients} is blank, give a recipe based off of the ${style} only.

    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a helpful, fun, efficient, and creative meal planner." },
            { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
    });

    return response.choices[0].message?.content;
}