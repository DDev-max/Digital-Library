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
    books: Item[] | undefined;
}

export interface SVGProps{
    onMouseDown?: (event: MouseEventHandler<SVGSVGElement>) => void
    
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
}

export interface RepeatedWordFnProps{
    content: string
    toSearch: string
    condition: number
}


export interface conversionParams{
    title: string
    fromURL?: boolean
 }