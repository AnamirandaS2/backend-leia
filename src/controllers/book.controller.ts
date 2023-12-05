import { Response, Request } from 'express';
import addBookService from '../services/book/addBook';
import * as fs from 'fs/promises';
import supabase from "../database/bucket";


export async function viewBook(req : Request, res : Response)
{
    book = req.book;

    // Recupera a cover na supbase
    const {data, error} = await supabase.storage.from('books').download(`./${book.cover}`)
    if(error)
    { console.log(error) }

    // var content = Buffer.from(data.arrayBuffer());

    // await fs.appendFile(`./images/${book.id}.png`, content);
    // res.coverBook = {
    //     cover : data.arrayBuffer
    // }

    return res.status(200).json(book);
}

export async function downloadBook(req : Request, res : Response)
{
    book = req.book;

    // Faz download do livro na supbase
    const {data, error} = await supabase.storage.from('books').download(`./${book.source}`)
    if(error)
    { console.log(error) }

    return res.status(200)
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
