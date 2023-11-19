import { Request, Response } from "express";


class UserController {

    async CreateUser(req: Request, res: Response)
    {
        console.log(req.baseUrl)
        return res.status(200).json({"message" : "user criado!"});
    }

    async UpdateUser(req: Request, res: Response)
    {
        console.log("ok!")
        return res.status(200).json({"message" : "user atualizado!"});
    }
}

export default new UserController()