import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import mainRoutes from "./route/mainRoutes"

dotenv.config();

const app = express();

connectDB();

// Using EJS for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static Folder
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", mainRoutes);


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on Port; ${process.env.PORT || 8000}`);
});

