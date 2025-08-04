import { Router } from "express";
import checkPermission from "../middlewares/user/checkPermission";
import checkToken from "../middlewares/user/checkToken";
import {
  fetchAllUsers,
  fetchApprovedUsers,
  fetchNonApprovedUsers,
  fetchRejectedUsers,
  approveUser,
  approveUserAndAddToTurma,
  rejectUser,
  fetchUser,
  getAdminEmails,
  approveReview,
} from "../controllers/admin.controller";

const admin = Router();

const checkIsProfessorOrAdmin = checkPermission(["PROFESSOR", "ADMIN"]);

// Rotas para gerenciamento de usuários
admin.get("/users", checkToken, checkIsProfessorOrAdmin, fetchAllUsers);
admin.get(
  "/users/approved",
  checkToken,
  checkIsProfessorOrAdmin,
  fetchApprovedUsers
);
admin.get(
  "/users/pending",
  checkToken,
  checkIsProfessorOrAdmin,
  fetchNonApprovedUsers
);
admin.get(
  "/users/rejected",
  checkToken,
  checkIsProfessorOrAdmin,
  fetchRejectedUsers
);

admin.post(
  "/approve-user/:id",
  checkToken,
  checkIsProfessorOrAdmin,
  approveUser
);

admin.post(
  "/approve-user-and-add-to-turma",
  checkToken,
  checkIsProfessorOrAdmin,
  approveUserAndAddToTurma
);

admin.post("/reject-user/:id", checkToken, checkIsProfessorOrAdmin, rejectUser);

admin.get("/user/:id", checkToken, checkIsProfessorOrAdmin, fetchUser);
admin.get("/admin-emails", checkToken, checkIsProfessorOrAdmin, getAdminEmails);

// Rotas para gerenciamento de reviews
admin.post(
  "/approve-review/:id",
  checkToken,
  checkIsProfessorOrAdmin,
  approveReview
);

export default admin;
