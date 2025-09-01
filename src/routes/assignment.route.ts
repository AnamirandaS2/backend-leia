import { Router } from "express";
import checkToken from "../middlewares/user/checkToken";
import { createCommentController } from "../controllers/assignment.controller";

const assignmentRouter = Router();

assignmentRouter.post(
  "/:assignmentId/comments",
  checkToken,
  createCommentController
);

export default assignmentRouter;





