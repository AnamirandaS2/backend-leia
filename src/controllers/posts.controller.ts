import { Request, Response } from "express";

import createPostService from "../services/post/createPost.service";
import getPostsByBookService from "../services/post/getPostsByBook.service";
import getPostsByUserService from "../services/post/getPostsByUser.service";
import deletePostService from "../services/post/deletePost.service";
import getPostsService from "../services/post/getPosts.service";
import likePostService from "../services/post/likePost.service";

export async function getPosts(req: Request, res: Response) {
  const userId = req.user?.id;
  const posts = await getPostsService(userId);
  return res.status(200).json(posts);
}

export async function createPost(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { bookId, content, rating } = req.body;

  const post = await createPostService({
    userId,
    bookId,
    content,
    rating,
  });

  return res.status(201).json(post);
}

export async function getPostsByBook(req: Request, res: Response) {
  const { id: bookId } = req.params;
  const userId = req.user?.id;
  const posts = await getPostsByBookService(bookId, userId);
  return res.status(200).json(posts);
}

export async function getPostsByUser(req: Request, res: Response) {
  const { id } = req.params;
  const { bookId } = req.query as { bookId?: string };
  const requesterId = req.user?.id;

  const posts = await getPostsByUserService(id, bookId, requesterId);
  return res.status(200).json(posts);
}

export async function likePost(req: Request, res: Response) {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { liked } = req.body;

  const response = await likePostService(postId, userId!, liked);

  return res.status(200).json(response);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  await deletePostService(id);
  return res.status(204).send();
}
