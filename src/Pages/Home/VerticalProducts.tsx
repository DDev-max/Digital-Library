import { BookProp } from "../../data/types";

export function VerticalProducts({books}:BookProp) {

    
    return(
        <section className="VerticalSctn">
            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo
                return(
                    <article key={info.title} className="VerticalSctn_Article">
                        <img className="VerticalSctn_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`} />
                        <h2 className="VerticalSctn_title">{info.title}</h2>
                        <button className="VerticalSctn_btn">Pre-order</button>
                    </article>
                )
            })}
        </section>
    )
}