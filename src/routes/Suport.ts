import { Router } from "express";
import verifyShape from "../utils/verifyShape";
import { suportSchema } from "../schemas/suport.schema";
import { suportController } from "../controllers/SuportController";

const Suport = Router();

Suport.post('', verifyShape(suportSchema), suportController)

export default Suport;