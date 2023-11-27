import { Response, Request, json } from "express";
import AddBookService from "../services/book/addBook";

class BookController {

    async PickUpBook(req : Request, res : Response)
    {
        const { id } = req.params;
        return res.status(200).json({id: Number(id)});
    }

    async FilterBook(req : Request, res : Response)
    {
        const { author, date, quantity } = req.query;
    }

    async AddBook(req : Request, res : Response)
    {
        const { title, description, author, genre, pages, publishedAt} = req.body
        const file_book = req.files['book'][0];
        const cover_file = req.files['cover'][0];

        const book = await AddBookService({
            title, 
            description, 
            author, 
            genre, 
            pages, 
            publishedAt, 
            file_book, 
            cover_file
        })
        
        return res.status(201).json(book)
    }

    async UpdateBook()
    {

    }

    async DeleteBook()
    {

    }
}

export default new BookController();