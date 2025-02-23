import { fetchFn } from './fetchFn';

it('Should throw an error if response is not ok', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 500,
      statusText: 'Server Error',
      ok: false,
    })
  ) as jest.Mock;

  await expect(fetchFn('https://example.com')).rejects.toThrow('Fetch error: 500, Server Error');
});

it('should return data from api', async () => {
  const mockedFetch = [
    {
      id: 'A5TKAwAAQBAJ',
      volumeInfo: {
        title: 'En sólo 20 horas',
        authors: ['Josh Kaufman'],
      },
    },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockedFetch),
      ok: true,
    })
  ) as jest.Mock;

  const data = await fetchFn('https://example.com');

  expect(data).toEqual(mockedFetch);
});
