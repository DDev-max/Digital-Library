import { BookProp } from "../../types";

export function HorizontalProducts({books}: BookProp) {

    return(
        <section className="horizontalSctn">

            {books?.map(elmnt=>{
                const info = elmnt.volumeInfo

                return(
                    <article key={info.title} className="horizontalSctn_Article"> 
                        <img className="horizontalSctn_Img" src={info.imageLinks.smallThumbnail} alt={info.title} />
                        <div>
                            <h2>{info.title}</h2>
                            <button>Button</button>
                        </div>
                    </article>
                )
            })}

        </section>
    )
}