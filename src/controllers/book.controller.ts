import { Response, Request } from 'express';

import addBookService from '../services/book/addBook';
import deleteService from '../services/book/delete.service';
import fetchBooksService from '../services/book/fetchBooks.service';
import getBookService from '../services/book/getBook.service';
import updateService from '../services/book/updateBook';

export async function getBook(req : Request, res : Response)
{
  const { title, author } = req.book as { title: string; author: string };

  const book = await getBookService(title, author) as string;
  return res.status(200).send(book);
}

export async function queryBooks(req: Request, res: Response)
{
  const { author, genre, minPages = '0', maxPages } = 
  req.query as { author: string; genre: string; minPages: string; maxPages: string };

  const books = await fetchBooksService({ author, genre, minPages, maxPages });
  return res.status(200).send(books);
}

export async function addBook(req : Request, res : Response)
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { book, cover } = req.files as any;
  const { pages, description, author, genre, title } = req.body;

  const response = await addBookService({
    title, 
    description, 
    author, 
    genre, 
    pages, 
    file_book: book, 
    cover_file: cover
  });
        
  return res.status(201).json(response);
}

export async function updateBook(req: Request, res: Response)
{
  const { author, title, description, genre, pages, cover } = req.body;
  const { id } = req.book;
  const book = await updateService({ id, author, title, description, genre, pages, cover });
  
  return res.status(200).json(book);
}

export async function deleteBook(req: Request, res: Response)
{
  const { id } = req.book as { id: string };
  await deleteService(id);
  return res.status(204).send();
}
