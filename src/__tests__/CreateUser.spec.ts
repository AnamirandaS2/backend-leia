import { request, response } from 'express';
import registerService from '../services/register'
import checkEmailAvailability from '../middlewares/user/checkEmailAvailability'
import { resetPasswordController } from '../controllers/user.controller';
import { prismaMock } from '../database/singleton';
import {v4 as uuidv4} from 'uuid';
import hash from 'bcrypt';


describe('Criação de um Usuario', () => {

    const userLogin = {
        email : "teste@gmail.com", 
        name : 'TesteMan', 
        password : '12345678',
    }

    const adminLogin = {
        email : "teste@gmail.com", 
        name : 'TesteMan', 
        password : '12345678',
    }

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

    const admin = {
        id : uuidv4(),
        name : adminLogin.name,
        email : adminLogin.email,
        password : hash.hashSync(adminLogin.password, 12),
        avatar : null,
        authorityLevel : 1,
        createdAt : new Date(),
        updatedAt : new Date(),
    }

    it("Deve ser Possivel criar um Usuario", async () => { 
        
        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.admin.create.mockResolvedValue(admin);

        request.baseUrl = '/user';
        expect(registerService(userLogin, request))
        .resolves
        .toStrictEqual({
            ...user, id: undefined, password: undefined, updatedAt: undefined
        });

        request.baseUrl = '/admin';
        expect(registerService(adminLogin, request))
        .resolves
        .toStrictEqual({
            ...admin, id: undefined, password: undefined, updatedAt: undefined
        });

    });

    it("É impossivel criar um Usuario com Email ja existente", async () => { 
        
        prismaMock.user.create({data : user});
        prismaMock.user.findFirst.mockResolvedValue(user)
        prismaMock.admin.create({data : admin});
        prismaMock.admin.findFirst.mockResolvedValue(admin)
        
        const next = jest.fn()
        
        request.body = {"email" : userLogin.email}
        request.baseUrl = '/user';
        expect(checkEmailAvailability(request, response, next ))
        .rejects
        .toThrow('Este e-mail já está cadastrado.');

        request.body = adminLogin.email;
        request.baseUrl = '/admin';
        expect(checkEmailAvailability(request, response, next ))
        .rejects
        .toThrow('Este e-mail já está cadastrado.');

    });

});