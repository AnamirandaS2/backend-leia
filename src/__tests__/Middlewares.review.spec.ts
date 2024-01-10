import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkCreationAvailable from '../middlewares/review/checkCreationAvailable';
import checkReviewExists from '../middlewares/review/checkReviewExists';
import checkReviewIsFinished from '../middlewares/review/checkReviewIsFinished';
import checkReviewIsFromUser from '../middlewares/review/checkReviewIsFromUser';

import { book, review, user, } from './DataUser';
import { prismaMock } from './config/singleton';

describe('Testando os Middlewares Review', () => {

  it('checReviewExists Middleware: Deve ser possivel verificar se uma review existe ', async () => {
        
    prismaMock.review.findUnique.mockResolvedValue(null);
    
    const next = jest.fn().mockReturnValue('ok');

    request.params = { id : review.id };
    await expect(checkReviewExists(request, response, next)).rejects.toThrow('Review not found');

    prismaMock.review.findUnique.mockResolvedValue(review);
    prismaMock.user.findFirst.mockResolvedValue(user);

    await checkReviewExists(request, response, next);
    expect(next).toHaveBeenCalled();

  });

  it('checkReviewIsFinished Middleware: Deve ser possivel verificar se uma review esta terminada', async () => {

    request.review = {...review, finished: false};
    const next = jest.fn();

    await checkReviewIsFinished(request, response, next);
    expect(next).toHaveBeenCalled();
  });

  it('checkReviewIsFromUser Middleware: Deve ser possiveil verificar o autor de uma review', async () => {

    const next = jest.fn().mockReturnValue('ok');
    
    request.query = { reviewId : undefined };
    request.params = { reviewId : '' };
    await expect(checkReviewIsFromUser(request, response, next)).rejects.toThrow('Review id is required');
    
    request.query = { reviewId : review.id };
    prismaMock.review.findUnique.mockResolvedValue(review);
    request.user = { id : '345542343445' };
    await expect(checkReviewIsFromUser(request, response, next)).rejects.toThrow('You are not allowed to do this');
    
    request.user = { id : user.id };
    prismaMock.review.findUnique.mockResolvedValue(null);
    await expect(checkReviewIsFromUser(request, response, next)).rejects.toThrow('Review not found');
    
    prismaMock.review.findUnique.mockResolvedValue(review);
    await checkReviewIsFromUser(request, response, next);
    expect(next).toHaveBeenCalled();

  });

  it('checkCreationAvailable Middleware: Deve ser possivel verificar se pode criar uma review', async () => {

    request.body = { bookId : book.id };
    request.user = { id : user.id };

    const next = jest.fn().mockReturnValue('ok');
    
    prismaMock.review.findMany.mockResolvedValue( [{...review, finished: false}] );
    await expect(checkCreationAvailable(request, response, next)).rejects.toThrow('A review of this book is already in progress');

    prismaMock.review.findMany.mockResolvedValue( [review] );
    await expect(checkCreationAvailable(request, response, next)).rejects.toThrow('A review of this book was already made and approved');

    prismaMock.book.findUnique.mockResolvedValue(null);
    prismaMock.review.findMany.mockResolvedValue( [{...review, approved: false}] );
    await expect(checkCreationAvailable(request, response, next)).rejects.toThrow('Book not found');

    const retorno = jest.fn().mockResolvedValue(book);
    
    prismaMock.book.findUnique.mockImplementationOnce(retorno);
    await expect(checkCreationAvailable(request, response, next)).resolves.toBe('ok');

  });

});