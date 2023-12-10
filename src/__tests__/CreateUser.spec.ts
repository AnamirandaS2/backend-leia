import { request, response } from 'express';
import registerService from '../services/user/register'
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability'
import { resetPasswordController } from '../controllers/user.controller.';
import { prismaMock } from '../database/singleton';
import {v4 as uuidv4} from 'uuid';
import hash from 'bcrypt';


describe('Criação de um Usuario', () => {

    const userLogin = {
            email : "teste@gmail.com", 
            name : 'TesteMan', 
            password : '12345678',
        }

    it("Deve ser Possivel criar um Usuario", async () => { 
        
        const user = {
            id : uuidv4(),
            name : userLogin.name,
            email : userLogin.email,
            password : hash.hashSync(userLogin.password, 12),
            avatar : null,
            approved: false,
            createdAt : new Date(),
            updatedAt : new Date(),
        }
        
        prismaMock.user.create.mockResolvedValue(user);
        
        expect(registerService(userLogin))
        .resolves
        .toStrictEqual({
            ...user, id: undefined, password: undefined, updatedAt: undefined
        });

    });

    it("É impossivel criar um Usuario com Email ja existente", async () => { 
        
        const user = {
            id : uuidv4(),
            name : userLogin.name,
            email : userLogin.email,
            password : hash.hashSync(userLogin.password, 12),
            avatar : null,
            approved: false,
            createdAt : new Date(),
            updatedAt : new Date(),
        }

        prismaMock.user.create({data : user});
        prismaMock.user.findFirst.mockResolvedValue(user)
        
        request.body = {"email" : userLogin.email}
        
        const next = jest.fn()
        expect(checkEmailAvailability(request, response, next ))
        .rejects
        .toThrow('Este e-mail já está cadastrado.');

    });

});