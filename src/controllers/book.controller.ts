import { Request, Response } from "express";

import addBookService from "../services/book/addBook";
import deleteService from "../services/book/delete.service";
import favoriteBookService from "../services/book/favoriteBook.service";
import fetchBooksService from "../services/book/fetchBooks.service";
import fetchFavoritesService from "../services/book/fetchFavorites.service";
import fetchPhysicalBooksService from "../services/book/fetchPhysicalBooks.service";
import unfavoriteBookService from "../services/book/unfavoriteBook.service";
import updateService from "../services/book/updateBook";
import updateReadingsService from "../services/book/updateReadings.service";

export async function getBook(req: Request, res: Response) {
  const book = req.book;
  return res.status(200).json(book);
}

export async function queryBooks(req: Request, res: Response) {
  const {
    author,
    genre,
    minPages = "0",
    maxPages,
    title,
  } = req.query as {
    author: string;
    genre: string;
    minPages: string;
    maxPages: string;
    title: string;
  };
  const userId = req.user?.id;

  const books = await fetchBooksService({
    author,
    genre,
    minPages,
    maxPages,
    title,
    userId,
  });
  return res.status(200).send(books);
}

export async function getPhysicalBooks(req: Request, res: Response) {
  const books = await fetchPhysicalBooksService();
  return res.status(200).json(books);
}

export async function addBook(req: Request, res: Response) {
  const { file, cover } = req.files as any;
  const {
    pages,
    description,
    author,
    genre,
    title,
    volume,
    edition,
    hasPhysicalCopy,
    physicalCopyQuantity,
  } = req.body;

  const response = await addBookService({
    title,
    description,
    author,
    genre,
    pages,
    volume,
    edition,
    hasPhysicalCopy,
    physicalCopyQuantity,
    file_book: file,
    cover_file: cover,
  });

  return res.status(201).json(response);
}

export async function updateReadings(req: Request, res: Response) {
  const { id: bookId } = req.book;
  const { id: userId } = req.user;
  await updateReadingsService(bookId, userId);
  return res.status(204).send();
}

export async function updateBook(req: Request, res: Response) {
  const { author, title, description, genre, pages, cover } = req.body;
  const { id } = req.book;
  const book = await updateService({
    id,
    author,
    title,
    description,
    genre,
    pages,
    cover,
  });

  return res.status(200).json(book);
}

export async function deleteBook(req: Request, res: Response) {
  const { id } = req.book as { id: string };
  await deleteService(id);
  return res.status(204).send();
}

export async function favoriteBook(req: Request, res: Response) {
  const { id } = req.book as { id: string };
  const { id: userId } = req.user;
  await favoriteBookService(id, userId!);
  return res.status(204).send();
}

export async function unfavoriteBook(req: Request, res: Response) {
  const { id } = req.book as { id: string };
  const { id: userId } = req.user;
  await unfavoriteBookService(id, userId!);
  return res.status(204).send();
}

export async function fetchFavorites(req: Request, res: Response) {
  const { id } = req.user;
  const favorites = await fetchFavoritesService(id!);
  return res.status(200).send(favorites);
}
