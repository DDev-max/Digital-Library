import { TrashSVG } from "../components/svg/TrashSVG";
import { removeFav } from "../components/svg/Favorite/useRemoveAddFav";
import { useHighlightCntxt } from "../Context/useHighlightContxt";

export function FavoritePage() {

    const context = useHighlightCntxt()
    if (!context) return
    
    const {favorites,setFavorites} = context

    return (
        <main className="favPage">
            <h1 className="favPage_h2">Favorite List</h1>
            <div className="favPage_Grid">
                {favorites.map((elmnt)=>{
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

                    return(
                        <article key={elmnt.id} className="favPage_article">
                            <img className="favPage_Img" src={elmnt.volumeInfo.imageLinks.smallThumbnail} alt={elmnt.volumeInfo.title} />
                            <p className="favPage_title">{elmnt.volumeInfo.title}</p>
                            
                            <TrashSVG 
                                classNameBtn="favPage_trashBtn"
                                onClick={()=>removeFav({alreadyAdded,selection: elmnt, setFavorites})}
                            />
                        </article>
                    )
                })}
            </div>
        </main>
    );
}