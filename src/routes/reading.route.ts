import { Router } from "express";
import {
  getReadings,
  stopReading,
  updateReading,
  getReadingProgress,
  upsertReadingGoal,
} from "../controllers/reading.controller";

import checkReading from "../middlewares/reading/checkReading";
import checkToken from "../middlewares/user/checkToken";

const router = Router();

router.get("/", checkToken, getReadings);
router.get("/:bookId", checkToken, getReadingProgress);
router.post("/stop/:id", checkToken, checkReading, stopReading);
router.patch("/track/:id", checkToken, checkReading, updateReading);
router.patch("/:bookId", checkToken, upsertReadingGoal);

export default router;
