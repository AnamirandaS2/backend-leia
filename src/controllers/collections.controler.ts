import { Request, Response } from 'express';
import createCollectionService from '../services/collection/createCollection.service';
import getAllCollectionsService from '../services/collection/getAllCollections.service';
import getCollectionService from '../services/collection/getCollection.service';
import addBookToCollectionService from '../services/collection/addBook.service';
import deleteCollectionService from '../services/collection/deleteCollection.service';
import deleteBookService from '../services/collection/deleteBook.service';

export async function createCollection(req: Request, res: Response) {
  const { id } = req.user;

  const response = await createCollectionService(id!, req.body.name);

  res.status(201).json(response);
}

export async function getAllCollections(req: Request, res: Response) {
  const { id } = req.user;

  const response = await getAllCollectionsService(id!);

  res.status(200).json(response);
}

export async function getCollection(req: Request, res: Response) {
  const { id } = req.params;
  
  const collection = await getCollectionService(id);

  res.status(200).json(collection);
}

export async function addBook(req: Request, res: Response) {
  const { id } = req.params;
  const { bookId } = req.body;

  await addBookToCollectionService(id, bookId);

  res.sendStatus(204);
}

export async function deleteCollection(req: Request, res: Response) {
  const { id } = req.params;

  await deleteCollectionService(id);

  res.sendStatus(204);
}

export async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;
  const { bookId } = req.body;

  await deleteBookService(id, bookId);

  res.sendStatus(204);
}