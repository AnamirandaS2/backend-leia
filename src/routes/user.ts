import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/", UserController.CreateUser)
router.put("/", UserController.UpdateUser)

export default router;