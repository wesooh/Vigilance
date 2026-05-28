import express from "express";
import { getWorkers, searchWorkers } from "../controllers/workerController.js";
import { getNearbyWorkers } from "../controllers/workerController.js";

const router = express.Router();

router.get("/", getWorkers);
router.get("/search", searchWorkers);
router.get("/nearby", getNearbyWorkers);
export default router;