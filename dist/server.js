"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainRoutes_1 = __importDefault(require("./route/mainRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Using EJS for views
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Static Folder
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", mainRoutes_1.default);
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is currently running on Port; ${process.env.PORT || 8000}`);
});
