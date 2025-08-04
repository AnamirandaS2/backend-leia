import { Router } from "express";
import {
  createTurmaController,
  getTurmasController,
  addStudentToTurmaController,
  updateTurmaController,
  removeStudentFromTurmaController,
} from "../controllers/turma.controller";
import checkToken from "../middlewares/user/checkToken";
import checkPermission from "../middlewares/user/checkPermission";

const router = Router();

const checkIsProfessorOrAdmin = checkPermission(["PROFESSOR", "ADMIN"]);

// Rotas para turmas
router.post("/", checkToken, checkIsProfessorOrAdmin, createTurmaController);
router.get("/", checkToken, checkIsProfessorOrAdmin, getTurmasController);
router.put(
  "/:turmaId",
  checkToken,
  checkIsProfessorOrAdmin,
  updateTurmaController
);
router.post(
  "/:turmaId/students",
  checkToken,
  checkIsProfessorOrAdmin,
  addStudentToTurmaController
);
router.delete(
  "/:turmaId/students/:studentId",
  checkToken,
  checkIsProfessorOrAdmin,
  removeStudentFromTurmaController
);

export default router;
