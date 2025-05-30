import type { ObservedBookComponentProps } from '../../../data/types'
import { FavoriteSVG } from '../../svg/Favorite/FavoriteSVG'
import { removeAddFav } from '../../svg/Favorite/removeAddFav'
import { useRef } from 'react'
import { useScrollBtns } from '../../../hooks/useScrollBtns/useScrollBtns'
import { scrollSlider } from '../../../Utils/scrollSlider'
import Link from 'next/link'
import Image from 'next/image'
import { useFavoritesContext } from 'Context/useFavoritesContext'
import { ImageFallback } from '@/components/ImageFallback/ImageFallback'

export function BSellerSlider({ books, sectionRef, isVisible }: ObservedBookComponentProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const showBtns = useScrollBtns(sliderRef)

  const context = useFavoritesContext()

  if (!context) return
  const { favorites, setFavorites } = context

  return (
    <section ref={sectionRef} className={`slider ${isVisible ? 'visibleElmnt' : ''}`}>
      <h2 className='slider_h2'>Best Sellers</h2>
      <div ref={sliderRef} className='slider_contImgs'>
        {showBtns[0] && (
          <button
            aria-label='Click to scroll the slider to the left.'
            onClick={() => scrollSlider({ elmntRef: sliderRef, toRight: true })}
            className='slider_btn'
          >
            <span aria-hidden> &lt; </span>
          </button>
        )}

        {books?.map((elmnt, idx) => {
          const info = elmnt.volumeInfo

          const bookLink = encodeURIComponent(info.title)
          const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

          return (
            <article className='slider_bookContainer' key={idx}>
              <Link href={`/Read/${bookLink}`} key={info.title}>
                {info.imageLinks?.smallThumbnail ? (
                  <Image
                    width={140}
                    height={225}
                    loading='lazy'
                    className='slider_img'
                    src={info.imageLinks.smallThumbnail}
                    alt={`The book cover of "${info.title}"`}
                  />
                ) : (
                  <ImageFallback />
                )}

                <h3 title={info.title} className='slider_title'>
                  {info.title}
                </h3>
              </Link>

              <button
                aria-label={alreadyAdded ? 'Remove from favorites list' : 'Add to favorites list'}
                className='slider_FavBtn'
                onClick={() => removeAddFav({ alreadyAdded, selection: elmnt, setFavorites })}
              >
                <FavoriteSVG added={alreadyAdded} />
              </button>
            </article>
          )
        })}

        {showBtns[1] && (
          <button
            onClick={() => scrollSlider({ elmntRef: sliderRef })}
            aria-label='Click to scroll the slider to the left.'
            className='slider_btn slider_btn--der'
          >
            <span aria-hidden> &gt; </span>
          </button>
        )}
      </div>
    </section>
  )
}
