/* eslint-disable import/order */
import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkBook from '../../middlewares/book/checkBook';
import insertIdBook from '../../middlewares/book/insertIdBook';

import { book } from '../DataUser';
import { prismaMock } from '../config/singleton';

describe('Testando os Middlewares Book', () => {

  it('checkBook Middleware: Deve ser possivel checar se um livro existe', async () => {

    request.params = { id: book.id };

    const next = jest.fn().mockReturnValue('ok');

    prismaMock.book.findFirst.mockResolvedValueOnce(null);
    await expect(checkBook(request, response, next)).rejects.toThrow('Livro não encontrado');

    prismaMock.book.findFirst.mockResolvedValueOnce(book);
    await expect(checkBook(request, response, next)).resolves.toBe('ok');

  });

  it('insertIdBook Middleware: Inserindo Id de um livro corretamente', async () => {

    request.body = { nameBook : 'Livro-Teste' };
    const next = jest.fn().mockReturnValue('ok');

    prismaMock.book.findFirst.mockResolvedValueOnce(null);
    await expect(insertIdBook(request, response, next)).rejects.toThrow('Livro não encontrado: Talvez o nome esteja errado');

    const implemention = jest.fn().mockImplementation(({where}) => {return Promise.resolve(book.id);});prismaMock.book.findFirst.mockImplementationOnce(implemention);

    await expect(insertIdBook(request, response, next)).resolves.toBe('ok');
    
  });

});