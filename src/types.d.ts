export interface BooksAPI {
    items: Item[];
}

export interface Item {
    volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
    title:          string;
    authors:        string[];
    publishedDate?: Date;
    categories?:    string[];
    imageLinks:     ImageLinks;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
}

export interface BookProp{
    books: Item[] | undefined
}