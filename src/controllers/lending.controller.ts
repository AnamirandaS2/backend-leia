import { Request, Response } from "express";

import approveLendingExtensionService from "../services/lending/extendLending.service";
import getClosestReturnDateService from "../services/lending/getClosestReturn.service";
import getNonReturnedBooksService from "../services/lending/getNonReturned.service";
import getPendenciesByIdService from "../services/lending/getPendenciesById.service";
import getUserLendingsService from "../services/lending/getUserLendings.service";
import lendBookService from "../services/lending/lendBook.service";
import rejectExtensionService from "../services/lending/rejectExtension.service";
import rejectRequestService from "../services/lending/rejectRequest.service";
import requestExtensionService from "../services/lending/requestExtension.service";
import requestLendingService from "../services/lending/requestLending.service";
import returnBookService from "../services/lending/returnBook.service";

export async function requestLending(req: Request, res: Response) {
  const { id: userId } = req.user;
  const { bookId, lendingDuration } = req.body;

  try {
    const request = await requestLendingService({
      userId,
      bookId,
      lendingDuration,
    });
    return res.status(201).json(request);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

export async function approveRequest(req: Request, res: Response) {
  const { requestId } = req.params;

  const { id } = await lendBookService(requestId);

  return res.status(200).json({
    message: "Pedido aprovado com sucesso",
    data: { id },
  });
}

export async function rejectRequest(req: Request, res: Response) {
  const { requestId } = req.params;

  await rejectRequestService(requestId);

  return res.status(200).json({
    message: "Pedido rejeitado com sucesso",
  });
}

export async function requestExtension(req: Request, res: Response) {
  const { lendingId, extraTime } = req.body;

  const { id } = await requestExtensionService({ lendingId, extraTime });

  return res.status(200).json({
    message: "Pedido de extensão realizado com sucesso",
    data: { id },
  });
}

export async function approveExtensionRequest(req: Request, res: Response) {
  const { requestId } = req.params;

  await approveLendingExtensionService(requestId);

  return res.status(200).json({
    message: "Pedido de extensão realizado com sucesso",
  });
}

export async function rejectExtensionRequest(req: Request, res: Response) {
  const { requestId } = req.params;

  await rejectExtensionService(requestId);

  return res.status(200).json({
    message: "Pedido de extensão rejeitado com sucesso",
  });
}

export async function returnBook(req: Request, res: Response) {
  const { lendingId } = req.params;

  await returnBookService(lendingId);

  return res.status(200).json({
    message: "Livro devolvido com sucesso",
  });
}

export async function getPendenciesById(req: Request, res: Response) {
  const { id } = req.user;

  const pendencies = await getPendenciesByIdService(id!);

  return res.status(200).json(pendencies);
}

export async function getPendencies(req: Request, res: Response) {
  const pendencies = await getNonReturnedBooksService();

  return res.status(200).json(pendencies);
}

export async function getClosestReturnDate(req: Request, res: Response) {
  const { id } = req.user;

  const closest = await getClosestReturnDateService(id!);

  return res.status(200).json(closest);
}

export async function getUserLendings(req: Request, res: Response) {
  const { id: userId } = req.user;

  try {
    const lendings = await getUserLendingsService(userId!);
    return res.status(200).json(lendings);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
