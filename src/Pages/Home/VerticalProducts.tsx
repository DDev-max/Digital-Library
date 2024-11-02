import { Link } from "react-router-dom";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";

export function VerticalProducts({books}:BookProp) {

    
    return(
        <section className="VerticalSctn">
            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo
                const nameForUrl = urlConversion({title: info.title})
                
                return(
                    <article key={info.title} className="VerticalSctn_Article">
                        <img className="VerticalSctn_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`} />
                        <h2 className="VerticalSctn_title">{info.title}</h2>

                        <Link to={`/Order/${nameForUrl}`} className="VerticalSctn_btn">
                            Pre-order
                        </Link>
                    </article>
                )
            })}
        </section>
    )
}