import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    recipe: {
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