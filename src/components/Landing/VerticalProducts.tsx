import { BookProp } from "../../types";

export function VerticalProducts({books}:BookProp) {
    return(
        <section className="VerticalSctn">
            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo
                return(
                    <article key={info.title} className="VerticalSctn_Article">
                        <img className="VerticalSctn_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`} />
                        <h2>{info.title}</h2>
                        <button>Button</button>
                    </article>
                )
            })}
        </section>
    )
}