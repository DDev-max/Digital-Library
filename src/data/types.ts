import type { LatLngExpression } from "leaflet";
import type { Dispatch, SetStateAction } from "react";

export interface NextJsPageProps<TParam extends Record<string, string>> {
    params?: Promise<TParam>;
}



export interface BooksAPI {
    readonly items: ReadonlyArray<Item>;
}

export interface Item {
    readonly id: string
    readonly volumeInfo: VolumeInfo;
}

interface VolumeInfo {
    readonly title: string;
    readonly authors: readonly string[];
    readonly publishedDate?: string;
    readonly categories?:readonly  string[];
    readonly imageLinks: ImageLinks;
    readonly description: string;
}

interface ImageLinks {
    readonly smallThumbnail: string;
    readonly thumbnail: string;
}



export interface SearchBooksApi {
    readonly items: readonly ItemSearch[];
}

interface ItemSearch {
    readonly id: string;
    readonly volumeInfo: VolumeInfoSearch;
}

interface VolumeInfoSearch {
    readonly title: string;
    readonly authors: readonly string[];
}




export interface ObservedBookComponentProps {
    books: readonly Item[];
    isVisible: boolean
    sectionRef: (elmnt: HTMLElement) => void
}


export interface SvgProps {
    classNameSVG?: string
    onClick?: () => void
    title?: string
}

export interface ButtonSvgProps extends SvgProps {
    classNameBtn?: string
}


export interface extendHighlight {
    selectedParagraphHtml: string
    spanOpenTag: string
}


export interface LocationMarkerState {
    markerPosition: LatLngExpression | undefined
    setMarkerPosition: Dispatch<SetStateAction<LatLngExpression | undefined>>
}

export interface AlertState {
    alert: string
    setAlert: React.Dispatch<React.SetStateAction<string>>
}

export interface BookContentState {
    bookContent: string[]
    setBookContent: Dispatch<SetStateAction<string[]>>
}

export interface UserSearchState {
    userSearch: string
    setUserSearch: Dispatch<SetStateAction<string>>
}