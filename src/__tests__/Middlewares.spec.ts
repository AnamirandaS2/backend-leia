import { describe, it } from '@jest/globals'
import { prismaMock } from '../database/singleton';
import { admin, adminLogin, user, userLogin } from './DataUser';
import {  request, response } from 'express';

import checkEmailAvailability from '../middlewares/user/checkEmailAvailability';
import checkLogin from '../middlewares/user/checkLogin';



describe("Testando os Middlewares em user", () => {


    it("checkEmailAvailability Middleware: É impossivel criar um Usuario com Email ja existente", async () => {

        prismaMock.user.create({data : user});
        prismaMock.user.findFirst.mockResolvedValue(user)
        prismaMock.admin.create({data : admin});
        prismaMock.admin.findFirst.mockResolvedValue(admin)
        
        const next = jest.fn();
        
        request.body = {"email" : userLogin.email}
        request.baseUrl = '/user';
        await expect(checkEmailAvailability(request, response, next ))
        .rejects.toThrow('Este e-mail já está cadastrado.');

        request.body = adminLogin.email;
        request.baseUrl = '/admin';
        await expect(checkEmailAvailability(request, response, next ))
        .rejects.toThrow('Este e-mail já está cadastrado.');
    })

    it("checkLogin Middleware: É impossivel logar com Email não Registrado", async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(null);
        prismaMock.admin.findFirst.mockResolvedValue(null);

        const next = jest.fn()

        request.body = {
            email : userLogin.email,
            password : userLogin.password
        }

        request.baseUrl = '/user';
        await expect(checkLogin(request, response, next)).rejects.toThrow("Email Inválido");

        request.body = {
            email : adminLogin.email,
            password : adminLogin.password
        }

        request.baseUrl = '/admin';
        await expect(checkLogin(request, response, next)).rejects.toThrow("Email Inválido");

    })

    it("checkLogin Middleware: É impossivel logar com Senha Errada", async () => {
        
        prismaMock.user.findFirst.mockResolvedValue(user);
        prismaMock.admin.findFirst.mockResolvedValue(admin);

        const next = jest.fn()

        const SenhaErrada = "11233112";
        
        request.body = {
            email : userLogin.email,
            password : SenhaErrada
        }

        request.baseUrl = '/user';
        await expect(checkLogin(request, response, next)).rejects.toThrow('Senha Inválida');

        request.body = {
            email : adminLogin.email,
            password : SenhaErrada
        }

        request.baseUrl = '/admin';
        await expect(checkLogin(request, response, next)).rejects.toThrow('Senha Inválida');

    })
})