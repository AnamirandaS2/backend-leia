import { Response, Request } from 'express';

import addBookService from '../services/book/addBook';
import deleteService from '../services/book/delete.service';
import fetchBooksService from '../services/book/fetchBooks.service';
import getBookService from '../services/book/getBook.service';
import updateService from '../services/book/updateBook';

export async function getBook(req : Request, res : Response)
{
  const { title, author } = req.book as { title: string; author: string };

  const book = await getBookService(title, author);
  
  res.contentType('application/pdf');
  return res.status(200).send(book);
}

export async function queryBooks(req: Request, res: Response)
{
  const { author, from, to, genre, minPages = '0', maxPages } = 
  req.query as { author: string; from: string; to: string; genre: string; minPages: string; maxPages: string };

  const books = await fetchBooksService({ author, from, to, genre, minPages, maxPages });
  return res.status(200).send(books);
}

export async function addBook(req : Request, res : Response)
{
  const { title, description, author, genre, pages, publishedAt } = req.body;

  const [ file_book ] = req.files!['book'];
  const [ cover_file ] = req.files!['cover'];

  const book = await addBookService({
    title, 
    description, 
    author, 
    genre, 
    pages, 
    publishedAt, 
    file_book, 
    cover_file
  });
        
  return res.status(201).json(book);
}

export async function updateBook(req: Request, res: Response)
{
  const { author, title, description, genre, pages, publishedAt, cover } = req.body;
  const { id } = req.book;
  const book = await updateService({ id, author, title, description, genre, pages, publishedAt, cover });
  
  return res.status(200).json(book);
}

export async function deleteBook(req: Request, res: Response)
{
  const { id } = req.book as { id: string };
  await deleteService(id);
  return res.status(204).send();
}
