"use client"

import { removeAddFav } from "@/components/svg/Favorite/removeAddFav";
import { TrashSVG } from "@/components/svg/TrashSVG";
import { useHighlightCntxt } from "Context/useHighlightContxt";
import Image from "next/image";
import { ellipsisText } from "Utils/ellipsisText";

export default function FavoritePage() {

    const context = useHighlightCntxt()
    if (!context) return
    
    const {favorites,setFavorites} = context

    return (
        <main id="mainContent" className="favPage">
            <h1 className="favPage_h2">Favorite List</h1>
            <div className="favPage_Grid">
                {favorites.length==0 && <p>Click on the heart to add a book</p>}

                {favorites.map((elmnt)=>{
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

                    return(
                        <article key={elmnt.id} className="favPage_article">
                            <Image className="favPage_article_Img" width={150} height={224} src={elmnt.volumeInfo.imageLinks.smallThumbnail} alt={elmnt.volumeInfo.title} />
                            <p className="favPage_article_title">
                                {ellipsisText({maxLength:23, text:elmnt.volumeInfo.title})}
                            </p>
                            
                            <TrashSVG 
                                classNameBtn="favPage_article_trashBtn"
                                onClick={()=>removeAddFav({alreadyAdded,selection: elmnt, setFavorites})}
                            />
                        </article>
                    )
                })}
            </div>
        </main>
    );
}