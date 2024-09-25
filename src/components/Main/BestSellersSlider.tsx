import { Link } from "react-router-dom"
import { BookProp } from "../../types"

export function BSellerSlider({books}: BookProp) {
    

    return(
        <section className="slider">
            <h2>Best Sellers</h2>
            <div className="slider_contImgs">
                {books?.map(elmnt=>{
                    const info= elmnt.volumeInfo

                    return(
                        //CAMBIAR EL ENLACE A UNO MAS LINDO PARA EL SEO
                        <Link to={info.title} key={info.title}>
                            <img 
                            src={info.imageLinks.smallThumbnail} 
                            alt={`The book cover of "${info.title}"`} />

                            <h3>{info.title}</h3>
                        </Link>
                        
                    )
                })}
            </div>
        </section>
    )
}