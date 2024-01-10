import { jest } from '@jest/globals';
import { Bucket }  from '@supabase/storage-js/src/lib/types';

import createReviewService from '../services/review/createReview.service';
import findReviewService from '../services/review/findReview.service';

import { book, user, review } from './DataUser';
import { prismaMock } from './config/singleton';

const data : Bucket = {
  id : 'teste',
  name : 'teste',
  owner : 'www',
  created_at : 'www',
  updated_at : '111',
  public : true,
};

jest.mock('../database/bucket', () => ({
  __esModule: true,
  default: {
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn().mockReturnValue({
          data: {
            path: 'ok',
            error : null
          }}),
          
        download: jest.fn().mockReturnValue({
          data : new Blob(['testReview'], { type: 'text' }),
          error : null
        })
      }),
      getBucket: jest.fn().mockReturnValue(Promise.resolve({data: data, error : null})),
      createBucket: jest.fn()
    },
  },
}));

describe('Testando os Services review', () => {

  it('createReview Service: Deve ser possivel criar uma review', async () => {

    const bookId = book.id;
    const content = 'Nao olhe muito para o abismo, senão ele olhará de volta';
    const title = 'Resenha-para-o-livro-Sherlock-Homes';
    const userId = user.id;
    const name = 'Jhonatan-Almeida-Carvalho';

    const parseFilename = jest.fn().mockReturnValue(`${name}-${title}`);

    prismaMock.review.create.mockResolvedValue(review);
    const received = await createReviewService({bookId, content, title, userId, name});
        
    expect(received).toStrictEqual({...review, userId: undefined});
  });

  it('findReview Service: É possivel pesquisar uma review', async () => {

    expect(findReviewService('roberto', review.title)).resolves.toBe('testReview');
  });
});