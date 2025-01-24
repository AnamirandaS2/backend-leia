import { Request, Response } from 'express';

import fetchTotalPagesService from '../services/book/fetchTotalPages.service';
import createPostService from '../services/post/createPost.service';
import fetchPostService from '../services/post/fetchPost.service';
import hasLikedPostService from '../services/post/hasLikedPost.service';
import likePostService from '../services/post/likePost.service';
import fetchPostsByUser from '../services/post/fetchPostsByUser';
import addCommentService from '../services/post/addComment.service';
import fetchCommentsService from '../services/post/fetchComments.service';
import deleteCommentService from '../services/post/deleteComment.service';
import deletePostService from '../services/post/deletePost.service';

export async function createPost(req: Request, res: Response) {
  const { content, bookId, rating } = req.body;
  const { page } = req.readingTracking;
  const { id } = req.user;

  const pages = await fetchTotalPagesService(bookId);
  await createPostService({
    userId: id!,
    content,
    bookId,
    rating,
    readingProgress: page / pages!,
  });
  
  res.sendStatus(201);
}

export async function fetchPost(req: Request, res: Response) {
  const { id } = req.params;

  const post = await fetchPostService(id);

  res.status(200).json(post);
}

export async function fetchComments(req: Request, res: Response) {
  const { id } = req.params;

  const comments = await fetchCommentsService(id);

  res.status(200).json(comments);
}

export async function likePost(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = req.user;

  const hasLiked = await hasLikedPostService(id, userId!);

  const response = await likePostService(id, userId!, !hasLiked);
  
  res.status(200).json(response);
}

export async function fetchPostByUser(req: Request, res: Response) {
  const { id } = req.user;

  const posts = await fetchPostsByUser(id!);

  res.status(200).json(posts);
}

export async function addComment(req: Request, res: Response) {
  const { id } = req.params;
  const { content } = req.body;
  const { id: userId } = req.user;

  const response = await addCommentService(id, userId!, content);

  res.status(201).json(response);
}

export async function deleteComment(req: Request, res: Response) {
  const { id } = req.params;

  await deleteCommentService(id);

  res.sendStatus(204);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  await deletePostService(id);

  res.sendStatus(204);
}