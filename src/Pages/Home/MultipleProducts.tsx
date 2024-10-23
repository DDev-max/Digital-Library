<<<<<<<< HEAD:src/components/Main/MultipleProducts.tsx
import { BookProp } from "../../types";
========
import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG";
import { BookProp } from "../../data/types";
>>>>>>>> 7db99b2 (New folder structure):src/Pages/Home/MultipleProducts.tsx

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
                        </article>
                    )
                })}
        </div>
    </section>
  )
}
