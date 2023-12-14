import { request, response } from 'express';
import registerService from '../services/user/register.service'
import checkEmailAvailability from '../middlewares/checkEmailAvailability'
import { prismaMock } from '../database/singleton';
import { describe } from '@jest/globals'
import { user, admin, userLogin, adminLogin } from './DataUser';


describe('Criação de um Usuario', () => {

    it("Deve ser Possivel criar um Usuario", async () => { 
        
        prismaMock.user.create.mockResolvedValue(user);
        prismaMock.admin.create.mockResolvedValue(admin);

        request.baseUrl = '/user';
        await expect(registerService(userLogin, request))
        .resolves
        .toStrictEqual({
            ...user, id: undefined, password: undefined, updatedAt: undefined
        });

        request.baseUrl = '/admin';
        await expect(registerService(adminLogin, request))
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
        
        const next = jest.fn();
        
        request.body = {"email" : userLogin.email}
        request.baseUrl = '/user';
        await expect(checkEmailAvailability(request, response, next ))
        .rejects
        .toThrow('Este e-mail já está cadastrado.');

        request.body = adminLogin.email;
        request.baseUrl = '/admin';
        await expect(checkEmailAvailability(request, response, next ))
        .rejects
        .toThrow('Este e-mail já está cadastrado.');

    });

});