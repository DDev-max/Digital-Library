import { UseRemoveAddFavProps } from "../../../data/types"

export function removeAddFav({alreadyAdded,selection,setFavorites}:UseRemoveAddFavProps){

    if (!selection) return false

    if (!alreadyAdded) {
        setFavorites(prev => [...prev!, selection])
    }else{
        removeFav({alreadyAdded,selection,setFavorites})
    }

    return

}



export function removeFav({setFavorites,selection,alreadyAdded}:UseRemoveAddFavProps){
    if (!selection) return


        if (!alreadyAdded) return
        setFavorites((prevFavorites) => {
            return prevFavorites?.filter((elmnt)=> elmnt.id !== selection.id)
        })
    
}

