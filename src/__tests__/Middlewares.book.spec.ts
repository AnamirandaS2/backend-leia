import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkBook from '../middlewares/book/checkBook';

import { book, review, user, } from './DataUser';
import { prismaMock } from './config/singleton';

describe('Testando os Middlewares Book', () => {

  it('checkBook Middleware: Deve ser possivel checar se um livro existe', async () => {

    request.params = { id: book.id };

    const next = jest.fn().mockReturnValue('ok');

    prismaMock.book.findFirst.mockResolvedValueOnce(null);
    await expect(checkBook(request, response, next)).rejects.toThrow('Livro não encontrado');

    prismaMock.book.findFirst.mockResolvedValue(book);
    await expect(checkBook(request, response, next)).resolves.toBe('ok');

  });
});