import { Link } from "react-router-dom";
import { FavoriteSVG } from "../../components/svg/Favorite/FavoriteSVG";
import { removeAddFav } from "../../components/svg/Favorite/useRemoveAddFav";
import { useHighlightCntxt } from "../../Context/useHighlightContxt";
import { BookProp } from "../../data/types";
import { urlConversion } from "../../Utils/urlConversion";
import { ellipsisText } from "../../Utils/ellipsisText";

export function MultipleProducts({books}:BookProp) {

  const context = useHighlightCntxt()
  if (!context) return

  const {favorites,setFavorites}= context


  return (
    <section className="MultipleProducts">
        <h2 className="MultipleProducts_h2">Discover</h2>
        <div className="MultipleProducts_Grid">

            {books?.map(elmnt=>{
                const info= elmnt.volumeInfo
                const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)
                const bookLink = urlConversion({title: info.title})

                
                return(
                        <article  key={info.title} className="MultipleProducts_article">

                            <Link className="MultipleProducts_article_link" to={`/Read/${bookLink}`}>
                                <h3 title={info.title} className="MultipleProducts_article_link_title">
                                    {ellipsisText(info.title)}
                                </h3>                                    


                                <img 
                                loading="lazy"
                                className="MultipleProducts_article_link_Img" src={info.imageLinks.smallThumbnail} alt={`The book cover of "${info.title}"`}/>
                            </Link>

                            <button className="MultipleProducts_article_FavBtn" onClick={()=> removeAddFav({alreadyAdded,selection: elmnt,setFavorites})}>
                                <FavoriteSVG added={alreadyAdded}/>
                            </button>
                            
                        </article>
                )
            })}
        </div>
    </section>
  )
}




/*
document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll('.ellipsis');
  
  paragraphs.forEach(paragraph => {
    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
    const maxHeight = lineHeight * 2; // Dos líneas
    
    if (paragraph.offsetHeight > maxHeight) {
      paragraph.style.maxHeight = `${maxHeight}px`;
      paragraph.style.overflow = 'hidden';
      paragraph.style.textOverflow = 'ellipsis';
      paragraph.style.display = '-webkit-box';
      paragraph.style.webkitBoxOrient = 'vertical';
      paragraph.style.webkitLineClamp = '2';
    }
  });
});



*/