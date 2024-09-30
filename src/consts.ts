const fields = "title,publishedDate,imageLinks,authors,categories"

export const API_URL=  `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&fields=items(volumeInfo(${fields}))&maxResults=20`

export const menuSize: number = 160

export const URLorem = "https://baconipsum.com/api/?type=all-meat&paras=10&format=json"

export const pTagLength = 3

export const spanWithClassAtt = 15
export const spanCloseLength = 7