import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG";
import { removeAddFav } from "../../components/svg/Favorite/useRemoveAddFav";
import { useHighlightCntxt } from "../../Context/useHighlightContxt";
import { BookProp } from "../../data/types";

export function MultipleProducts({books}:BookProp) {

  const context = useHighlightCntxt()
  if (!context) return

  const {favorites,setFavorites}= context
  
  return (
    <section className="MultipleProducts">
        <h2>Discover</h2>
        <div className="MultipleProducts_Grid">

                {books?.map(elmnt=>{
                    const info= elmnt.volumeInfo
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)
                    return(
                        <article key={info.title}>
                            <h3>{info.title}</h3>

                            <img className="MultipleProducts_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`}/>

                            <button onClick={()=> removeAddFav({alreadyAdded,selection: elmnt,setFavorites})}>
                                <FavoriteSVG added={alreadyAdded}/>
                            </button>

                        </article>
                    )
                })}
        </div>
    </section>
  )
}
