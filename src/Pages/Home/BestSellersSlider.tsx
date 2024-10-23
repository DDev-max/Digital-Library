import { Link } from "react-router-dom"
import { BookProp } from "../../data/types"
import { urlConversion } from "../../Utils/urlConversion"
import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG"
import { removeAddFav } from "../../components/svg/Favorite/useRemoveAddFav"
import { useContext } from "react"
import { HighlightedCntxt } from "../../contextAPI"

export function BSellerSlider({books}: BookProp) {

    const {favorites,setFavorites}= useContext(HighlightedCntxt)



    return(
        <section className="slider">
            <h2>Best Sellers</h2>
            <div className="slider_contImgs">
                {books?.map((elmnt, idx)=>{
                    const info= elmnt.volumeInfo

                    const bookLink = urlConversion({title: info.title})                    
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

                    return(
                        <article key={idx}>
                            <Link to={`/Read/${bookLink}`} key={info.title}>
                                <img 
                                src={info.imageLinks.smallThumbnail} 
                                alt={`The book cover of "${info.title}"`} />

                                <h3>{info.title}</h3>


                            </Link>
                            
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