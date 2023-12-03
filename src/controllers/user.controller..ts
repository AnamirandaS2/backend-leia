import { Request, Response } from 'express';
import registerService from '../services/user/register';
import generateToken from '../services/user/login';


export async function registerController(req: Request, res: Response)
{
    const { name, email, password } = req.body as { name: string, email: string, password: string };
    
    const user = await registerService({ name, email, password });

    return res.status(201).json(user);
}

export function loginController(req : Request, res : Response)
{
    const { id } = req.user;
    const token = generateToken(id);
    return res.status(200).json({ token });
}

export async function forgot()
{

}

export async function updateUser(req: Request, res: Response)
{
    console.log('ok!');
    return res.status(200).json({'message' : 'user atualizado!'});
}