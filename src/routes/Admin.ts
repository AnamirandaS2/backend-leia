import { Router } from "express";
import verifyShape from "../utils/verifyShape";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import checkEmailAvailability from "../middlewares/admin/checkEmailAvailability";
import { loginController, registerController } from "../controllers/AdminController";
import checkLogin from "../middlewares/admin/checkLogin";
import checkToken from "../middlewares/admin/checkToken";

const useRouter = Router();

useRouter.post('', verifyShape(registerSchema), checkEmailAvailability, registerController)
useRouter.post('/login', verifyShape(loginSchema), checkLogin, loginController)

useRouter.get('', checkToken)

export default useRouter;