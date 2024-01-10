import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkReviewExists from '../middlewares/review/checkReviewExists';
import checkReviewIsFinished from '../middlewares/review/checkReviewIsFinished';
import checkReviewIsFromUser from '../middlewares/review/checkReviewIsFromUser';

import { review, user, } from './DataUser';
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

});