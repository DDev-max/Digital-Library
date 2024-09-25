import { Link } from "react-router-dom"
import { BookProp } from "../../types"
import { urlConversion } from "../../Services/urlConversion"

export function BSellerSlider({books}: BookProp) {
    

    return(
        <section className="slider">
            <h2>Best Sellers</h2>
            <div className="slider_contImgs">
                {books?.map(elmnt=>{
                    const info= elmnt.volumeInfo

                    const bookLink = urlConversion({title: info.title})

                    console.log(bookLink);
                    

                    return(
                        
                        //CAMBIAR EL ENLACE A UNO MAS LINDO PARA EL SEO
                        <Link to={bookLink} key={info.title}>
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