"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("../openai");
const Meals_1 = __importDefault(require("../models/Meals"));
const mainController = {
    getIndex: async (req, res) => {
        try {
            const meals = await Meals_1.default.find({ "rating": "true" });
            res.render("index.ejs", { meals });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error loading the index.ejs");
        }
    },
    postDinner: async (req, res) => {
        const { ingredients, style, duration } = req.body;
        try {
            const rawResponse = await (0, openai_1.getDinnerIdea)(ingredients, style, duration);
            if (duration === "week") {
                const days = (rawResponse ?? "").split(/Day \d:/).slice(1);
                const dinners = days.map((dayText, i) => ({
                    title: `Day ${i + 1}`,
                    content: dayText.trim(),
                }));
                await Meals_1.default.insertMany(dinners.map(d => ({ recipe: d.content })));
                res.render("weeklyDinner.ejs", { dinners });
            }
            else {
                const [recipePart, convoPart] = (rawResponse ?? "").split("Conversation Starter:");
                const cleanedRecipe = recipePart.replace("Recipe:", "").trim();
                const cleanedConversation = convoPart?.trim() ?? "No conversation starter found.";
                const savedMeal = await Meals_1.default.create({
                    recipe: cleanedRecipe,
                });
                res.render("dinner.ejs", {
                    recipe: cleanedRecipe,
                    conversationStarter: cleanedConversation,
                    mealId: savedMeal._id.toString(),
                });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");
        }
    },
    postRate: async (req, res) => {
        const { mealId, thumbsUp } = req.body;
        try {
            await Meals_1.default.findByIdAndUpdate(mealId, {
                rating: thumbsUp === "true",
            });
            res.redirect("/");
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error rating meal");
        }
    },
};
exports.default = mainController;
