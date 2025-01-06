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

//hacerlo con type para poder usar "|"
export interface BookProp{
    books: Item[] | undefined;
    // idx: number
    isVisible?: boolean
    sectionRef?: (elmnt: HTMLElement)=> void
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
    setAlert:  React.Dispatch<React.SetStateAction<string>>
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    highlightedContent: string[]
    setHighlightedContent: Dispatch<SetStateAction<string[]>>
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
    highlightedContent: string[]
    setPosition: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
    setHighlightedContent: Dispatch<SetStateAction<string[]>>
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



export interface UseHandleUserLocationProps{
  markerPosition :L.LatLngExpression | undefined
  setAlert : Dispatch<SetStateAction<string>>
  setMarkerPosition :  Dispatch<SetStateAction<L.LatLngExpression | undefined>>
}

export interface PhoneInputChangeProps{
    e: React.ChangeEvent<HTMLInputElement>
    phoneRef:  React.RefObject<HTMLInputElement>
}

export interface FormSubmitProps{
    e: React.FormEvent<HTMLFormElement>
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
    push:(href: string, options?: NavigateOptions) => void
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
    observedElements: React.MutableRefObject<HTMLElement[]>
    setIsVisible: Dispatch<SetStateAction<boolean[]>>
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
    alert: string
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


export interface PageProps {
    searchParams?: Promise<SearchParams>
}

export interface SearchParams {
    category?: string
    page?: string
}

//NO ESTOY USANDO VARIAS, TAMBIEN HAY QUE REFACTORIZAR


export interface MainContentProps {
    books: BooksAPI
}

export interface ContxtMenuProps{
    highlightedContent: string[]
    setHighlightedContent : Dispatch<SetStateAction<string[]>>
}

export interface ReadBookProps {
    plainBookContent: string[]
}


export interface LocationMarkerProps extends LocationMarkerState{
    setAlert : Dispatch<SetStateAction<string>>
  
  }


  export interface MapProps extends LocationMarkerState{
    divClassName : string
    setAlert: React.Dispatch<React.SetStateAction<string>>
}


export interface OrderPageParams extends Record<string, string | undefined> {
    book: string; // Agrega aquí los parámetros que esperas
}

//---------------------------------

export interface LocationMarkerState {
    markerPosition: LatLngExpression | undefined
    setMarkerPosition: Dispatch<SetStateAction<LatLngExpression | undefined>>
}

export interface AlertState{
    alert: string
    setAlert: React.Dispatch<React.SetStateAction<string>>
}