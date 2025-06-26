import {  Request, Response } from "express";
import { getDinnerIdea } from "../openai.js";

const mainController = {
    getIndex: async(req: Request, res: Response) => {
        try {
            res.render("index", { result: null });
        } catch(err) {
            console.error(err);
            res.status(500).send("Error loading the index.ejs");
        }
    },

    postDinner: async(req: Request, res: Response) => {
        const { ingredients, style } = req.body;
        try {
            const result = await getDinnerIdea(ingredients, style);
            res.render("index", { result });
        } catch(err) {
            console.error(err);
            res.status(500).send("Error posting the dinner");   
        }
    },
};

export default mainController;