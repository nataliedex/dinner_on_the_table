"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("../openai");
const mainController = {
    getIndex: async (req, res) => {
        try {
            res.render("index.ejs", { result: null });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error loading the index.ejs");
        }
    },
    postDinner: async (req, res) => {
        const { ingredients, style } = req.body;
        try {
            const result = await (0, openai_1.getDinnerIdea)(ingredients, style);
            res.render("index.ejs", { result });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");
        }
    },
};
exports.default = mainController;
