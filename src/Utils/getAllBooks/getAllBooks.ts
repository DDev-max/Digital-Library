import type { BooksAPI } from 'data/types'
import { fetchFn } from 'Utils/fetchFn/fetchFn'

export async function getAllBooks() {
  const items = 'id,volumeInfo'
  const volumeInfoItems = 'title,description,publishedDate,imageLinks,authors,categories'
  const baseApiUrl = 'https://www.googleapis.com/books/v1'

  const API_URL = `${baseApiUrl}/volumes?q=subject:fiction&fields=items(${items}(${volumeInfoItems}))&maxResults=35`

  const books = await fetchFn<BooksAPI>(API_URL)

  const mappedBooks: BooksAPI = {
    items: books.items.map(elmnt => ({
      id: elmnt.id,
      volumeInfo: {
        title: elmnt.volumeInfo.title,
        authors: elmnt.volumeInfo.authors,
        publishedDate: elmnt.volumeInfo.publishedDate || '',
        categories: elmnt.volumeInfo.categories || [],
        imageLinks: {
          smallThumbnail: elmnt.volumeInfo.imageLinks?.smallThumbnail || '',
          thumbnail: elmnt.volumeInfo.imageLinks?.thumbnail || '',
        },
        description: elmnt.volumeInfo.description,
      },
    })),
  }

  return mappedBooks
}
