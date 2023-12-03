import { Response, Request } from 'express';
import addBookService from '../services/book/addBook';


export async function pickUpBook(req : Request, res : Response)
{
    const { id } = req.params;
    return res.status(200).json({id: Number(id)});
}

export async function filterBook()
{
    // const { author, date, quantity } = req.query;
}

export async function addBook(req : Request, res : Response)
{
    const { title, description, author, genre, pages, publishedAt} = req.body;
    const file_book = req.files['book'][0];
    const cover_file = req.files['cover'][0];

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

export async function updateBook()
{

}

export async function deleteBook()
{

}
