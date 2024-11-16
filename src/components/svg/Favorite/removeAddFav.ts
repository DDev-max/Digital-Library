import { RemoveAddFavProps } from "../../../data/types"

export function removeAddFav({alreadyAdded,selection,setFavorites}:RemoveAddFavProps){

    if (!selection) return false

    if (!alreadyAdded) {
        setFavorites(prev => [...prev!, selection])
    }else{
        setFavorites((prevFavorites) => {
            return prevFavorites?.filter((elmnt)=> elmnt.id !== selection.id)
        })
        
    }



}

