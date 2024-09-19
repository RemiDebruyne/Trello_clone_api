import express, { application } from "express";
import * as cardController from "../controllers/cardController.js";
const router = express.Router();

router.post("/create", cardController.addCard);
router.put("/update/:id", cardController.updateCard);
router.delete("/delete/:id", cardController.deleteCard);

export { router as cardRouter };
