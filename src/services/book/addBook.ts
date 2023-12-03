import prisma from '../../database/db';
import supabase from '../../database/bucket';
import { AppError } from './../../error';
import { paramsBook } from '../../interfaces/book.interface';


export default async function AddBookService(
    {title, description, author, genre, pages, publishedAt, file_book, cover_file} : paramsBook) {
    
    const bucket = await supabase.storage.getBucket('books');
    if (!bucket.data) 
    {
        await supabase.storage.createBucket('books', {
            public: false,
            fileSizeLimit: 10240,
        });
    }

    // Envia o livro para a supbase
    const metadataBook = await supabase.storage.from('books').upload(`${title}_(${author})`,file_book.buffer, 
        {   cacheControl: '3600',
            upsert: false, 
            contentType: file_book.mimetype
        });

    if (metadataBook.error){
        throw new AppError('Livro: ' + metadataBook.error.message, 500);
    }

    // Envia a capa do livro para a supbase
    const metadataCover = await supabase.storage.from('books').upload(`${title}_(${author})_cover`,cover_file.buffer, 
        {   cacheControl: '3600',
            upsert: false, 
            contentType: cover_file.mimetype
        });

    if (metadataCover.error){
        throw new AppError('Capa: ' + metadataCover.error.message, 500);
    }

    const book = await prisma.book.create({ data : {
        title,
        description,
        author,
        genre,
        pages: Number(pages),
        cover: metadataCover.data.path,
        source: metadataBook.data.path,
        publishedAt: new Date(publishedAt)
    }});

    return {...book, id : undefined};
}