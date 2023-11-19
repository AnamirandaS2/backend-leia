import { Router } from "express";
import AuthController from '../controllers/AuthController';

const router = Router();

router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)
router.put("/forgot", AuthController.forgot)

export default router;