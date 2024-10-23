import { CSSProperties } from "react";

export interface BooksAPI {
    items: Item[];
}

export interface Item {
    volumeInfo: VolumeInfo;
    id: string
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
    books: Item[] | undefined;
}

export interface SVGProps{
    classNameSVG? : string
    classNameBtn?: string
    onClick?: ()=> void
    onMouseDown?: ()=> void
}


interface extendHighlightProps{
    selectedParagraph: string
    spanOpenTag: string
    spanCloseTag: string
}

export interface HighlightStart extends extendHighlightProps{
    hasSpanOpen: RegExpExecArray | null
    spanOpenRegex: RegExp
}

export interface HighlightEnd extends extendHighlightProps{
    hasSpanClose: RegExpExecArray | null
    spanOpenRegex: RegExp
}

export interface StartEndProps{
    plainText: string
    range: Range | undefined
    userSeleccion: string
    spanOpenTag: string
    spanCloseTag: string
}

export interface CopyTxProps{
    setAlert: React.Dispatch<React.SetStateAction<string>>
}

export interface HtmlFunctionProps{
    userSeleccion: string
    range: Range | undefined
    plainText: string
    selectedParagraph: string
}


export interface highlightColorProps{
    e: React.MouseEvent<HTMLButtonElement>
    highlightedContent: string[]
    setHighlightedContent:  React.Dispatch<React.SetStateAction<string[]>>
    setAlert:  React.Dispatch<React.SetStateAction<string>>
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
}

export interface highlightPlainTextProps{
    range: Range | undefined,
    htmlContent: string ,
    userSeleccion: string,
    spanOpenTag: string,
    spanCloseTag: string,
    fullPlainTxt: string | null

}

export interface removeHighlightProps{
    fromHighlight: boolean
    highlightedContent: string[]
    setHighlightedContent:  React.Dispatch<React.SetStateAction<string[]>>
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
}

// export interface RepeatedWordFnProps{
//     content: string
//     toSearch: string
//     condition: number
// }


export interface conversionParams{
    title: string
    fromURL?: boolean
 }


 export interface BooksAPISearch {
    items: ItemSearch[];
}

export interface ItemSearch {
    id:         string;
    volumeInfo: VolumeInfoSearch;
}

export interface VolumeInfoSearch {
    title:   string;
    authors: string[];
}

export interface DebounceProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => void
    delay?: number
}


export interface BookAds {
    ImgLink: string; // URL de la imagen
    id: string;     // ID del libro
    alt: string;    // Texto alternativo de la imagen
}

export interface HighlightedCntxtType{
    highlightedContent : string[]
    setHighlightedContent: React.Dispatch<React.SetStateAction<string[]>>
    alert: string
    setAlert: React.Dispatch<React.SetStateAction<string>>
    favorites: Item[]
    setFavorites:  React.Dispatch<React.SetStateAction<Item[] | undefined>>
 }
 

 export interface submitSearchProps{
    event: React.FormEvent<HTMLFormElement>
    redirect: NavigateFunction
    userSearch: string
}


export interface SelectOptnProps{
    userSearch: string
    setOptnIdx: React.Dispatch<React.SetStateAction<number>>
    setUserSearch:  React.Dispatch<React.SetStateAction<string>>
    event: React.KeyboardEvent<HTMLFormElement>
    optnsRef: React.MutableRefObject<(string | null)[]>
    debouncCb: () => void
}


export interface InputChangeProps{
    event: React.ChangeEvent<HTMLInputElement>
    debounceCb: ()=> void
    setUserSearch: React.Dispatch<React.SetStateAction<string>>
}


export interface UseRemoveAddFavProps{
    setFavorites: React.Dispatch<React.SetStateAction<Item[] | undefined>>
    selection: Item
    alreadyAdded: boolean
}