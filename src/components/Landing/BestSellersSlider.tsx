import { Link } from "react-router-dom"
import { BookProp } from "../../types"
import { urlConversion } from "../../Services/urlConversion"
import { FavoriteSVG } from "../../svg/FavoriteSVG"

export function BSellerSlider({books}: BookProp) {

    return(
        <section className="slider">
            <h2>Best Sellers</h2>
            <article className="slider_contImgs">
                {books?.map((elmnt, idx)=>{
                    const info= elmnt.volumeInfo

                    const bookLink = urlConversion({title: info.title})                    

                    return(
                        <div key={idx}>
                            <Link to={`/Read/${bookLink}`} key={info.title}>
                                <img 
                                src={info.imageLinks.smallThumbnail} 
                                alt={`The book cover of "${info.title}"`} />

                                <h3>{info.title}</h3>


                            </Link>
                            
                            <FavoriteSVG selection={elmnt}/>
                    
                        </div>
                    )
                        

                })}
            </article>
        </section>
    )
}