import { Link } from "react-router-dom";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";

export function SingleProduct({books}: BookProp) {
    const info = books![0].volumeInfo
    const bookLink = urlConversion({title: info.title}) 

    return (
        <section className="singleProduct">
            <img className="singleProduct_img"
            loading="lazy"
            src={info.imageLinks.thumbnail} alt={info.title} />

            <div className="singleProduct_infoCont">
                <h2 className="singleProduct_infoCont_title">{info.title}</h2>
                <p className="singleProduct_infoCont_desc">{info.description}</p>
                <Link className="singleProduct_infoCont_link" to={`/Read/${bookLink}`}>Read Now</Link>
            </div>
            
        </section>
    )
}