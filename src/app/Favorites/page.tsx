'use client'

import { ImageFallback } from '@/components/ImageFallback'
import { removeAddFav } from '@/components/svg/Favorite/removeAddFav'
import { TrashSVG } from '@/components/svg/TrashSVG'
import { useFavoritesContext } from 'Context/useFavoritesContext'
import Image from 'next/image'
import { ellipsisText } from 'Utils/ellipsisText/ellipsisText'

export default function FavoritePage() {
  const context = useFavoritesContext()
  if (!context) return

  const { favorites, setFavorites } = context

  return (
    <main id='mainContent' className='favPage'>
      <h1 className='favPage_h2'>Favorite List</h1>
      <div className='favPage_Grid'>
        {favorites.length == 0 && <p>Click on the heart to add a book</p>}

        {favorites.map(elmnt => {
          const alreadyAdded = favorites.some(fav => fav.id === elmnt.id)

          return (
            <article key={elmnt.id} className='bookElmnt'>
              {elmnt.volumeInfo.imageLinks?.smallThumbnail ? (
                <Image
                  className='bookElmnt_img'
                  width={150}
                  height={224}
                  src={elmnt.volumeInfo.imageLinks.smallThumbnail}
                  alt={elmnt.volumeInfo.title}
                />
              ) : (
                <ImageFallback />
              )}
              <p className='bookElmnt_title'>{ellipsisText({ maxLength: 23, text: elmnt.volumeInfo.title })}</p>

              <TrashSVG classNameBtn='bookElmnt_trashBtn' onClick={() => removeAddFav({ alreadyAdded, selection: elmnt, setFavorites })} />
            </article>
          )
        })}
      </div>
    </main>
  )
}
