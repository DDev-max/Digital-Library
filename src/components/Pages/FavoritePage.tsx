import { useContext } from "react";
import { HighlightedCntxt } from "../../contextAPI";
import { TrashSVG } from "../../svg/TrashSVG";
import { useRemoveFavorite } from "../../Services/removeFavorite";

export function FavoritePage() {

    const {favorites} = useContext(HighlightedCntxt)
    const remove = useRemoveFavorite()


    return (
        <main>
            <h1>Favorite List</h1>
            {favorites.map((elmnt)=>{
                return(
                    <article key={elmnt.id}>
                        <img src={elmnt.volumeInfo.imageLinks.smallThumbnail} alt={elmnt.volumeInfo.title} />
                        <p>{elmnt.volumeInfo.title}</p>
                        <button>
                            <TrashSVG onClick={()=> remove(elmnt)}/>
                        </button>
                    </article>
                )
            })}
        </main>
    );
}