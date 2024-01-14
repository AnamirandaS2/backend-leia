
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

  it('Reset Password Service: Deve ser Possivel mudar a senha', async () => {

    const {id} = user;
    const newPassword = '87654321';

    resetPasswordService(id, newPassword);
    expect(prismaMock.user.update).toHaveBeenCalledTimes(1);

    expect(prismaMock.user.update).not.toThrow();
  });

  // { title, description, author, genre, pages, publishedAt, file_book, cover_file }
  test('should add book idk', ()=> {
    expect(AddBookService).toBeDefined();
    const spy = jest.fn().mockImplementation(AddBookService);
    spy({title: '1', description: '2', author: '3', genre: '4', pages: 5, publishedAt: new Date(), file_book: {buffer: Buffer.from(''), mimetype: 'application/pdf'}, cover_file: {buffer: Buffer.from(''), mimetype: 'image/png'}});
  });
});

/*
*  const metadataCover = await supabase.storage.from('books').upload(parseFilename('_cover', title, author), cover_file.buffer, 
    {   cacheControl: '3600',
      upsert: false, 
      contentType: cover_file.mimetype
    });

*/
