import type { BooksAPI } from 'data/types';
import { fetchFn } from 'Utils/fetchFn/fetchFn';
import { getAllBooks } from './getAllBooks';

jest.mock('Utils/fetchFn/fetchFn');

const mockedBooks: BooksAPI = {
  items: [
    {
      id: '1',
      volumeInfo: {
        authors: ['Someone', 'Someone else'],
        description: 'Book description',
        imageLinks: {
          smallThumbnail: 'https://example.com',
          thumbnail: 'https://example.com',
        },
        title: 'Book name',
        categories: ['Drama'],
        publishedDate: '2025',
      },
    },
  ],
};

const mockedFetchFn = fetchFn as jest.MockedFunction<typeof fetchFn>;

it('should return all books from api', async () => {
  mockedFetchFn.mockResolvedValueOnce(mockedBooks);

  const apiResponse = await getAllBooks();

  expect(apiResponse).toMatchObject<BooksAPI>(mockedBooks);
});
