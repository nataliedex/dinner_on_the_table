"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mainController_1 = __importDefault(require("../controllers/mainController"));
router.get("/", mainController_1.default.getIndex);
router.post("/dinner", mainController_1.default.postDinner);
router.post("/rate", mainController_1.default.postRate);
router.get("/recipe/:id", mainController_1.default.getRecipe);
exports.default = router;
