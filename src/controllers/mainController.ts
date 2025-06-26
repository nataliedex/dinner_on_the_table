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
        const { ingredients, style } = req.body;
        try {
            const rawResponse = await getDinnerIdea(ingredients, style);
            const [recipePart, convoPart] = (rawResponse ?? "").split("Conversation Starter:");

            const cleanedRecipe = recipePart.replace("Recipe:", "").trim();
            const cleanedConverstaion = convoPart?.trim();


            res.render("index.ejs", { 
                recipe: cleanedRecipe,
                conversationStarter: cleanedConverstaion,
             });
        } catch(err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");   
        }
    },
};

export default mainController;