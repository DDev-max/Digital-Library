import { Link } from "react-router-dom";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";

export function HorizontalProducts({books}: BookProp) {

    return(
        <section className="horizontalSctn">

            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo
                const nameForUrl = urlConversion({title: info.title})

                return(
                    <article key={info.title} className="horizontalSctn_Article"> 
                        <img className="horizontalSctn_Article_Img" 
                        src={info.imageLinks.smallThumbnail} 
                        srcSet={
                            `${info.imageLinks.smallThumbnail} 600w,
                            ${info.imageLinks.thumbnail} 1000w`
                        }
                        alt={info.title} 
                        />
                        <div className="horizontalSctn_Article_infoDiv">
                            <h2 className="horizontalSctn_Article_infoDiv_title">{info.title}</h2>
                            
                            <Link to={`/Order/${nameForUrl}`} className="horizontalSctn_Article_infoDiv_btn">
                                Pre-order
                            </Link>
                        </div>
                    </article>
                )
            })}

        </section>
    )
}