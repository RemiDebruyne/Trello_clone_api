import express, { application } from "express";
import * as listController from "../controllers/listController.js";
const router = express.Router();

router.post("/create", listController.addList);
router.put("/update/:id", listController.updateList);
router.delete("/delete/:id", listController.deleteList);

export { router as listRouter };
