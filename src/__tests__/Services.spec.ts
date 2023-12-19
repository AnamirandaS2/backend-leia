
import { request } from 'express';
import { sign } from 'jsonwebtoken';

import { prismaMock } from '../database/singleton';
import AddBookService from '../services/book/addBook';
import generateToken from '../services/user/generateToken.service';
import registerService from '../services/user/register.service';
import resetPasswordService from '../services/user/resetPassword.service';

import { user, admin, userLogin, adminLogin } from './DataUser';
import 'dotenv/config';

jest.mock('../database/bucket', () => ({
  __esModule: true,
  default: {
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn().mockReturnValue({
          data: {
            path: ''
          }
        }),
      }),
      getBucket: jest.fn().mockReturnValue({}),
      createBucket: jest.fn()
    },
  },
}));
describe('Testando os Services em user', () => {

  jest.mock('../database/bucket', () => {
    const originalModule = jest.requireActual('../database/bucket');
    return {
      __esModule: true,
      ...originalModule,
      default: jest.fn()
    };
  });

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

    await expect(generateToken(id)).toBe(token);
  });

})

// resetPassaword.service e update.service estão ausentes