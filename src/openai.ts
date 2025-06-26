import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getDinnerIdea(ingredients: string, style: string) {
    const userPrompt = `I have: ${ingredients}.  I want a ${style} dinner.  Suggest a recipe with instructions and a fun dinner table conversation starter`;

    const response = await openai.createChatCompletion({
        model: "gpt-40",
        message: [
            { role: "system", content: "You are a helpful, fun, and creative meal planner." },
            { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
    });

    return response.data.choices[0].message?.content;
}