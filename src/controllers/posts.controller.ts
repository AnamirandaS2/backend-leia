import { Request, Response } from "express";

import createPostService from "../services/post/createPost.service";
import getPostsByBookService from "../services/post/getPostsByBook.service";
import getPostsByUserService from "../services/post/getPostsByUser.service";
import deletePostService from "../services/post/deletePost.service";
import getPostsService from "../services/post/getPosts.service";

export async function getPosts(req: Request, res: Response) {
  const posts = await getPostsService();
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
  const { bookId } = req.params;
  const posts = await getPostsByBookService(bookId);
  return res.status(200).json(posts);
}

export async function getPostsByUser(req: Request, res: Response) {
  const { userId } = req.params;
  const { bookId } = req.query as { bookId?: string };

  const posts = await getPostsByUserService(userId, bookId);
  return res.status(200).json(posts);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.post;
  await deletePostService(id);
  return res.status(204).send();
}
