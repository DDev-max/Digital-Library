import { Link } from "react-router-dom";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";
import { useBooks } from "../../hooks/useBooks";
import { SingleProductSkeleton } from "../../components/Skeletons/SingleProductSkeleton";
import { ellipsisText } from "../../Utils/ellipsisText";

export function SingleProduct({ books,sectionRef }: BookProp) {
    
    const { isLoading } = useBooks()

    return ( 

        
        <section ref={sectionRef} className="singleProduct ">

            {isLoading ? <SingleProductSkeleton/> :
            
            
                books &&<>
                
                    <img className="singleProduct_img"
                    loading="lazy"
                    src={ books[0].volumeInfo.imageLinks.thumbnail} alt={ books[0].volumeInfo.title} />

                <div className="singleProduct_infoCont">
                    
                    <h2 className="singleProduct_infoCont_title">{ books[0].volumeInfo.title}</h2>

                    <p className="singleProduct_infoCont_desc">
                        {ellipsisText({maxLength:250, text: books[0].volumeInfo.description})}
                    </p>

                    <Link className="singleProduct_infoCont_link" 
                    to={`/Read/${urlConversion({ title:  books[0].volumeInfo.title })}`}>

                        Read Now

                    </Link>

                </div>

                </>

            
            }            



        </section>
    )
}