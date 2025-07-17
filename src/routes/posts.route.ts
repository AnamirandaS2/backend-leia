import { Router } from "express";

import {
  createPost,
  deletePost,
  getPosts,
  getPostsByBook,
  getPostsByUser,
} from "../controllers/posts.controller";

import checkToken from "../middlewares/user/checkToken";
import checkPostIsFromUser from "../middlewares/post/checkPostIsFromUser";

const router = Router();

router.get("/", getPosts);
router.post("/", checkToken, createPost);
router.get("/book/:bookId", getPostsByBook);
router.get("/user/:userId", getPostsByUser);
router.delete("/:id", checkToken, checkPostIsFromUser, deletePost);

export default router;
