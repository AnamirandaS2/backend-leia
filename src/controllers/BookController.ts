import { Response, Request, json } from "express";

type ParamsType= { id: string | number} 

class BookController {

    async PickUpBook(req : Request<ParamsType>, res : Response)
    {
        const { id } = req.params;
        return res.status(200).json({id: Number(id)});
    }

    async FilterBook(req : Request, res : Response)
    {
        const { author, date, quantity } = req.query;
    }

    async AddBook()
    {

    }

    async UpdateBook()
    {

    }

    async DeleteBook()
    {

    }
}

export default new BookController();