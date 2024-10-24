import { Item } from "../../../data/types";
import { useHighlightCntxt } from "../../../Context/useHighlightContxt";

export function useRemoveFavorite() {
    const { setFavorites } = useHighlightCntxt()
    return (selection: Item) => {
        setFavorites((prevFavorites) => {
            return prevFavorites?.filter((elmnt)=> elmnt.id !== selection.id)
        })
    }
}
