"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDinnerIdea = getDinnerIdea;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
async function getDinnerIdea(ingredients, style, duration) {
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
    Recipe Title: ...
    Source: ...
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

    Recipe Title: ...
    Source: ...
    Ingredients: ...
    Instructions: ...
    Conversation Starter: ...
    

    Pull the 70% recipes from popular websites like pinchofyum.com, gordonramsay.com, jamieoliver.com, rachaelray.com, barefootcontessa.com, seriouseats.com, smittenkitchen.com, food52.com, thedefineddish.com, halfbakedharvest.com, thekitchn.com, rachlmansfield.com, cooking.nytimes.com and create the other 30% of the recipes with simple to follow instructions.

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
