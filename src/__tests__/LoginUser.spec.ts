import { prismaMock } from '../database/singleton';
import checkLogin from '../middlewares/checkLogin';
import { request, response } from 'express';
import { describe, it } from '@jest/globals'
import { userLogin, adminLogin, user, admin } from './DataUser';
import { sign } from 'jsonwebtoken';
import generateToken from '../services/user/generateToken.service';
import 'dotenv/config';



describe("Login de um usuario", () => {

    it("É impossivel logar com Email não Registrado", async () => {
        
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

    it("É impossivel logar com Senha Errada", async () => {
        
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

    it("Deve ser Possivel gerar um Token", async () => {

        const id = user.id;

        const token = sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        await expect(generateToken(id)).toBe(token);

    })

    it
})