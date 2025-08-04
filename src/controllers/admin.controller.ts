import { Request, Response } from "express";
import fetchAllUsersService from "../services/admin/fetchAllUsers.service";
import fetchApprovedUsersService from "../services/admin/fetchApprovedUsers.service";
import fetchNonApprovedUsersService from "../services/admin/fetchNonApprovedUsers.service";
import fetchRejectedUsersService from "../services/admin/fetchRejectedUsers.service";
import approveUserService from "../services/admin/approveUserService";
import approveUserAndAddToTurmaService from "../services/admin/approveUserAndAddToTurma.service";
import rejectUserService from "../services/admin/rejectUserService";
import fetchUserByIdService from "../services/admin/fetchUserById.service";
import getAdminEmailsService from "../services/admin/getAdminEmails.service";
import approveReviewService from "../services/admin/approveReview.service";

export async function fetchAllUsers(req: Request, res: Response) {
  try {
    const users = await fetchAllUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function fetchApprovedUsers(req: Request, res: Response) {
  try {
    const users = await fetchApprovedUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function fetchNonApprovedUsers(req: Request, res: Response) {
  try {
    const users = await fetchNonApprovedUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function fetchRejectedUsers(req: Request, res: Response) {
  try {
    const users = await fetchRejectedUsersService();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function approveUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await approveUserService(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function approveUserAndAddToTurma(req: Request, res: Response) {
  try {
    const { userId, turmaId } = req.body;
    const result = await approveUserAndAddToTurmaService({ userId, turmaId });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function rejectUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await rejectUserService(id);
    return res.status(200).json({ message: "Usuário rejeitado com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function fetchUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await fetchUserByIdService(id);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function getAdminEmails(req: Request, res: Response) {
  try {
    const emails = await getAdminEmailsService();
    return res.status(200).json(emails);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function approveReview(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const review = await approveReviewService(id);
    return res.status(200).json(review);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
