/* eslint-disable import/order */
import { request } from 'express';
import { sign } from 'jsonwebtoken';

import generateToken from '../../services/user/generateToken.service';
import registerService from '../../services/user/register.service';

import { user, admin, userLogin, adminLogin } from '../DataUser';
import { prismaMock } from '../config/singleton';
import 'dotenv/config';

describe('Testando os Services user', () => {

  it('Register Service: Deve ser Possivel criar um Usuario', async () => {

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

  it('Generate Token Service: Deve ser Possivel gerar um Token', async () => {

    const {id} = user;

    const token = sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    return expect(generateToken(id)).toBe(token);
  });

});
// resetPassaword.service e update.service estão ausentes