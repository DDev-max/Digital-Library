import { QueryClient } from "@tanstack/react-query";
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
    description: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
}

export interface BookProp{
    books: Item[] | undefined;
    sectionRef: (elmnt: HTMLElement)=> void
}

export interface SVGProps{
    classNameSVG? : string
    classNameBtn?: string
    onClick?: ()=> void
    onMouseDown?: ()=> void
    title?: string
}

export interface FavoriteSVGProps{
    added?: boolean
    title?: string
    className?: string
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
    data: string[]
    setAlert:  React.Dispatch<React.SetStateAction<string>>
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    queryClient: QueryClient
}

export interface NewAlertProps{
    setAlert:  React.Dispatch<React.SetStateAction<string>>
    string: string
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
    data: string[]
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    queryClient: QueryClient
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
    ImgLink: string; 
    id: string;    
    alt: string; 
    bgColor: string  
    txtColor: string 
}

export interface HighlightedCntxtType{
    alert: string
    setAlert: React.Dispatch<React.SetStateAction<string>>
    favorites: Item[]
    setFavorites:  React.Dispatch<React.SetStateAction<Item[]>>
 }
 

export interface SelectOptnProps{
    e: React.KeyboardEvent<HTMLFormElement>
    optnsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>
    setOptnIdx: React.Dispatch<React.SetStateAction<number>>
    setUserSearch:  React.Dispatch<React.SetStateAction<string>>
    userSearch: string
    isError: boolean

}


export interface InputChangeProps{
    event: React.ChangeEvent<HTMLInputElement>
    setUserSearch: React.Dispatch<React.SetStateAction<string>>
}


export interface RemoveAddFavProps{
    setFavorites: React.Dispatch<React.SetStateAction<Item[]>>
    selection: Item
    alreadyAdded: boolean
}

export interface ColorsMenuProps{
    onClickColor: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onUnselectClick: () => void
}


export interface ScrollSliderProps{
    toRight?: boolean
    elmntRef: React.RefObject<HTMLElement>
}


export interface LocMarkerProps{
    markerPosition: LatLngExpression
}

export interface MapClickProps{
    setMarkerPosition : React.Dispatch<React.SetStateAction<LatLngExpression>>
}

export interface MapProps extends LocMarkerProps, MapClickProps {
    divClassName: string
}

export interface HandleUserLocationProps{
    setMarkerPosition: React.Dispatch<React.SetStateAction<LatLngExpression>>
    setAlert: React.Dispatch<React.SetStateAction<string>>
}

export interface PhoneInputChangeProps{
    e: React.ChangeEvent<HTMLInputElement>
    phoneRef:  React.RefObject<HTMLInputElement>
}

export interface FormSubmitProps{
    e: React.FormEvent<HTMLFormElement>
    markerPosition?: LatLngExpression
    setAlert: React.Dispatch<React.SetStateAction<string>>

}



export interface SearchOptnProps{
    bookName: string,
    redirect: NavigateFunction
    setUserSearch:  React.Dispatch<React.SetStateAction<string>>
    inputRef:  React.RefObject<HTMLInputElement>
}

export interface submitSearchProps{
    event: React.FormEvent<HTMLFormElement>
    redirect: NavigateFunction
    userSearch: string
    setUserSearch:  React.Dispatch<React.SetStateAction<string>>
    inputRef:  React.RefObject<HTMLInputElement>
}


export interface UseSearchProps{
    URL: string
    fetchNow: boolean
    setFetchNow:  React.Dispatch<React.SetStateAction<boolean>>
}


export interface ResetFormProps{
    setUserSearch:   React.Dispatch<React.SetStateAction<string>>
    setOptnIdx:  React.Dispatch<React.SetStateAction<number>>
    queryClient: QueryClient
}


export interface ContentErrorProps{
    isError: boolean
    error: Error | null
}

export interface UseIntObserverProps{
    classToAdd: string
    elementsArrayRef: React.MutableRefObject<HTMLElement[]>
    options?: IntersectionObserverInit
    
}


export interface ErrorSearchProps{
    error: Error | null
    isError: boolean
    userSearch: string
    isLoading: boolean
    data: BooksAPISearch | undefined
}

export interface AlertProps{
    brdrColor?: boolean
}

export interface ChangeContentProps{
    newData: string[]
    queryClient: QueryClient
}

export interface FetchFnProps{
    URL: string
    setFetchNow?:  React.Dispatch<React.SetStateAction<boolean>>

}


export interface EllipsisTextProps{
    text: string
    maxLength: number
}
