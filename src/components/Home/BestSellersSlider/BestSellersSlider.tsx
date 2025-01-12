import type { ObservedBookComponentProps } from "../../../data/types"
import { FavoriteSVG } from "../../svg/Favorite/FavoriteSVG"
import { removeAddFav } from "../../svg/Favorite/removeAddFav"
import { useRef } from "react"
import { useScrollBtns } from "../../../hooks/useScrollBtns"
import { scrollSlider } from "../../../Utils/scrollSlider"
import Link from "next/link"
import Image from "next/image"
import { useFavoritesContext } from "Context/useFavoritesContext"


export function BSellerSlider({ books, sectionRef, isVisible }: ObservedBookComponentProps) {

    const sliderRef = useRef<HTMLDivElement>(null)
    const showBtns = useScrollBtns(sliderRef)

    const context = useFavoritesContext()

    if (!context) return
    const { favorites, setFavorites } = context


    return (
        <section ref={sectionRef} className={`slider ${isVisible ? "visibleElmnt" : ""}`}>
            <h2 className="slider_h2">Best Sellers</h2>
            <div ref={sliderRef} className="slider_contImgs">

                {showBtns[0] &&
                    <button
                        aria-label="Click to scroll the slider to the left."
                        onClick={() => scrollSlider({ elmntRef: sliderRef, toRight: true })}
                        className="slider_btn">
                        <span aria-hidden> &lt;  </span>


                    </button>
                }


                {books?.map((elmnt, idx) => {
                    const info = elmnt.volumeInfo

                    const bookLink = encodeURIComponent(info.title)
                    const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)


                    return (

                        <article
                            className="slider_bookContainer" key={idx}
                        >
                            <Link className="slider_bookContainer_link" href={`/Read/${bookLink}`} key={info.title}>
                                <Image
                                    width={130}
                                    height={225}
                                    loading="lazy"
                                    className="slider_bookContainer_link_img"
                                    src={info.imageLinks.smallThumbnail}
                                    alt={`The book cover of "${info.title}"`} />

                                <h3
                                    title={info.title}
                                    className="slider_bookContainer_link_title"
                                >{info.title}</h3>


                            </Link>

                            <button className="slider_bookContainer_FavBtn" onClick={() => removeAddFav({ alreadyAdded, selection: elmnt, setFavorites })}>
                                <FavoriteSVG title={alreadyAdded ? "Remove from favorites list" : "Add to favorites list"} added={alreadyAdded} />
                            </button>

                        </article>

                    )


                })


                }



                {showBtns[1] &&
                    <button onClick={() => scrollSlider({ elmntRef: sliderRef })}
                        aria-label="Click to scroll the slider to the left."
                        className="slider_btn slider_btn--der">
                        <span aria-hidden> &gt; </span>
                    </button>
                }


            </div>
        </section>
    )
}