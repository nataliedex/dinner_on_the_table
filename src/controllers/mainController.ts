import {  Request, Response } from "express";
import { getDinnerIdea } from "../openai";

const mainController = {
    getIndex: async(req: Request, res: Response) => {
        try {
            res.render("index.ejs", { recipe: null });
        } catch(err) {
            console.error(err);
            res.status(500).send("Error loading the index.ejs");
        }
    },

    postDinner: async(req: Request, res: Response) => {
        const { ingredients, style, duration } = req.body;
        try {
            const rawResponse = await getDinnerIdea(ingredients, style, duration);

            if(duration === "week"){
                const days = (rawResponse ?? "").split(/Day \d:/).slice(1);
                const dinners = days.map((dayText, i) => ({
                    title: `Day ${i + 1}`,
                    content: dayText.trim(),
                }));

                res.render("weeklyDinner.ejs", { dinners });
            } else {
                const [recipePart, convoPart] = (rawResponse ?? "").split("Conversation Starter:");
                const cleanedRecipe = recipePart.replace("Recipe:", "").trim();
                const cleanedConversation = convoPart?.trim() ?? "No conversation starter found.";

                res.render("dinner.ejs", {
                    recipe: cleanedRecipe,
                    conversationStarter: cleanedConversation,
                }); 
            }

        } catch(err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");   
        }
    },
};

export default mainController;