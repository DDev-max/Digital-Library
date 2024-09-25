import { BookProp } from "../../types"

export function BSellerSlider({books}: BookProp) {
    

    return(
        <section className="slider">
            <h2>Best Sellers</h2>
            <div className="slider_contImgs">
                {books?.map(elmnt=>{
                    const info= elmnt.volumeInfo

                    return(
                        <a href="#">
                            <img key={info.title} src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`} />
                            <h3>{info.title}</h3>
                        </a>
                        
                    )
                })}
            </div>
        </section>
    )
}