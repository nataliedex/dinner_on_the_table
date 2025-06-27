import {  Request, Response, raw } from "express";
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
                const dinners = days.map((dayText, i) => {
                    const recipeTitle = dayText.match(/Recipe Title:\s*(.+)/)?.[1]?.trim() ?? `Day ${i + 1}`;
                    const recipeSource = dayText.match(/Source:\s*(.+)/)?.[1]?.trim() ?? "Unknown";
                    const recipeIngredients = dayText.match(/Ingredients:\s*([\s\S]*?)Instructions:/)?.[1]?.trim() ?? "Not provided";
                    const recipeInstructions = dayText.match(/Instructions:\s*([\s\S]*?)Conversation Starter:/)?.[1]?.trim() ?? "Not provided";
                    const conversationStarter = dayText.match(/Conversation Starter:\s*([\s\S]*)/)?.[1]?.trim() ?? "Enjoy your meal!";
                  
                    return {
                      recipeTitle,
                      recipeSource,
                      recipeIngredients,
                      recipeInstructions,
                      conversationStarter,
                    };
                  });

                const insertedDinners = await Meal.insertMany(
                    dinners.map(d => ({
                      recipeTitle: d.recipeTitle,
                      recipeSource: d.recipeSource,
                      recipeIngredients: d.recipeIngredients,
                      recipeInstructions: d.recipeInstructions,
                    }))
                );
                  
                  res.render("weeklyDinner.ejs", { dinners: insertedDinners });
                
                return;
            }

            const recipeTitle = rawResponse?.match(/Recipe Title:\s*(.+)/)?.[1]?.trim() ?? "Untitled";
            const recipeSource = rawResponse?.match(/Source:\s*(.+)/)?.[1]?.trim() ?? "Unknown";
            const recipeIngredients = rawResponse?.match(/Ingredients:\s*([\s\S]*?)Instructions:/)?.[1]?.trim() ?? "Not provided";
            const recipeInstructions = rawResponse?.match(/Instructions:\s*([\s\S]*?)Conversation Starter:/)?.[1]?.trim() ?? "Not provided";
            const conversationStarter = rawResponse?.match(/Conversation Starter:\s*([\s\S]*)/)?.[1]?.trim() ?? "Enjoy your meal!";


            const savedMeal = await Meal.create({
                recipeTitle,
                recipeSource,
                recipeIngredients,
                recipeInstructions,
            });

            res.render("dinner.ejs", {
                recipeTitle,
                recipeSource,
                recipeIngredients,
                recipeInstructions,
                conversationStarter,
                mealId: savedMeal._id.toString(),
            }); 
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

    getRecipe: async(req: Request, res: Response) => {        
        try {
            const recipe = await Meal.findById(req.params.id);
            if(recipe) {
                const { recipeTitle, recipeSource, recipeIngredients, recipeInstructions, _id } = recipe;

                res.render("recipe.ejs", {
                    recipeTitle,
                    recipeSource,
                    recipeIngredients,
                    recipeInstructions,
                    mealId: _id.toString(),
                 });
            } else {
                res.status(404).send("Recipe not found");
            }
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Error getting the meal")
            
            
        }
    },
};

export default mainController;