import { FavoriteSVG } from "../../svg/FavoriteSVG";
import { BookProp } from "../../types";

export function MultipleProducts({books}:BookProp) {
  return (
    <section className="MultipleProducts">
        <h2>Discover</h2>
        <div className="MultipleProducts_Grid">

                {books?.map(elmnt=>{
                    const info= elmnt.volumeInfo
                    return(
                        <article key={info.title}>
                            <h3>{info.title}</h3>

                            <img className="MultipleProducts_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`}/>

                            <FavoriteSVG selection={elmnt}/>
                        </article>
                    )
                })}
        </div>
    </section>
  )
}
