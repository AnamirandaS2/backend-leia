import { Router } from "express";

import { checkBook } from "../middlewares/lending/checkBook";
import { checkLendingExists } from "../middlewares/lending/checkLendingExists";
import { checkLendingFromUser } from "../middlewares/lending/checkLendingFromUser";
import checkRequest from "../middlewares/lending/checkRequest";
import checkToken from "../middlewares/user/checkToken";
import checkPermission from "../middlewares/user/checkPermission";
import { lendBookSchema, requestLendingSchema } from "../schemas/borrow.schema";
import verifyShape from "../utils/verifyShape";
import {
  approveExtensionRequest,
  approveRequest,
  getClosestReturnDate,
  getPendencies,
  getPendenciesById,
  getUserLendings,
  rejectExtensionRequest,
  rejectRequest,
  requestExtension,
  requestLending,
  returnBook,
} from "../controllers/lending.controller";

const router = Router();

router.post(
  "/request",
  checkToken,
  verifyShape(requestLendingSchema),
  requestLending
);

router.get("/user", checkToken, getUserLendings);

router.get("/pendencies", checkToken, getPendencies);
router.get(
  "/pendencies/:id",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  getPendenciesById
);

router.post(
  "/",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  verifyShape(lendBookSchema),
  checkRequest,
  approveRequest
);

router.post(
  "/return",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  checkLendingExists,
  returnBook
);

router.get("/closest", checkToken, getClosestReturnDate);

router.patch(
  "/request/reject/:id",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  checkRequest,
  rejectRequest
);

router.post("/extend/:id", checkToken, checkLendingFromUser, requestExtension);

router.patch(
  "/extend/reject/:id",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  checkRequest,
  rejectExtensionRequest
);

router.patch(
  "/extend/:id/approve",
  checkToken,
  checkPermission(["ADMIN", "PROFESSOR"]),
  checkRequest,
  approveExtensionRequest
);

export default router;
