import { Request, Response } from "express";
import registerService from "../services/admin/register";
import generateToken from "../services/admin/login";


export async function registerController(req: Request, res: Response)
{
    const { name, email, password } = req.body as { name: string, email: string, password: string };
    
    const userAdmin = await registerService({ name, email, password });

    return res.status(201).json(userAdmin);
}

export function loginController(req : Request, res : Response)
{
    const { id } = req.user;
    const token = generateToken(id);
    return res.status(200).json({ token });
}

export async function forgot(req : Request, res : Response)
{

}

export async function updateUser(req: Request, res: Response)
{
    console.log("ok!")
    return res.status(200).json({"message" : "user atualizado!"});
}