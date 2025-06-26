import express from "express";
const router = express.Router();
import mainController from "../controllers/mainController.js";

router.get("/", mainController.getIndex);
router.post("/dinner", mainController.postDinner);

export default router;