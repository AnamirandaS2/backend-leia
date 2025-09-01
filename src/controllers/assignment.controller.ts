import { Request, Response } from "express";

import fetchAssignmentService from "../services/assignment/fetchAssignment.service";
import hasLikedAssignmentService from "../services/assignment/hasLikedAssignment.service";
import likeAssignmentService from "../services/assignment/likeAssignment.service";
import fetchAllAssignmentsService from "../services/assignment/fetchAllAssignments.service";
import addCommentService from "../services/assignment/addComment.service";
import fetchCommentsService from "../services/assignment/fetchComments.service";
import deleteCommentService from "../services/assignment/deleteComment.service";
import createAssignmentService from "../services/assignment/createAssignment.service";
import deleteAssignmentService from "../services/post/deleteAssignment.service";
import createCommentService from "../services/assignment/createComment.service";

export async function createAssignment(req: Request, res: Response) {
  const { content } = req.body;
  const { id } = req.user;

  await createAssignmentService(content, id!);

  res.sendStatus(201);
}

export async function fetchAssignment(req: Request, res: Response) {
  const { id } = req.params;

  const assignment = await fetchAssignmentService(id);

  res.status(200).json(assignment);
}

export async function fetchAllAssignments(req: Request, res: Response) {
  const assignments = await fetchAllAssignmentsService();

  res.status(200).json(assignments);
}

export async function fetchComments(req: Request, res: Response) {
  const { id } = req.params;

  const comments = await fetchCommentsService(id);

  res.status(200).json(comments);
}

export async function likeAssignment(req: Request, res: Response) {
  const { id } = req.params;
  const { id: userId } = req.user;

  const hasLiked = await hasLikedAssignmentService(id, userId!);

  const response = await likeAssignmentService(id, userId!, !hasLiked);

  res.status(200).json(response);
}

export async function deleteAssignment(req: Request, res: Response) {
  const { id } = req.params;

  await deleteAssignmentService(id);

  res.sendStatus(204);
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

export async function createCommentController(req: Request, res: Response) {
  const { assignmentId } = req.params;
  const { content } = req.body;
  const { id: userId } = req.user as { id: string };

  try {
    const comment = await createCommentService({
      userId,
      assignmentId,
      content,
    });
    return res.status(201).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
}
