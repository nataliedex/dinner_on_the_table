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
async function getDinnerIdea(ingredients, style) {
    const userPrompt = `
    I have: ${ingredients}.  
    I want a ${style} dinner. 
    
    Please provide your answer in two parts: 
    1) Recipe with instructions
    2) Dinner table conversation starter

    Separate these two part clearly, for example with labels "Recipe:" and "Conversation Starters:".
    
    User exactly these headings:

    Recipe: 
    [...]
    Conversation Starter:
    [...]

    if the ${ingredients} is blank, give a recipe based off of the ${style} only.
    
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
