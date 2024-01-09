import { describe, it } from '@jest/globals';
import { request, response } from 'express';

import checkReviewExists from '../middlewares/review/checkReviewExists';

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

});