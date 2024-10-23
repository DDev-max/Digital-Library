import { useContext } from "react";
import { HighlightedCntxt } from "../contextAPI";
import { TrashSVG } from "../components/svg/TrashSVG";
import { removeFav } from "../components/svg/Favorite/useRemoveAddFav";

export function FavoritePage() {

    const {favorites,setFavorites} = useContext(HighlightedCntxt)


    return (
        <main>
            <h1>Favorite List</h1>
            {favorites.map((elmnt)=>{
                const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

                return(
                    <article key={elmnt.id}>
                        <img src={elmnt.volumeInfo.imageLinks.smallThumbnail} alt={elmnt.volumeInfo.title} />
                        <p>{elmnt.volumeInfo.title}</p>
                        <button>
                            <TrashSVG onClick={()=>removeFav({alreadyAdded,selection: elmnt, setFavorites})}/>
                        </button>
                    </article>
                )
            })}
        </main>
    );
}