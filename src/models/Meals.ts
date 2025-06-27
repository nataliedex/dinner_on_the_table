import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    recipeTitle: {
        type: String, 
        required: true,
    },
    recipeSource: {
        type: String, 
        required: true,
    },
    recipeIngredients: {
        type: String, 
        required: true,
    },
    recipeInstructions: {
        type: String, 
        required: true,
    },
    rating: {
        type: Boolean,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Meal = mongoose.model("Meal", MealSchema);
export default Meal;