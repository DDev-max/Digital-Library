import type { BooksAPI } from 'data/types'

export const mockLandingFetch: BooksAPI = {
  items: [
    {
      id: '1',
      volumeInfo: {
        title: 'Book One',
        authors: ['Author One'],
        publishedDate: '2020-01-01',
        categories: ['Fiction'],
        imageLinks: {
          smallThumbnail: 'https://example.com/small1.jpg',
          thumbnail: 'https://example.com/thumb1.jpg',
        },
        description: 'Description of Book One.',
      },
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Book Two',
        authors: ['Author Two', 'Co-Author'],
        imageLinks: {
          smallThumbnail: 'https://example.com/small2.jpg',
          thumbnail: 'https://example.com/thumb2.jpg',
        },
        description: 'Description of Book Two.',
      },
    },
    {
      id: '3',
      volumeInfo: {
        title: 'Book Three',
        authors: ['Author Three'],
        publishedDate: '2018-07-15',
        categories: ['Science', 'Technology'],
        imageLinks: {
          smallThumbnail: 'https://example.com/small3.jpg',
          thumbnail: 'https://example.com/thumb3.jpg',
        },
        description: 'Description of Book Three.',
      },
    },
    {
      id: '4',
      volumeInfo: {
        title: 'Book Four',
        authors: ['Author Four'],
        publishedDate: '2022-11-23',
        categories: ['History'],
        imageLinks: {
          smallThumbnail: 'https://example.com/small4.jpg',
          thumbnail: 'https://example.com/thumb4.jpg',
        },
        description: 'Description of Book Four.',
      },
    },
  ],
}
