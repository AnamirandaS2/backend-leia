import { Router } from "express";

import {
  createPost,
  deletePost,
  getPosts,
  getPostsByBook,
  getPostsByUser,
  likePost,
} from "../controllers/posts.controller";
import verifyShape from "../utils/verifyShape";

import checkPost from "../middlewares/post/checkPost";
import checkPostIsFromUser from "../middlewares/post/checkPostIsFromUser";
import checkToken from "../middlewares/user/checkToken";
import { likePostSchema } from "../schemas/posts.schema";

const router = Router();

router.get("/", getPosts);
router.post("/", checkToken, createPost);
router.get("/book/:bookId", getPostsByBook);
router.get("/user/:userId", getPostsByUser);
router.post(
  "/:id/like",
  checkToken,
  checkPost,
  verifyShape(likePostSchema),
  likePost
);
router.delete("/:id", checkToken, checkPostIsFromUser, deletePost);

export default router;
