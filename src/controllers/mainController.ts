import {  Request, Response } from "express";
import { getDinnerIdea } from "../openai";
import Meal from "../models/Meals";

const mainController = {
    getIndex: async(req: Request, res: Response) => {
        try {
            const meals = await Meal.find({"rating": "true"});
            res.render("index.ejs", { meals });
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

                await Meal.insertMany(dinners.map(d => ({ recipe: d.content })));

                res.render("weeklyDinner.ejs", { dinners });
            } else {
                const [recipePart, convoPart] = (rawResponse ?? "").split("Conversation Starter:");
                const cleanedRecipe = recipePart.replace("Recipe:", "").trim();
                const cleanedConversation = convoPart?.trim() ?? "No conversation starter found.";

                const savedMeal = await Meal.create({
                    recipe: cleanedRecipe,
                  });

                res.render("dinner.ejs", {
                    recipe: cleanedRecipe,
                    conversationStarter: cleanedConversation,
                    mealId: savedMeal._id.toString(),
                }); 
            }

        } catch(err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");   
        }
    },

    postRate: async(req: Request, res: Response) => {
        const { mealId, thumbsUp } = req.body;
        
        try {
            await Meal.findByIdAndUpdate(mealId, {
                rating: thumbsUp === "true",
            });
            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error rating meal");              
        }
    },
};

export default mainController;