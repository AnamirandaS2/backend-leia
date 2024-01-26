import AddBookService from '../../services/book/addBook';

jest.mock('../../database/bucket', () => ({
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

test('should add book idk', ()=> {
  expect(AddBookService).toBeDefined();
  const spy = jest.fn().mockImplementation(AddBookService);
  spy({title: '1', description: '2', author: '3', genre: '4', pages: 5, publishedAt: new Date(), file_book: {buffer: Buffer.from(''), mimetype: 'application/pdf'}, cover_file: {buffer: Buffer.from(''), mimetype: 'image/png'}});
});