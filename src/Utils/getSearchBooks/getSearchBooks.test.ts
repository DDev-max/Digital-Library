import type { SearchBooksApi } from 'data/types';
import { fetchFn } from 'Utils/fetchFn/fetchFn';
import { getSearchBook } from './getSearchBook';

jest.mock('Utils/fetchFn/fetchFn');

const mockedFetch = fetchFn as jest.MockedFunction<typeof fetchFn>;

const setFetchNow = jest.fn();
const URL = 'https://example.com';

it('should return results from api', async () => {
  const mockedResults: SearchBooksApi = {
    items: [
      {
        id: '1',
        volumeInfo: {
          authors: ['Someone'],
          title: 'Book name',
        },
      },
    ],
  };

  mockedFetch.mockResolvedValue(mockedResults);
  const apiResults = await getSearchBook({ setFetchNow, URL });

  expect(apiResults).toMatchObject(mockedResults);
});

it('shouldnt return repeated ids', async () => {
  const repeatedIds: SearchBooksApi = {
    items: [
      {
        id: '1',
        volumeInfo: {
          authors: ['Someone'],
          title: 'Book name',
        },
      },
      {
        id: '1',
        volumeInfo: {
          authors: ['Someone else'],
          title: 'Book',
        },
      },
    ],
  };

  const noRepeatedId: SearchBooksApi = {
    items: [
      {
        id: '1',
        volumeInfo: {
          authors: ['Someone'],
          title: 'Book name',
        },
      },
    ],
  };

  mockedFetch.mockResolvedValue(repeatedIds);
  const apiResults = await getSearchBook({ setFetchNow, URL });

  expect(apiResults).toMatchObject(noRepeatedId);
});
