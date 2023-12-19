import { prismaMock } from "../database/singleton";
import { user, admin, userLogin, adminLogin } from './DataUser';
import registerService from '../services/user/register.service'
import { request } from "express";
import { sign } from "jsonwebtoken";
import generateToken from "../services/user/generateToken.service";
import 'dotenv/config';
import resetPasswordService from "../services/user/resetPassword.service";



describe("Testando os Services em user", () => {
    
    it("Register Service: Deve ser Possivel criar um Usuario", async () => {

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

    it("Generate Token Service: Deve ser Possivel gerar um Token", async () => {

        const id = user.id;

        const token = sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        await expect(generateToken(id)).toBe(token);
    })

    it("Reset Password Service: Deve ser Possivel mudar a senha", async () => {

        const id = user.id;
        const newPassword = "87654321";

        resetPasswordService(id, newPassword)
        expect(prismaMock.user.update).toHaveBeenCalledTimes(1);

        expect(prismaMock.user.update).not.toThrow();
    })
})