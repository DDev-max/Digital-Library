import { Link } from "react-router-dom";
import { BookProp } from "../../data/types";

export function HorizontalProducts({books}: BookProp) {

    return(
        <section className="horizontalSctn">

            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo

                return(
                    <article key={info.title} className="horizontalSctn_Article"> 
                        <img className="horizontalSctn_Img" src={info.imageLinks.smallThumbnail} alt={info.title} />
                        <div className="horizontalSctn_infoDiv">
                            <h2 className="horizontalSctn_title">{info.title}</h2>
                            
                            <Link to={"/Order"} className="horizontalSctn_btn">
                                Pre-order
                            </Link>
                        </div>
                    </article>
                )
            })}

        </section>
    )
}