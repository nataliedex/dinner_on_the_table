import express from "express";
import path from "path";
import dotenv from "dotenv";
import { getDinnerIdea } from "./openai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.post("/dinner", async (req, res) => {
    const { ingredients, style } = req.body;
    try {
      const result = await getDinnerIdea(ingredients, style);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong." });
    }
  });

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on Port; ${process.env.PORT || 8000}`);
});

