import express from "express";
const router = express.Router();
import mainController from "../controllers/mainController";

router.get("/", mainController.getIndex);
router.post("/dinner", mainController.postDinner);
router.post("/rate", mainController.postRate);

export default router;