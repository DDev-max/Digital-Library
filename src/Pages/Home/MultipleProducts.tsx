import { Link } from "react-router-dom";
import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG";
import { removeAddFav } from "../../components/svg/Favorite/removeAddFav";
import { useHighlightCntxt } from "../../Context/useHighlightContxt";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";
import { ellipsisText } from "../../Utils/ellipsisText";
import { useBooks } from "../../hooks/useBooks";
import { MultipleProductsSkeleton } from "../../components/Skeletons/MultipleProducts.Skeleton";

export function MultipleProducts({books,sectionRef}:BookProp) {

  const context = useHighlightCntxt()
  const {isLoading} = useBooks()
  if (!context) return

  const {favorites,setFavorites}= context


  return (
    <section ref={sectionRef} className="MultipleProducts ">
        <h2 className="MultipleProducts_h2">Discover</h2>
        <div className="MultipleProducts_Grid">

            {isLoading 

            ? <MultipleProductsSkeleton/>
            
            : (books?.map(elmnt=>{
                const info= elmnt.volumeInfo
                const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)
                const bookLink = urlConversion({title: info.title})

                
                return(
                  

                        <article  key={info.title} className="MultipleProducts_article">

                            <Link className="MultipleProducts_article_link" to={`/Read/${bookLink}`}>
                                <h3 title={info.title} className="MultipleProducts_article_link_title">
                                    {ellipsisText({maxLength:23, text:info.title})}
                                </h3>                                    


                                <img 
                                loading="lazy"
                                className="MultipleProducts_article_link_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`}/>
                            </Link>

                            <button className="MultipleProducts_article_FavBtn" onClick={()=> removeAddFav({alreadyAdded,selection: elmnt,setFavorites})}>
                                <FavoriteSVG added={alreadyAdded} title={alreadyAdded? "Remove from favorites list": "Add to favorites list"}/>
                            </button>
                            
                        </article>

                )
            }))

            }






        </div>
    </section>
  )
}


