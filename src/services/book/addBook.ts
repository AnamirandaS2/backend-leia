/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '../../database/bucket';
import prisma from '../../database/db';
import { paramsBook } from '../../interfaces/book.interface';
import parseFilename from '../../utils/parseFilename';

import { AppError } from './../../error';

export default async function AddBookService(
  { title, description, author, genre, pages, file_book, cover_file } : paramsBook) {
    
  const bucket = await supabase.storage.getBucket('books');
  if (!bucket.data) 
  {
    await supabase.storage.createBucket('books', {
      public: false,
      fileSizeLimit: 52428800,
    });
  }
  
  // Envia o livro para a supbase
  const metadataBook = await supabase.storage.from('books').upload(parseFilename('', title, author), (file_book as any).data, 
    {   
      cacheControl: '3600',
      upsert: false, 
      contentType: file_book.mimetype,
    });

  if (metadataBook.error){
    throw new AppError('Erro interno do servidor', 500);
  }

  // Envia a capa do livro para a supbase
  const metadataCover = await supabase.storage.from('books').upload(parseFilename('_cover', title, author), (cover_file as any).data, 
    {   cacheControl: '3600',
      upsert: false, 
      contentType: cover_file.mimetype
    });

  if (metadataCover.error){
    throw new AppError('Erro interno do servidor', 500);
  }

  const book = await prisma.book.create({ 
    data: {
      title,
      description,
      author,
      genre,
      pages: Number(pages),
      cover: metadataCover.data.path,
      source: metadataBook.data.path,
    },
    select: {
      title: true,
      description: true,
      author: true,
      genre: true,
      pages: true,
      createdAt: true,
      activities: {
        select: {
          page: true
        }
      }
    }
  });

  return {...book, id : undefined};
}