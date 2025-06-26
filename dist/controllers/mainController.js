"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("../openai");
const mainController = {
    getIndex: async (req, res) => {
        try {
            res.render("index.ejs", { recipe: null });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error loading the index.ejs");
        }
    },
    postDinner: async (req, res) => {
        const { ingredients, style } = req.body;
        try {
            const rawResponse = await (0, openai_1.getDinnerIdea)(ingredients, style);
            const [recipePart, convoPart] = (rawResponse ?? "").split("Conversation Starter:");
            const cleanedRecipe = recipePart.replace("Recipe:", "").trim();
            const cleanedConverstaion = convoPart?.trim();
            res.render("index.ejs", {
                recipe: cleanedRecipe,
                conversationStarter: cleanedConverstaion,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");
        }
    },
};
exports.default = mainController;
