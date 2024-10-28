import { Link } from "react-router-dom"
import { BookProp } from "../../data/types"
import { urlConversion } from "../../Utils/urlConversion"
import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG"
import { removeAddFav } from "../../components/svg/Favorite/useRemoveAddFav"
import { useHighlightCntxt } from "../../Context/useHighlightContxt"
import { useRef } from "react"
import { useScrollBtns } from "../../hooks/useScrollBtns"
import { scrollSlider } from "../../Utils/scrollSlider"


export function BSellerSlider({books}: BookProp) {

    const sliderRef = useRef<HTMLDivElement>(null)
    const showBtns = useScrollBtns(sliderRef)

    


    const context = useHighlightCntxt()

    if (!context) return

    const {favorites,setFavorites}= context


    return(
        <section className="slider">
            <h2 className="slider_h2">Best Sellers</h2>
            <div ref={sliderRef} className="slider_contImgs">

                {showBtns[0] &&
                 <button 
                onClick={()=> scrollSlider({elmntRef: sliderRef, toRight: true})}
                className="slider_btn"> &lt; </button>
                }
            
                {books?.map((elmnt, idx)=>{
                    const info= elmnt.volumeInfo

                    const bookLink = urlConversion({title: info.title})                    
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

                    return(
                        <article 
                        className="slider_bookContainer" key={idx}
                        >
                            <Link to={`/Read/${bookLink}`} key={info.title}>
                                <img 
                                className="slider_img"
                                src={info.imageLinks.smallThumbnail} 
                                alt={`The book cover of "${info.title}"`} />

                                <h3
                                className="slider_title"
                                >{info.title}</h3>


                            </Link>
                            
                            <button className="slider_FavBtn" onClick={()=> removeAddFav({alreadyAdded,selection: elmnt,setFavorites})}>
                                <FavoriteSVG added={alreadyAdded} />
                            </button>
                    
                        </article>
                    )
                        

                })}

                {showBtns[1] &&
                <button  onClick={()=> scrollSlider({elmntRef: sliderRef})}
                className="slider_btn slider_btn--der"> &gt; </button>
                }


            </div>
        </section>
    )
}