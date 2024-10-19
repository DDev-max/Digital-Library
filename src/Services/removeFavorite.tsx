import { useContext } from "react";
import { HighlightedCntxt } from "../contextAPI";
import { Item } from "../types";

export function useRemoveFavorite() {
    const { setFavorites } = useContext(HighlightedCntxt);

    return (selection: Item) => {
        setFavorites((prevFavorites) => {
            return prevFavorites?.filter((elmnt)=> elmnt.id !== selection.id)
        })
    }
}
