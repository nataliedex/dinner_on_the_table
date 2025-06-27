"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MealSchema = new mongoose_1.default.Schema({
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
const Meal = mongoose_1.default.model("Meal", MealSchema);
exports.default = Meal;
